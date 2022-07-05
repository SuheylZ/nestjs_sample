import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [UsersModule, StorageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
