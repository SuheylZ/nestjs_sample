import { Injectable } from '@nestjs/common';
import { ISO639 } from 'src/storage/entities/iso_639.entity';
import { DataSource, Repository } from 'typeorm';

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
}
