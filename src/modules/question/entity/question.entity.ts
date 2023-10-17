import { Column, Model, Table } from 'sequelize-typescript'

@Table
export class Question extends Model<Question> {
  @Column({ primaryKey: true, autoIncrement: true })
  qid: string

  @Column({ comment: '问题内容' })
  answer: string

  @Column({ field: 'created_at', comment: '创建时间' }) // 使用 created_at 字段名
  createdAt: Date

  @Column({ field: 'updated_at', comment: '更新时间' }) // 使用 updated_at 字段名
  updatedAt: Date
}
