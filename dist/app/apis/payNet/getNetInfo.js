"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const getNetInfo_1 = require("~/app/functions/payNet/getNetInfo");
const validators_1 = require("~/app/validators/validators");
const router = new Router();
exports.router = router;
router.get('/functions/getNetInfo', async (context) => {
    await new validators_1.AccountValidator().validate(context);
    const infoOperations = getNetInfo_1.newGetNetInfo(context.request.body);
    context.body = await infoOperations.getInfo();
});
