import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe, VersioningType} from "@nestjs/common";
import {Request, Response} from "express";
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as dotenv from 'dotenv';
import {DurationInterceptor} from "./interceptors/duration/duration.interceptor";
import {ConfigService} from "@nestjs/config";

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService=app.get(ConfigService);

  const corsOptions = {
    origin: ['http://localhost:4200'],//tout ce que est different de cette @ je ne vais pas l'accepter
  }
  app.enableCors(corsOptions);
  //app.use(helmet);
  // app.use(morgan('dev'));

  app.use(
      (req:Request,res:Response,next)=>{
        console.log('Middleware from app.use');
        next();
      }
  );

  app.enableVersioning({
    type: VersioningType.URI
  });

  app.useGlobalInterceptors(new DurationInterceptor());

  app.useGlobalPipes(new ValidationPipe({
    transform:true,
    // whitelist:true,
    // forbidNonWhitelisted:true,
  }));

  await app.listen(configService.get('APP_PORT'));
}

bootstrap();
