import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import {
  WINSTON_MODULE_NEST_PROVIDER,
  WINSTON_MODULE_PROVIDER,
} from 'nest-winston';
import { Logger, format, Logform } from 'winston';
import { LoggerService } from '@nestjs/common';

async function bootstrap() {
  // const path = `${__dirname}/.env`

  // if (!fs.existsSync(path))
  //   throw new Error('No environment file found')

  // dotenv.config({
  //   path: path
  // })

  const myformat = format((info: Logform.TransformableInfo, opts?: any) => {
    const newInfo = {
      level: info.level.toUpperCase(),
      message: info.message,
    } as Logform.TransformableInfo;

    return newInfo;
  });

  const app = await NestFactory.create(AppModule);

  const docs_path = '/docs';
  const port = 3000;

  const swaggerconfig = new DocumentBuilder()
    .setTitle('Documentation')
    .setDescription('Gives the EndPoints overview')
    .setVersion('1.0')
    .build();

  const doc = SwaggerModule.createDocument(app, swaggerconfig);
  SwaggerModule.setup(docs_path, app, doc);

  const logger: LoggerService = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);

  await app.listen(port, async () => {
    // const imp = app.get(ImporterService)
    // await imp.load('/home/suheyl/Downloads/iso_639-1.csv')
  });
}
bootstrap();
