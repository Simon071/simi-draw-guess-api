import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'

@Module({
  controllers: [UserController],
  imports: [],
  exports: [UserService],
  providers: [UserService]
})
export class UserModule {}
