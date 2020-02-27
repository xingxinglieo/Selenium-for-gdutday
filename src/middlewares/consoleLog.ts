import Koa = require('koa');
const consoleLog: Koa.Middleware = async (context: Koa.BaseContext, next: Koa.Next) => {
    console.log(context);
    await next();
}
export {
    consoleLog
}
// module.exports = catchError;