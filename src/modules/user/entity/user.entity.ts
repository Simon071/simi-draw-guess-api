import { IsHexColor } from 'class-validator'
import { Column, Model, Table } from 'sequelize-typescript'

@Table({
  tableName: 'USER'
})
export class User extends Model<User> {
  @Column({ primaryKey: true, autoIncrement: true, comment: '用户的唯一标识' })
  uid: number

  @Column({ unique: true, comment: '用户uuid' })
  uuid: string

  @Column({ comment: '用户名' })
  username: string

  @Column({ unique: true, comment: '用户的邮箱地址' })
  email: string

  @Column({ comment: '用户的登录密码' })
  password: string

  @Column({ unique: true, comment: '用户的手机号码' })
  phone?: string

  @Column({ comment: '用户角色 1，普通用户 2. 管理员' })
  role: string

  @Column({ comment: '头像颜色' })
  @IsHexColor({ message: '头像颜色必须是十六进制的' })
  avatar: string

  @Column({ field: 'created_at', comment: '创建时间' }) // 使用 created_at 字段名
  createdAt: Date

  @Column({ field: 'updated_at', comment: '更新时间' }) // 使用 updated_at 字段名
  updatedAt: Date
}
