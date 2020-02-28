import Router = require("koa-router");
import { GetNetInfo } from "~/app/functions/payNet/getNetInfo";
import { AccountValidator } from "~/app/validators/validators";
import { available } from "~/app/other/test";
const router = new Router();
router.post("/functions/getNetInfo", async context => {
    if (!available) {
        context.body = { msg: "学校网站维护" };
        context.status = 502;
    } else {
        await new AccountValidator().validate(context);
        const infoOperations = new GetNetInfo(context.request.body);
        context.body = await infoOperations.getInfo();
        infoOperations.browser.close().catch();
    }
});
export { router };
