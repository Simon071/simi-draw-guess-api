export class CreateDto {
  username: string
  password: string
}

export class CreateSignUpDto {
  username: string
  password: string
}

export class UpdateUserDto {
  uuid: string
  username?: string
  password?: string
  phone?: string
  email?: string
  avatar?: string
}
