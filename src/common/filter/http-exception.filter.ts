import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { writeLog } from 'src/common/utils/log'
/**
 * 异常拦截器
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()
    const status = exception.getStatus()
    const exceptionRes: any = exception.getResponse()
    const { error, message } = exceptionRes
    // sls日志上传
    try {
      writeLog()
    } catch (error) {}
    response.status(status).json({
      state: status,
      data: null,
      error,
      message,
      path: request.url,
      timestamp: new Date()
    })
  }
}
