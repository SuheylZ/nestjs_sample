import { Module } from '@nestjs/common';
import { storageConfig, StorageService } from './storage.service';
import { TypeOrmModule} from '@nestjs/typeorm'

@Module({
  providers: [StorageService],
  imports: [
    TypeOrmModule.forRoot(storageConfig)
  ]
})
export class StorageModule {}
