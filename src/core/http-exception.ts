type strings = string | string[];
class HttpException extends Error {
    constructor(
        public msg: strings = "服务器异常",
        public errorCode = 10000,
        public code = 500
    ) {
        super();
    }
}
class ParameterException extends HttpException {
    constructor(msg: strings = "参数错误", errorCode = 10000) {
        super(msg, errorCode, 400);
    }
}

class Success extends HttpException {
    constructor(msg: strings = "ok", errorCode = 0) {
        super(msg, errorCode, 201);
    }
}

class NotFound extends HttpException {
    constructor(msg: strings = "资源未找到", errorCode = 10000) {
        super(msg, errorCode, 404);
    }
}

class AuthFailed extends HttpException {
    constructor(msg: strings = "授权失败", errorCode = 10004) {
        super(msg, errorCode, 401);
    }
}

class Forbbiden extends HttpException {
    constructor(msg: strings = "禁止访问", errorCode = 10006) {
        super(msg, errorCode, 403);
    }
}
class ServerMaintenance extends HttpException {
    constructor(msg: strings = "服务器维护", errorCode = 10005) {
        super(msg, errorCode, 502);
    }
}
export {
    HttpException,
    ParameterException,
    Success,
    NotFound,
    AuthFailed,
    Forbbiden,
    ServerMaintenance
};
//挂载至全局
