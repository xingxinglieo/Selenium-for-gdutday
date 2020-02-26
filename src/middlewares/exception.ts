import Koa = require('koa');
import { HttpException } from '~/core/http-exception';
import { config } from '~/config';
const catchError: Koa.Middleware = async (context: Koa.BaseContext, next: Koa.Next) => {
    try {
        await next();
    } catch (err) {
        class expectionBody {
            constructor(
                protected msg: string | string[],
                protected error_code: number,
                protected request: string = `method:${context.method}  path:${context.path}`
            ) {
            }
        }
        if (err instanceof HttpException) {
            context.body = new expectionBody(err.msg, err.errorCode)
            context.status = err.code;
        } else {
            if (config.dev) {
                // 处于开发环境抛出错误 
                throw err;
            } else {
                context.body = new expectionBody('服务器错误', 999)
                context.status = 500;
            }
        }
    }
}
export default catchError;
// module.exports = catchError;