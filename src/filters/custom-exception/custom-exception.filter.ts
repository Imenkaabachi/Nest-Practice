import {ArgumentsHost, Catch, ExceptionFilter, HttpStatus} from '@nestjs/common';
import {Request, Response} from "express";

@Catch()
export class CustomExceptionFilter<T> implements ExceptionFilter {

  catch(exception: any, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();

      const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
      const timestamp = new Date().toISOString();
      const errorMessage = `Le message de l'erreur est : ${exception.message}`;

      response.status(status).json({
        statusCode: status,
        timestamp,
        message: errorMessage,
        path: request.url,
      });
    }

}
