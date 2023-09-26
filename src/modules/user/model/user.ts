import { BeforeUpdate, Column, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'

enum UserRole {
  USER = '1',
  ADMINISTRATOR = '2'
}

@Table
export class User extends Model<User> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    comment: '用户的唯一标识'
  })
  uid: number

  @Column({
    comment: '用户名'
  })
  username: string

  @Column({
    comment: '用户的登录密码'
  })
  password: string

  @Column({
    unique: true,
    comment: '用户的邮箱地址'
  })
  email: string

  @Column({
    unique: true,
    comment: '用户的手机号码'
  })
  phone: string

  @Column({
    type: DataTypes.ENUM(UserRole.USER, UserRole.ADMINISTRATOR),
    comment: '用户角色 1，普通用户 2. 管理员'
  })
  role: UserRole

  @Column({
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    comment: '创建时间'
  })
  created_at: Date

  @Column({
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    comment: '更新时间'
  })
  updated_at: Date
  @BeforeUpdate
  static updateTimestamp(instance: User) {
    instance.updated_at = new Date()
  }
}
