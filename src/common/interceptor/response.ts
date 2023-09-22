import { Injectable, NestInterceptor, CallHandler } from '@nestjs/common'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { writeLog } from 'src/common/utils/log'
/**
 * 响应拦截器
 */
class ExecutionContext {
  [x: string]: any
}

@Injectable()
export class Response implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    // const req = context.switchToHttp().getRequest()
    return next.handle().pipe(
      map(data => {
        // sls日志上传
        try {
          writeLog()
        } catch (error) {}
        const httpStatus = data && data.httpStatus ? data.httpStatus : 1
        const responseMessage = data && data.responseMessage ? data.responseMessage : '操作成功'
        const responseData = data && data.httpStatus ? null : data

        return {
          data: responseData,
          state: httpStatus,
          message: responseMessage
        }
      })
    )
  }
}
