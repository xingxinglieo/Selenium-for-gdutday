"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const config_1 = require("~/config");
const common_1 = require("~/app/functions/QuTuo/common");
const validators_1 = require("~/app/validators/validators");
const router = new Router();
exports.router = router;
router.post('/functions/loginQuTuo', async (context) => {
    if (config_1.config.dev)
        console.log(context);
    await new validators_1.AccountValidator().validate(context);
    const srcOperations = new common_1.LoginQuTuo(context.request.body);
    context.body = await srcOperations.login();
    srcOperations.browser.close();
});
