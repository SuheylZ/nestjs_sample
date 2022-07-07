import { Module } from '@nestjs/common';
import { LanguageService as LanguageService } from './language.service';
import { LangagesController } from './language.controller';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  imports: [StorageModule],
  controllers: [LangagesController],
  providers: [LanguageService]
})
export class LanguageModule {}
