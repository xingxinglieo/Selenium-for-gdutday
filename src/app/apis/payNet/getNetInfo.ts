import Router = require("koa-router");
import { GetNetInfo } from "~/app/functions/payNet/getNetInfo";
import { AccountValidator } from "~/app/validators/validators";
import { after23_30, before8 } from "~/lib/util";
const router = new Router();
router.post("/functions/getNetInfo", async context => {
    // if (after23_30 || before8) {
    //     context.body = { msg:'学校网站维护' };
    //     context.status = 502;
    // }
    // else {
    await new AccountValidator().validate(context);
    const infoOperations = new GetNetInfo(context.request.body);
    context.body = await infoOperations.getInfo();
    infoOperations.browser.close().catch();
    // }
});
export { router };
