import { Module } from '@nestjs/common'
import { SyncService } from './sync.service'
import { SyncGateway } from './sync.gateway'
import { QuestionModule } from '../question/question.module'

@Module({
  imports: [QuestionModule],
  providers: [SyncGateway, SyncService]
})
export class SyncModule {}
