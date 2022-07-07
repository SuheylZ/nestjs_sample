import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ISO639 } from './entities/iso_639.entity';
import * as fs from 'fs'
import { Readable } from 'stream';
//const csv = require('csv-parser')
import * as csv from 'csv-parser'

 

@Injectable()
export class ImporterService {
  private readonly _iso: Repository<ISO639>;
  private readonly result: any[]
  
  constructor(private readonly ds: DataSource) {
    this._iso = ds.getRepository(ISO639)
    this.result = []
  }

  async loadtext(text: Array<string>) {
    const t = csv()
    const rd = Readable.from(text)

    rd.pipe(t)
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
    .on('end', async () => {
      await this._iso.clear()
      
      for (const row of this.result) {
        try {
          await this._iso.save(row)
        }
        catch (err) {
          console.error(`${err} === ${JSON.stringify(row)}`)
        }
      }
      console.log(`finished reading ${this.result.length}`)
    })    
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
      .on('end', async () => {
        await this._iso.clear()
        
        for (const row of this.result) {
          try {
            await this._iso.save(row)
          }
          catch (err) {
            console.error(`${JSON.stringify(row)} ${err}`)
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
