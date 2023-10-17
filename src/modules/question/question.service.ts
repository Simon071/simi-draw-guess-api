import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Question } from './entity/question.entity'
import { Op } from 'sequelize'

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question)
    private readonly questionModal: typeof Question
  ) {}
  /**
   * 通过ids里面的id将对应数据库里面的数据找出来
   * @param ids 需要的id
   */
  async findAll(ids: string[]): Promise<Question[]> {
    return await this.questionModal.findAll({
      where: {
        qid: {
          [Op.in]: ids
        }
      }
    })
  }

  /**
   * 随机抽出几条数据
   * @param {Number} count 需要抽出数据的总数
   * @returns
   */
  async getRandomQuestions(count: number): Promise<Question[]> {
    return await this.questionModal.findAll({
      order: this.questionModal.sequelize.random(),
      limit: count
    })
  }
}
