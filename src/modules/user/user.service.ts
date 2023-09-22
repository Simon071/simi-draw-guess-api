import { Injectable } from '@nestjs/common'
import { CreateLoginDto } from './dto/create-login.dto'

@Injectable()
export class UserService {
  constructor() {}

  async login(createLoginDto: CreateLoginDto) {
    return createLoginDto
  }
}
