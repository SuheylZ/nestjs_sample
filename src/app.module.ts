import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { StorageModule } from './storage/storage.module';
import { DepartmentModule } from './department/department.module';
import { LanguageModule } from './country/language.module';


@Module({
  imports: [UsersModule, StorageModule, DepartmentModule, LanguageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
