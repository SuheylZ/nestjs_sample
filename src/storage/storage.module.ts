import { Module } from '@nestjs/common';
import { storageConfig, StorageService } from './storage.service';
import { TypeOrmModule} from '@nestjs/typeorm'
import { ImporterService } from './importer.service';

@Module({
  exports: [ImporterService, StorageService],
  providers: [StorageService, ImporterService],
  imports: [
    TypeOrmModule.forRoot(storageConfig)
  ]
})
export class StorageModule {}
