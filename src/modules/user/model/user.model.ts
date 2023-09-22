import { Column, Model, Table } from 'sequelize-typescript'
import { ENUM } from 'sequelize'

enum UserRole {
  USER = '1',
  ADMINISTRATOR = '2'
}

@Table
export class User extends Model {
  @Column
  uid: string

  @Column
  username: string

  @Column
  password: string

  @Column
  email: string

  @Column
  phone: string

  @Column({ type: ENUM, values: [UserRole.USER, UserRole.ADMINISTRATOR] })
  role: UserRole
}
