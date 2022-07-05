import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Department } from 'src/storage/entities/department.entity';
import { User } from 'src/storage/entities/user.entity';
import { DataSource, Repository} from 'typeorm'
import { DepartmentRequest, DepartmentResponse } from './department.models';
import _ from 'underscore'


@Injectable()
export class DepartmentService {
  private readonly _depts: Repository<Department>
  private readonly _users : Repository<User>


  constructor(private readonly ds: DataSource) {
    this._depts = ds.getRepository(Department)
    this._users = ds.getRepository(User)
  }
  async create(req: DepartmentRequest) {
    const depts = this._depts

    const [data, count] = await depts.findAndCount({
      where: {
        title: req.name
      }
    })

    if (count > 0)
      throw new ConflictException(req.name, `Department ${req.name} is already present`)
    
    const dept = await depts.save({
      departmentid: (new Date()).getMinutes(),
      title: req.name,
      notes: req.notes
    } as Department)

    return dept.departmentid
  }

  async findAll() {
    const rep = this._depts

    const [data, count] = await rep.findAndCount()
    const responses = data.map(x => {
      const t: DepartmentResponse = {
        id: x.departmentid,
        name: x.title,
        notes: x.notes
      }
      return t
    })

    return responses
  }

  async findOne(id: number) {
    const rep = this._depts

    const data = await rep.findOne({
      relations:["users"],
      where: {
        departmentid: id
      }
    })

    if (!data)
        throw new NotFoundException(`Department ${id} not found`)
    
    return data
  }

  async update(id: number, req: DepartmentRequest) {
    const rep = this._depts
    
    const record = await this.findOne(id)
    
    record.title = req.name
    record.notes = req.notes

    await rep.save(record)
  }

  async remove(id: number) {
    const rep = this._depts
    
    const record = await this.findOne(id)

    await rep.remove(record)
  }

  async enroll(userid: number, deptid: number) {
    const department = await this.findOne(deptid)
    
    const user = await this._users.findOne({
      relations: ['departments'],
      where: {
        userid: userid
      }
    })

    if (!user)
      throw new NotFoundException(`User ${userid} not found`)
    
    if (user.departments)
      user.departments.push(department)
    else
      user.departments = [department]
    
    await this._users.save(user)
  }

  async unroll(userid: number, deptid: number) {
    const record = await this._depts.findOne({
      where: {
        departmentid: deptid
      }
    })

    if (!record)
      throw new NotFoundException(`Department ${deptid} not found`)
    
    const user = await this._users.findOne({
      where: {
        userid: userid
      }
    })

    if (!user)
      throw new NotFoundException(`User ${userid} not found`)
    
    user.departments = user.departments.filter(x => x.departmentid !== deptid)
    
    await this._users.save(user)
  }
}
