import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ISO639 } from 'src/storage/entities/iso_639.entity';
import { DataSource, Repository } from 'typeorm';

export type LanguageType = {
  code: string
  code3: string
  name: string
  nativeName: string
}

@Injectable()
export class LanguageService{
  constructor(@InjectRepository(ISO639) private readonly repository: Repository<ISO639>) { }

  async exists(lang: string) {
    const language = await this.one(lang)
    return !!language
  }
  
  async one(lang: string) {
    const data = await this.repository.findOne({ where: { code2: lang } })
    if (data)
      return {
        code: data?.code2,
        code3: data?.code3,
        name: data?.country,
        nativeName: data?.native,
      } as LanguageType;

    return null
  }
  async all() {
    const [data, total] = await this.repository.findAndCount()
    const rows = data.map(x => {
      return {
        code: x?.code2,
        code3: x?.code3,
        name: x?.country,
        nativeName: x?.native,
      } as LanguageType;
    })
    return {rows, total}
  }
}