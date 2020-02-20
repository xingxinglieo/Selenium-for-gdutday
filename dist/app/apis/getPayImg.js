"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const getPayImg_1 = require("~/app/functions/getPayImg");
const validators_1 = require("~/app/validators/validators");
const router = new Router();
exports.router = router;
router.post('/functions/getPayImg', async (context) => {
    await new validators_1.AccountValidator().validate(context);
    const { schoolId, password } = context.request.body;
    const src = await getPayImg_1.getCampusNetworkPayQRcode(schoolId, password);
    context.body = {
        src
    };
});
