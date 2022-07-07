import { Controller, Get, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImporterService } from 'src/storage/importer.service';
import { LanguageService } from './language.service';

@Controller('languages')
export class LangagesController {
  constructor(private readonly countryService: LanguageService, private readonly importer: ImporterService) { }
  

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async upload(@UploadedFiles() files: Array<Express.Multer.File>) {

    for (const file of files) {
      const { originalname: name, mimetype: mime, size, buffer, encoding } = file
      if (name.endsWith('csv')) {
        const data = buffer.toString('ascii')
        const lines = data.split('\n')
        await this.importer.loadtext(lines)
        break
      }
    }
  }

  @Get(':code')
  async get(@Param('code') code: string) {
    return await this.countryService.get(code)
  }
}
