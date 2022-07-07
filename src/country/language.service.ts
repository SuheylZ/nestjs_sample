import { Injectable } from '@nestjs/common';
import { ISO639 } from 'src/storage/entities/iso_639.entity';
import { DataSource, Repository } from 'typeorm';

export type LanguageType = {
  code2: string
  language: string
  native: string
}

@Injectable()
export class LanguageService {

  private readonly _rep: Repository<ISO639>;
  constructor(private readonly ds: DataSource) {
    this._rep = ds.getRepository(ISO639)
  }

  async get(code: string) {
    const row = await this._rep.findOne({
      where: {
        code2: code
      }
    })

    return row
  }
  async all() {
    const rows = await this._rep.find({
      select: ["code2", "country", "native"],
      order: {
        code2: 'ASC'
      }
    })

    const languages = rows.map(function (x: ISO639) {
      return {
        code2: x.code2,
        language: x.country,
        native: x.native
      } as LanguageType         
    })
    
    return languages
  }
}
