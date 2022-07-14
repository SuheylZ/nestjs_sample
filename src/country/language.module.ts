import { Module } from '@nestjs/common';
import { LanguageService as LanguageService } from './language.service';
import { LangagesController } from './language.controller';
import { StorageModule } from 'src/storage/storage.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ISO639 } from 'src/storage/entities/iso_639.entity';

@Module({
  imports: [StorageModule, TypeOrmModule.forFeature([ISO639])],
  controllers: [LangagesController],
  providers: [LanguageService]
})
export class LanguageModule {}
