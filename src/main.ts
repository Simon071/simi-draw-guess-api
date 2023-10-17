import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { HttpExceptionFilter } from './common/filter/http-exception.filter'
import { VersioningType } from '@nestjs/common'
import { ValidationPipe } from '@nestjs/common'
import { Response } from './common/interceptor/response'
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableVersioning({
    type: VersioningType.URI
  })

  // 接口统一前缀
  app.setGlobalPrefix('api')
  app.useGlobalInterceptors(new Response())
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(new ValidationPipe())
  // 跨域
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
  })
  const options = new DocumentBuilder()
    .setTitle('Simon DrawGuess API')
    .setDescription("to provide services to Simon's Draw&Guess App ")
    .setVersion('1.0')
    .addTag('API')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('/api-docs', app, document)
  app.use('/api-docs.json', (req, res) => {
    res.status(200).json(document)
  })
  await app.listen(3000)
}
bootstrap()
