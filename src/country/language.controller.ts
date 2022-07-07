import { Controller, Get, Param, Post, Res, StreamableFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { StreamableFileOptions } from '@nestjs/common/file-stream/streamable-options.interface';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { AuthGuard } from 'src/auth.guard';
import { ImporterService } from 'src/storage/importer.service';
import { Stream } from 'stream';
import { LanguageService } from './language.service';

@Controller('languages')
export class LangagesController {
  constructor(private readonly languages: LanguageService, private readonly importer: ImporterService) { }
  

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
    return await this.languages.get(code)
  }

  @Get('download/:type')
  async download(@Param('type') type: string, @Res() res: Response) {
    console.log('download requested')
    const languages = await this.languages.all()

    const stream = new Stream.Readable()
    for (const language of languages) {
      stream.push(`${JSON.stringify(language)}\r\n`)
    }
    stream.push(null)
    return new StreamableFile(stream)
  }
}
