"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const config_1 = require("~/config");
const getPayImg_1 = require("~/app/functions/payNet/getPayImg");
const validators_1 = require("~/app/validators/validators");
const router = new Router();
exports.router = router;
router.post('/functions/getPayImg', async (context) => {
    if (config_1.config.dev)
        console.log(context);
    await new validators_1.PayNetValidator().validate(context);
    const srcOperations = new getPayImg_1.GetPayImg(context.request.body);
    context.body = await srcOperations.getPay();
    srcOperations.browser.close();
});
