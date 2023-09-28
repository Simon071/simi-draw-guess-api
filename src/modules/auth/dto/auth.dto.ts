import { IsNotEmpty, IsString } from 'class-validator'

export class SignUserDto {
  @IsString({ message: 'uuid必须是字符串' })
  @IsNotEmpty({ message: 'uuid不能为空' })
  uuid
}
