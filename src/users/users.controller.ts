import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserResponse, UserRequest } from './user.models';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() req: UserRequest) {
    return await this.usersService.create(req);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() req: UserRequest) {
    await this.usersService.update(+id, req);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(+id);
  }

}
