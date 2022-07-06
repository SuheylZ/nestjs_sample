import { Injectable } from '@nestjs/common';
import { UserRequest, UserResponse } from './user.models';
import {DataSource, Repository, FindManyOptions } from 'typeorm'
import { User } from 'src/storage/entities/user.entity';



@Injectable()
export class UsersService {
  private readonly _users: Repository<User> 

  constructor(private ds: DataSource) { 
    this._users = this.ds.getRepository(User)
  }

  async create(req: UserRequest) {
    const user = this._users.create()

    const id =(new Date()).getUTCMinutes() 
    user.userid = id
    user.name = req.name
    user.age = req.age
    user.address = req.address??''
    user.notes = ''

    const saveduser = await this._users.save(user)

    return saveduser.userid;
  }

  async findAll() {
    const options: FindManyOptions<User> = {}
    const result =  await this._users.find(options)
    return result.map(x => {
      const t: UserResponse = {
        id: x.userid,
        name: x.name,
        age: x.age,
        address: x.address,
        notes: x.notes
      }

      return t
    })
  }

  async findOne(id: number) {
    const ret = await this._users.findOne({
      relations:["departments"],
      where: {
        userid: id,
      }
    })
    return ret
  }

  async update(id: number, req: UserRequest) {
    return Promise.resolve()
  }

  async remove(id: number) {
    return Promise.resolve()
  }

  async getuserDepartments(id: number) {
    const user = await this.findOne(id)
    return user.departments
  }

  async exists(id: number) {
    const data = await this._users.findOne({
      select: ["userid"],
      where: {
        userid: id
      }
    })

    return !!data
  }
}
