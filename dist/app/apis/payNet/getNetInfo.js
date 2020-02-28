"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const getNetInfo_1 = require("~/app/functions/payNet/getNetInfo");
const validators_1 = require("~/app/validators/validators");
const util_1 = require("~/lib/util");
const router = new Router();
exports.router = router;
router.post('/functions/getNetInfo', async (context) => {
    if (util_1.after23_30 && util_1.before8) {
        context.body = { msg: '学校网站维护' };
        context.status = 502;
    }
    else {
        await new validators_1.AccountValidator().validate(context);
        const infoOperations = new getNetInfo_1.GetNetInfo(context.request.body);
        context.body = await infoOperations.getInfo();
        infoOperations.browser.close().catch();
    }
});
