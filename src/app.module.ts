import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { getEnvConfig } from './config/env'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { AuthModule } from './modules/auth/auth.module'
import { JwtAuthGuard } from './modules/auth/auth.guard'
import { UserModule } from './modules/user/user.module'
import { User } from './modules/user/entity/user.entity'
import { SyncModule } from './modules/sync/sync.module'
import { QuestionModule } from './modules/question/question.module'
import { Question } from './modules/question/entity/question.entity'
getEnvConfig()
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      models: [User, Question], // 模型位置,
      synchronize: true
      // autoLoadModels: true
    }),
    AuthModule,
    UserModule,
    JwtModule,
    SyncModule,
    QuestionModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ]
})
export class AppModule {}
