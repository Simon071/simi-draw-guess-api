import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { Reflector } from '@nestjs/core'
import { jwtConfig } from './constant'
import { JwtService } from '@nestjs/jwt'
import { REQUEST_USER_KEY } from 'src/constant'
import { Request } from 'express'
import { IS_PUBLIC_KEY } from './common/public.decorator'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.secret)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 看看是否是不需要提供token的公共请求
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler())
    if (isPublic) return true

    // 验证token
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (!token) {
      throw new UnauthorizedException()
    }
    try {
      const payload = this.jwtService.verifyAsync(token, this.jwtConfiguration)
      request[REQUEST_USER_KEY] = payload
    } catch (e) {
      throw new UnauthorizedException()
    }
    return true
  }

  private extractTokenFromHeader(req: Request): string | undefined {
    const { headers } = req
    const [_, token] = headers.authorization?.split(' ') ?? []
    return token
  }
}
