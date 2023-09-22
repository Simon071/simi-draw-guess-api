import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtModule, JwtService } from '@nestjs/jwt'

@Module({
  imports: [JwtModule],
  providers: [AuthService, JwtService]
})
export class AuthModule {}
