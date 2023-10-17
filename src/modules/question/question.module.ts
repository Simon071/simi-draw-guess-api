import { Module } from '@nestjs/common'
import { QuestionService } from './question.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { Question } from './entity/question.entity'

@Module({
  imports: [SequelizeModule.forFeature([Question])],
  exports: [QuestionService],
  providers: [QuestionService]
})
export class QuestionModule {}
