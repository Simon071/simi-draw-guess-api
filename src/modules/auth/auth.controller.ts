import { Controller, Body, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignTokenDto, SignUpDto } from './dto/create-auth.dto'
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signToken(@Body() signUserDto: SignTokenDto) {
    return this.authService.signToken(signUserDto)
  }

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto)
  }
}
