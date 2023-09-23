import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class SignTokenDto {
  @IsString({ message: 'uuid必须是字符串' })
  @IsNotEmpty({ message: 'uuid不能为空' })
  uuid: string
}

export class SignUpDto {
  @ApiProperty({ description: '用户名', required: true })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string

  @ApiProperty({ description: '用户登录的密码', required: true })
  password: string

  @ApiProperty({ description: '用户手机号' })
  phone?: string

  @ApiProperty({ description: '用户邮箱' })
  email?: string
}

export class LoginDto {
  @ApiProperty({ description: '用户名', required: true })
  @IsNotEmpty({ message: '用户不能为空' })
  username: string

  @ApiProperty({ description: '用户登录的密码', required: true })
  password: string
}
