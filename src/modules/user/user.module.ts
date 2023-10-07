import { Module, forwardRef } from '@nestjs/common'
import { UserService } from './user.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from './entity/user.entity'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [SequelizeModule.forFeature([User]), forwardRef(() => AuthModule)],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
