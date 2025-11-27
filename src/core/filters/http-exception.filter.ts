import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger
} from '@nestjs/common'
import { HttpArgumentsHost } from '@nestjs/common/interfaces'

import { Request, Response } from 'express'

import dayjs from '../config/dayjs.config'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger(HttpExceptionFilter.name)

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp()
    const request: Request<any> = ctx.getRequest<Request>()
    const response: Response<any> = ctx.getResponse<Response>()
    const status: number = exception.getStatus()
    const message: any = exception.getResponse()
    const userAgent = request.get('user-agent') || ''

    let messageLogger = `[${request.method}] ${request.originalUrl} - Status: ${status} - IP: ${request.ip} - User Agent: ${userAgent}`
    if (status >= 500) {
      messageLogger += ` - Message: ${message.message || message.error || message}`
    }
    const loggerColor = status >= 500 ? 'error' : 'warn'
    this.logger[loggerColor](messageLogger)

    response.status(status).json({
      ...(status === 429 ? { message } : { ...message }),
      timestamp: dayjs().tz('America/Recife').toISOString()
    })
  }
}
