import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger'
import * as dotenv from 'dotenv'
import * as fs from 'fs'


async function bootstrap() {
  // const path = `${__dirname}/.env`
  
  // if (!fs.existsSync(path))
  //   throw new Error('No environment file found')
  
  // dotenv.config({
  //   path: path
  // })

  const app = await NestFactory.create(AppModule);

  const docs_path = "/docs"
  const port = 3000

  const swaggerconfig = new DocumentBuilder()
    .setTitle("Documentation")
    .setDescription("Gives the EndPoints overview")
    .setVersion("1.0")
    .build()
 
  const doc = SwaggerModule.createDocument(app, swaggerconfig)
  SwaggerModule.setup(docs_path, app, doc)

  await app.listen(port, async () => {
    // const imp = app.get(ImporterService)
    // await imp.load('/home/suheyl/Downloads/iso_639-1.csv')
  });

}
bootstrap();
