"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { router as getPayImg } from '~/app/apis/getPay/getPayImg';
const getNetInfo_1 = require("~/app/apis/payNet/getNetInfo");
const getPayImg_1 = require("~/app/apis/payNet/getPayImg");
const loginQuTuo_1 = require("~/app/apis/quTuo/loginQuTuo");
const text_1 = require("~/app/apis/test/text");
const routerList = [getNetInfo_1.router, getPayImg_1.router, loginQuTuo_1.router, text_1.router];
function registerRouter(app) {
    routerList.forEach(router => {
        app.use(router.routes());
    });
}
exports.registerRouter = registerRouter;
