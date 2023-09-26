import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { jwtConfig } from './constant'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from '../user/model/user'

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiredTime
      }
    }),
    SequelizeModule.forFeature([User])
  ],
  providers: [AuthService, JwtService]
})
export class AuthModule {}
