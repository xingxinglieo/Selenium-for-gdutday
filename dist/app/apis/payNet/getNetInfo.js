"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const getNetInfo_1 = require("~/app/functions/payNet/getNetInfo");
const validators_1 = require("~/app/validators/validators");
const router = new Router();
exports.router = router;
router.post("/functions/getNetInfo", async (context) => {
    // if (after23_30 || before8) {
    //     context.body = { msg:'学校网站维护' };
    //     context.status = 502;
    // }
    // else {
    await new validators_1.AccountValidator().validate(context);
    const infoOperations = new getNetInfo_1.GetNetInfo(context.request.body);
    context.body = await infoOperations.getInfo();
    infoOperations.browser.close().catch();
    // }
});
