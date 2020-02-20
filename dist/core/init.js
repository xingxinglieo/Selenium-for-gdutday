"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requireDirectory = require("require-directory");
const Router = require("koa-router");
class InitManager {
    static initCore(app) {
        //入口方法
        this.app = app;
        this.initLoadRouter();
    }
    //自动注册目录下面的路由
    static initLoadRouter() {
        const apiDirectory = `${process.cwd()}/dist/app/apis`;
        requireDirectory(module, apiDirectory, {
            visit: whenLoadRouter
        });
        //方法全部抽离
        //注意函数的this
        function whenLoadRouter(obj) {
            if (obj instanceof Router) {
                InitManager.app.use(obj.routes());
            }
            else if (obj.router instanceof Router) {
                InitManager.app.use(obj.router.routes());
            }
        }
    }
}
exports.default = InitManager;
