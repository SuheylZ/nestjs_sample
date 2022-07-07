import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ISO639 } from './entities/iso_639.entity';
import * as fs from 'fs'
const csv = require('csv-parser')

 

@Injectable()
export class ImporterService {
  private readonly _iso: Repository<ISO639>;
  private readonly result: any[]
  
  constructor(private readonly ds: DataSource) {
    this._iso = ds.getRepository(ISO639)
    this.result = []
  }

  async load(file: string) {
    
    if (!fs.existsSync(file))
      throw new Error(`${file} not found`)
    
    const stream = fs.createReadStream(file)

    stream
      .pipe(csv())
      .on('data', data => {
        const row: ISO639 = {
          code2: data['639-1'],
          code3: data['639-2'],
          country: data['name'],
          native: data['nativeName'],
          url: ''
        }
        this.result.push(row)
      })

      .on('end', () => {
        for (const row of this.result) {
          try {
            console.log(row)
            this._iso.save(row)
          }
          catch (err) {
            console.error(err)
          }
        }
        console.log(`finished reading ${this.result.length}`)
      })    
  }

  async transform() {
    
  }

  async save() {
    
  }
  
}
