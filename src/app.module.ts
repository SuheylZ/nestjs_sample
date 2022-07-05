import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { StorageModule } from './storage/storage.module';
import { DepartmentModule } from './department/department.module';

@Module({
  imports: [UsersModule, StorageModule, DepartmentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
