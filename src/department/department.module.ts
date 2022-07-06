import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [DepartmentController],
  providers: [DepartmentService]
})
export class DepartmentModule {}
