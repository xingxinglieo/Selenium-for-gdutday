"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getPayImg_1 = require("~/app/apis/getPayImg");
const routerList = [getPayImg_1.router];
function registerRouter(app) {
    routerList.forEach((router) => {
        app.use(router.routes());
    });
}
exports.registerRouter = registerRouter;
