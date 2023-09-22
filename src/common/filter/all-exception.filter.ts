import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { Response } from 'express'
import { writeLog } from 'src/common/utils/log'
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest()
    let status = 500
    let message = 'Internal server error'

    if (exception instanceof HttpException) {
      status = exception.getStatus()
      message = exception.message
    }
    // sls日志上传
    try {
      writeLog()
    } catch (error) {}
    response.status(status).json({
      state: status,
      path: request.url,
      data: null,
      timestamp: new Date().toISOString(),
      message: message
    })
  }
}
