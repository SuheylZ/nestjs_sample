import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { StorageModule } from './storage/storage.module';
import { DepartmentModule } from './department/department.module';
import { LanguageModule } from './country/language.module';
import { WinstonModule } from 'nest-winston';

import * as winston from 'winston'
import { Logger, format, Logform } from 'winston';

const { splat, combine, timestamp, printf } = winston.format
const myformat = format((info: Logform.TransformableInfo, opts?: any) => {
  const newInfo = {
    level: info.level.toUpperCase(),
    message: info.message,
  } as Logform.TransformableInfo;

  return newInfo;
});

@Module({
  imports: [UsersModule, StorageModule, DepartmentModule, LanguageModule, WinstonModule.forRoot({
    format: winston.format.json(),
    transports: [new winston.transports.Console(), new winston.transports.File({
      filename: 'hw.log',
      dirname: '/tmp',
      format: combine(        
        timestamp(),
        printf(info => {
          const t:winston.Logform.TransformableInfo = info
          return `${info.timestamp} [${info.level}] : ${JSON.stringify(info.message)}`;
        }))
    })] 
  })],
  controllers: [],
  providers: []
})
export class AppModule {}
