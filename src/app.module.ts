import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { getEnvConfig } from './config/env'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './modules/auth/auth.controller'
import { AuthService } from './modules/auth/auth.service'
import { AuthModule } from './modules/auth/auth.module'
import { UserController } from './modules/user/user.controller';
import { UserModule } from './modules/user/user.module';
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
      models: [], // 模型位置,
      synchronize: true
      // autoLoadModels: true
    }),
    JwtModule,
    AuthModule,
    UserModule
  ],
  controllers: [AppController, AuthController, UserController],
  providers: [
    AppService,
    AuthService
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard
    // }
  ]
})
export class AppModule {}
