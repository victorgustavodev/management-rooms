import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { RESPONSE } from '../response/response.messages'

@Injectable()
export class ApiKeyGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const apiKey = request.headers['api-key'] as string

    if (!apiKey) {
      throw new UnauthorizedException(RESPONSE.COMMON.API_KEY_REQUIRED)
    }

    if (apiKey !== process.env.API_KEY) {
      throw new UnauthorizedException(RESPONSE.COMMON.INVALID_API_KEY)
    }

    return true
  }
}
