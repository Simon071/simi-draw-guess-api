import { UserService } from './user.service'
import { CreateDto, CreateSignUpDto, UpdateUserDto } from './dto/create-login.dto'
import { Controller, Post, Body, Get, Param } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Public } from 'src/common/decorator/public.decorator'
@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('用户')
  @ApiOperation({ summary: '用户登录' })
  @Public()
  @Post('/login')
  async login(@Body() createDto: CreateDto) {
    try {
      return this.userService.login(createDto)
    } catch (e) {}
  }

  @ApiTags('用户')
  @ApiOperation({ summary: '用户注册' })
  @Public()
  @Post('/signup')
  async signUp(@Body() createDto: CreateSignUpDto) {
    return await this.userService.signUp(createDto)
  }

  @ApiTags('用户')
  @ApiOperation({ summary: '获取用户信息' })
  @Get('/getUserInfo')
  async getUserInfo(@Param() param: any) {
    return await this.userService.getUserInfo(param)
  }

  @ApiTags('用户')
  @ApiOperation({ summary: '修改用户信息' })
  @Post('/updateUserInfo')
  async updateUserInfo(@Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateUserInfo(updateUserDto)
  }
}
