import { JwtModule } from '@nestjs/jwt'
import { Module, forwardRef } from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtConfigService } from './jwt.config.service'
import { AuthController } from './auth.controller'
import { JwtStrategy } from './jwt.strategy'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './auth.guard'
import { UserModule } from '../user/user.module'
import { UserService } from '../user/user.service'
@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.registerAsync({
      useClass: JwtConfigService,
      imports: []
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ],
  exports: [AuthService]
})
export class AuthModule {}
