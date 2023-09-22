import { CreateLoginDto } from './dto/create-login.dto'
import { UserService } from './user.service'
import { Body, Controller, Post } from '@nestjs/common'

@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async login(@Body() createLoginDto: CreateLoginDto) {
    return this.userService.login(createLoginDto)
  }
}
