import { JwtService } from '@nestjs/jwt'
import { SignTokenDto, SignUpDto, LoginDto } from './dto/create-auth.dto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  signToken(signTokenDto: SignTokenDto) {
    return {
      access_token: 'Bearer ' + this.jwtService.sign(signTokenDto)
    }
  }

  /**
   * 用户注册
   * @param {SignUpDto} signUpDto
   * @returns
   */
  signUp(signUpDto: SignUpDto) {
    return signUpDto
  }

  login(loginDto: LoginDto) {
    return loginDto
  }
}
