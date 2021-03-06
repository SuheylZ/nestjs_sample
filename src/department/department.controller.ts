import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DepartmentRequest } from './department.models';
import { DepartmentService } from './department.service';


@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  create(@Body() req: DepartmentRequest) {
    return this.departmentService.create(req);
  }

  @Get()
  findAll() {
    return this.departmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.departmentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() req: DepartmentRequest) {
    return this.departmentService.update(+id, req);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.departmentService.remove(id);
  }

  @Post(':deptid/Users/:userid')
  async enroll(@Param('deptid') deptid: number, @Param('userid') userid: number) {
    await this.departmentService.enroll(+userid, +deptid)
  }

  @Delete(':deptid/Users/:userid')
  async unroll(@Param('deptid') deptid: number, @Param('userid') userid: number) {
    await this.departmentService.unroll(+userid, +deptid)
  }

  @Get(':deptid/users')
  async people(@Param('deptid') deptid: number) {
    const dept = await this.departmentService.findOne(deptid)
    const users = (dept.users ?? []).map(x => {
      return {
        id: x.userid,
        name: x.name,
        age: x.age
      }
    })
    return users
  }
}
