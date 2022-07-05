import { PartialType } from '@nestjs/mapped-types';



export class UserRequest{
  name: string
  age: number
  address: string
  notes: string
}


export class UserResponse{
  id: number
  age: number
  name: string
  address: string
  notes: string
}
