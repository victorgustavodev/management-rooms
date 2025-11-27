import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor
} from '@nestjs/common'
import { HttpArgumentsHost } from '@nestjs/common/interfaces'
import { Request } from 'express'
import { map, Observable } from 'rxjs'

import dayjs from '../config/dayjs.config'


@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private logger = new Logger(ResponseInterceptor.name)

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx: HttpArgumentsHost = context.switchToHttp()
    const request: Request<any> = ctx.getRequest<Request>()

    this.logger.log(
      `[${request.method}] ${request.originalUrl} - Status: ${request?.res?.statusCode}`
    )

    return next.handle().pipe(
      map((data) => {
        return {
          statusCode: request?.res?.statusCode,
          timestamp: dayjs().tz('America/Recife').toISOString(),
          ...data
        }
      })
    )
  }
}
