import { Controller, Body, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignTokenDto, SignUpDto } from './dto/create-auth.dto'
import { Public } from './common/public.decorator'
@Controller({
  path: 'auth',
  version: '1'
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  signToken(@Body() signUserDto: SignTokenDto) {
    return this.authService.signToken(signUserDto)
  }

  @Public()
  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto)
  }

  @Public()
  @Post('/login')
  login(@Body() signUpDto: SignUpDto) {
    return this.authService.login(signUpDto)
  }
}
