"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    constructor(msg = "服务器异常", errorCode = 10000, code = 500) {
        super();
        this.msg = msg;
        this.errorCode = errorCode;
        this.code = code;
    }
}
exports.HttpException = HttpException;
class ParameterException extends HttpException {
    constructor(msg = "参数错误", errorCode = 10000) {
        super(msg, errorCode, 400);
    }
}
exports.ParameterException = ParameterException;
class Success extends HttpException {
    constructor(msg = "ok", errorCode = 0) {
        super(msg, errorCode, 201);
    }
}
exports.Success = Success;
class NotFound extends HttpException {
    constructor(msg = "资源未找到", errorCode = 10000) {
        super(msg, errorCode, 404);
    }
}
exports.NotFound = NotFound;
class AuthFailed extends HttpException {
    constructor(msg = "授权失败", errorCode = 10004) {
        super(msg, errorCode, 401);
    }
}
exports.AuthFailed = AuthFailed;
class Forbbiden extends HttpException {
    constructor(msg = "禁止访问", errorCode = 10006) {
        super(msg, errorCode, 403);
    }
}
exports.Forbbiden = Forbbiden;
class ServerMaintenance extends HttpException {
    constructor(msg = "服务器维护", errorCode = 10005) {
        super(msg, errorCode, 502);
    }
}
exports.ServerMaintenance = ServerMaintenance;
//挂载至全局
