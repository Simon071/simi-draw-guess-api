import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { IS_IGNORE_VERIFY_KEY, jwtConfig, jwtName } from './constant'
import { JwtService } from '@nestjs/jwt'
import { Reflector } from '@nestjs/core'
export type IAuthRequest = Request & {
  headers: { authorization: string }
}
@Injectable()
export class JwtAuthGuard extends AuthGuard(jwtName) {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector
  ) {
    super()
  }
  async canActivate(context: ExecutionContext): Promise<any> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_IGNORE_VERIFY_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)

    if (isPublic) {
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: jwtConfig.secret
        })
        request['userInfo'] = payload
      } catch (e) {
        return true
      }
    }

    if (!token) {
      throw new UnauthorizedException()
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConfig.secret
      })
      // 所有请求都可以用request['userInfo']获取到用户信息
      request['userInfo'] = payload
    } catch {
      throw new UnauthorizedException()
    }
    return super.canActivate(context)
  }

  private extractTokenFromHeader(request: IAuthRequest): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') || []
    return type === 'Bearer' ? token : null
  }
}
