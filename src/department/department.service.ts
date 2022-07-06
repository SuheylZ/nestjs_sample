import { ConflictException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Department } from 'src/storage/entities/department.entity';
import { DataSource, Repository} from 'typeorm'
import { DepartmentRequest, DepartmentResponse } from './department.models';
import _ from 'underscore'
import { UsersService } from 'src/users/users.service';


@Injectable()
export class DepartmentService {
  private readonly _depts: Repository<Department>


  constructor(private readonly ds: DataSource, private readonly users: UsersService) {
    this._depts = ds.getRepository(Department)
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
    const user = await this.users.findOne(userid)
    if (!user)
      throw new NotFoundException(`User ${userid} not found`)
    
    if (!department.users)
      department.users = [user]
    else if (!_.any(department.users, x => x.userid === userid))
      department.users.push(user)
    else 
      throw new HttpException(`User ${userid} already part of the department ${deptid}`, HttpStatus.CONFLICT)
    
    await this._depts.save(department)
  }

  async unroll(userid: number, deptid: number) {
    const department = await this.findOne(deptid)
    if (!department)
      throw new NotFoundException(`Department ${deptid} not found`)
    
    if (!_.any(department.users??[], x=>x.userid===userid))
      throw new NotFoundException(`User ${userid} not found in department`)
    
    department.users = department.users.filter(x => x.userid !== deptid)
    
    await this._depts.save(department)
  }
}
