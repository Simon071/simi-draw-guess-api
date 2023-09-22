import { IsString, IsNotEmpty } from 'class-validator'

export class SignTokenDto {
  @IsString({ message: 'uuid必须是字符串' })
  @IsNotEmpty({ message: 'uuid不能为空' })
  uuid: string
}
