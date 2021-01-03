import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter<Error> {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const erro =
      exception instanceof HttpException ? exception.getResponse() : undefined;
    const { name, message, stack } = exception;

    this.logger.error(
      `Http Status: [${status}], Name: [${name}], Message: ${message}`,
    );
    this.logger.verbose(stack);

    response.status(status).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      erro,
      name,
      message,
    });
  }
}
