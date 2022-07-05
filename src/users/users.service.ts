import { Injectable } from '@nestjs/common';
import { UserRequest, UserResponse } from './user.models';



@Injectable()
export class UsersService {

  async create(req: UserRequest) {
    return Promise.resolve(1);
  }

  async findAll() {
    return Promise.resolve([] as UserResponse[])
  }

  async findOne(id: number) {
    return Promise.resolve({} as UserResponse)
  }

  async update(id: number, req: UserRequest) {
    return Promise.resolve()
  }

  async remove(id: number) {
    return Promise.resolve()
  }
}
