import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ErrorDto } from '../dto/error.dto';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const httpMessage =
      exception instanceof HttpException
        ? exception.message
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody: ErrorDto = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message: httpMessage,
    };
    console.log(`Time: ${new Date().toISOString()}\nErrorCode: ${exception}\n`);
    //Logger 변경하기
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
