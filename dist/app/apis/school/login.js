"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
// import { GetNetInfo } from "~/app/functions/payNet/getNetInfo";
const validators_1 = require("~/app/validators/validators");
const common_1 = require("~/app/functions/school/common");
// import { available } from "~/app/other/test";
// import { ServerMaintenance } from "~/core/http-exception"
const router = new Router();
exports.router = router;
router.post("/functions/login", async (context) => {
    // if (!available) {
    //     throw new ServerMaintenance("学校网站维护中");
    // } else {
    await new validators_1.AccountValidator().validate(context);
    const { schoolId, password } = context.request.body;
    const cookie = await common_1.Cookie.getCookie(schoolId, password);
    context.body = { cookie };
});
