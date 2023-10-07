import { AuthService } from './../auth/auth.service'
import { Injectable, forwardRef, Inject, UnauthorizedException, InternalServerErrorException } from '@nestjs/common'
// import { InjectModel } from '@nestjs/sequelize'
import { User } from './entity/user.entity'
import { CreateDto, CreateSignUpDto, UpdateUserDto } from './dto/create-login.dto'
import { v4 as uuidv4 } from 'uuid'
import * as bcryptjs from 'bcryptjs'
import { InjectModel } from '@nestjs/sequelize'
import { statusToJson } from 'src/common/utils/http'
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModal: typeof User,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService
  ) {}

  /**
   * 用户登录
   * @param {CreateDto} createDto
   * @returns
   */
  async login(createDto: CreateDto) {
    const { username, password } = createDto
    try {
      const existUser = await this.findByUsername(username)
      // 已在数据库存在
      if (existUser) {
        const pwdPass = bcryptjs.compareSync(password, existUser.password)
        if (!pwdPass) {
          throw new UnauthorizedException('用户密码不正确')
        }
        const { dataValues: uuid } = existUser

        const token = await this.authService.signToken(uuid)
        return { token, userInfo: existUser }
      }
      return statusToJson(500, '用户不存在')
    } catch (e: ErrorEvent | any) {
      return statusToJson(500, e.message)
    }
  }

  /**
   * 用户注册
   * @param {CreateSignUpDto} signUpDto
   */
  async signUp(signUpDto: CreateSignUpDto) {
    const { username, password } = signUpDto
    try {
      const user = await this.findByUsername(username)
      if (!user) {
        const bPassword = await this.hashPassword(password)
        const uuid = uuidv4()
        const avatar = this.randomColor()
        const createUser = await this.userModal.create({ username, password: bPassword, role: '1', uuid, avatar })
        if (createUser) {
          const result = await this.authService.signToken(uuid)
          return { data: { token: result }, msg: 'success' }
        }
      }
      return statusToJson(500, '该用户名已被注册')
    } catch (e: ErrorEvent | any) {
      return statusToJson(500, e.message)
    }
  }

  /**
   * 获取个人信息
   * @param json
   * @returns
   */
  async getUserInfo(uuid: string): Promise<any> {
    return await this.findByJson({ uuid })
  }

  /**
   * 更新用户信息
   * @param updateUserDto
   * @returns
   */
  async updateUserInfo(updateUserDto: UpdateUserDto) {
    const { username, uuid, ...updateOptions } = updateUserDto
    try {
      const {
        dataValues: { username: ogUsername }
      } = await this.findByUsername(uuid)
      if (ogUsername === username) {
        return await this.updateUser({ uuid, ...updateOptions })
      } else {
        const user = await this.findByUsername(username)
        if (!user) {
          return this.updateUser(updateUserDto)
        }
      }
    } catch (e) {
      return statusToJson(500, e.message)
    }
  }

  /**
   * 通过自己传条件来进行查询
   * @param json
   * @returns {User} user
   */
  async findByJson(json: any) {
    return await this.userModal.findOne({ where: json })
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.userModal.findOne({ where: { username } })
  }

  /**
   * 更新到数据库
   * @param data
   * @returns
   */
  async updateUser(data: any) {
    try {
      const { uuid, ...fields } = data
      if (fields.password) {
        fields.password = this.hashPassword(fields.password)
      }
      return await this.userModal.update(fields, { where: { uuid } })
    } catch (e) {
      return statusToJson(500, '更新到数据库时出错')
    }
  }

  /**
   * hash化密码
   * @param password
   * @returns
   */
  async hashPassword(password) {
    try {
      const salt = await bcryptjs.genSalt()
      const hPassword = await bcryptjs.hash(password, salt)
      return hPassword
    } catch (e) {
      throw new InternalServerErrorException('生成密码的时候出错')
    }
  }

  /**
   * 随机生成一个十六进制的颜色
   * @returns
   */
  randomColor() {
    const length = 6 // 生成的十六进制数的长度
    let result = ''
    const characters = '0123456789ABCDEF'

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      result += characters[randomIndex]
    }

    return '#' + result
  }
}
