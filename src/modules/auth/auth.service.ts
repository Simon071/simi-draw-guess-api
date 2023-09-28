import { JwtService } from '@nestjs/jwt'
import { UserService } from './../user/user.service'
import { Injectable } from '@nestjs/common'
import { jwtConfig } from './constant'
import { statusToJson } from 'src/common/utils/http'
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  /**
   * 签名
   * @param payload
   * @returns
   */
  async signToken(payload: any) {
    return 'Bearer ' + (await this.jwtService.sign(payload))
  }

  async verifyToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConfig.secret
      })
      return statusToJson(200, payload)
    } catch (error) {
      return statusToJson(401, 'token失效')
    }
  }
}
