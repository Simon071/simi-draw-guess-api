import { Injectable } from '@nestjs/common'
import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt'
import { jwtConfig } from './constant/index'

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  createJwtOptions(): JwtModuleOptions {
    return jwtConfig
  }
}
