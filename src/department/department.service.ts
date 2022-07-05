import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Department } from 'src/storage/entities/department.entity';
import { DataSource, Repository} from 'typeorm'
import { DepartmentRequest, DepartmentResponse } from './department.models';


@Injectable()
export class DepartmentService {
  private readonly _depts: Repository<Department>;

  constructor(private readonly ds: DataSource) {
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
      where: {
        departmentid: id
      }
    })

    if (!data)
      throw new NotFoundException()
    
    return data
  }

  async update(id: number, req: DepartmentRequest) {
    const rep = this._depts
    
    const record = await rep.findOne({
      where: {
        departmentid: id
      }
    })

    if (!record)
      throw new NotFoundException()
    
    record.title = req.name
    record.notes = req.notes

    await rep.save(record)
  }

  async remove(id: number) {
    const rep = this._depts
    
    const record = await rep.findOne({
      where: {
        departmentid: id
      }
    })

    if (!record)
      throw new NotFoundException()
    
    await rep.remove(record)
  }
}
