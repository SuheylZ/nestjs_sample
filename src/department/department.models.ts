import { PartialType } from '@nestjs/swagger';


export class DepartmentRequest {
  name: string
  notes: string
}

export class DepartmentResponse {
  id: number
  name: string
  notes: string
}

