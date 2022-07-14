import { Controller, Get, Param, Post, Query, Res, StreamableFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
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

  @Get()
  async get(@Query('lang') code: string) {
    return await this.languages.one(code)
  }

  @Get('download')
  async download(@Res() res: Response) {
    console.log('download requested')
    const {rows, total} = await this.languages.all()

    const stream = new Stream.Readable()
    for (const row of rows) {
      const { code, code3, name, nativeName } = row
      
      const sql = `INSERT INTO schema.table(code2, code3, name, native) VALUES ('${code}', '${code3}', '${name.replace("'", "''")}', '${nativeName.replace("'", "''")}')`
      stream.push(sql)
    }
    stream.push(null)
    return new StreamableFile(stream)
  }
}
