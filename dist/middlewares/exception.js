"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_exception_1 = require("~/core/http-exception");
const config_1 = require("~/config");
const catchError = async (context, next) => {
    try {
        await next();
    }
    catch (err) {
        class expectionBody {
            constructor(msg, error_code, request = `method:${context.method}  path:${context.path}`) {
                this.msg = msg;
                this.error_code = error_code;
                this.request = request;
            }
        }
        if (err instanceof http_exception_1.HttpException) {
            context.body = new expectionBody(err.msg, err.errorCode);
            context.status = err.code;
        }
        else {
            if (config_1.config.dev) {
                // 处于开发环境抛出错误 
                throw err;
            }
            else {
                context.body = new expectionBody('服务器错误', 999);
                context.status = 500;
            }
        }
    }
};
exports.default = catchError;
// module.exports = catchError;
