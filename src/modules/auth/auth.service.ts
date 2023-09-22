import { JwtService } from '@nestjs/jwt'
import { SignTokenDto } from './dto/create-auth.dto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  signToken(signTokenDto: SignTokenDto) {
    return {
      access_token: 'Bearer ' + this.jwtService.sign(signTokenDto)
    }
  }
}
