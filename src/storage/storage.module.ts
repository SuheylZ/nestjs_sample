import { Module } from '@nestjs/common';
import { storageConfig, StorageService } from './storage.service';
import { TypeOrmModule} from '@nestjs/typeorm'
import { ImporterService } from './importer.service';
import { ISO639 } from './entities/iso_639.entity';
 

@Module({
  exports: [ImporterService, StorageService],
  providers: [StorageService, ImporterService],
  imports: [
    TypeOrmModule.forRoot(storageConfig),
    TypeOrmModule.forFeature([ISO639])
  ]
})
export class StorageModule {}
