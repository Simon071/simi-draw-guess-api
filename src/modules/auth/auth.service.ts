import { JwtService } from '@nestjs/jwt'
import { SignTokenDto, SignUpDto, LoginDto } from './dto/create-auth.dto'
import { Injectable } from '@nestjs/common'
import { User } from '../user/model/user'
import { InjectModel } from '@nestjs/sequelize'
import * as bcryptjs from 'bcryptjs'
import { statusToJson } from 'src/common/utils/http'
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,

    @InjectModel(User)
    private readonly userModel: typeof User
  ) {}

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
  async signUp(signUpDto: SignUpDto) {
    try {
      const { username, password, ...options } = signUpDto
      const findPerson = this.userModel.findOne({ where: { username } })
      if (username && !findPerson) {
        const salt = await bcryptjs.genSalt()
        const handledPwd = bcryptjs.hashSync(password, salt)
        const result = await this.userModel.create({ username, password: handledPwd, ...options })
        return result
      }
    } catch (e) {
      return statusToJson(500, '插入失败')
    }
  }

  /**
   * 用户登录
   * @param {LoginDto} loginDto
   * @returns
   */
  async login(loginDto: LoginDto) {
    const { username, password } = loginDto
    const user = await this.userModel.findOne({ where: { username } })
    if (!user) {
      await this.signUp(loginDto)
    }
    const { password: pwd } = user
    const compare: boolean = bcryptjs.compareSync(password, pwd)
    if (!compare) {
      return statusToJson(500, '用户密码不正确')
    }
    const now = new Date().getTime()
    const payload = { username, loginTime: now }
    const access_token = await this.jwtService.signAsync(payload)
    return {
      access_token,
      msg: 'success'
    }
  }
}
