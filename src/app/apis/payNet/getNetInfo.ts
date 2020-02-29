import Router = require("koa-router");
import { GetNetInfo } from "~/app/functions/payNet/getNetInfo";
import { AccountValidator } from "~/app/validators/validators";
import { available } from "~/app/other/test";
import { ServerMaintenance } from "~/core/http-exception"
const router = new Router();
router.post("/functions/getNetInfo", async context => {
    if (!available) {
        throw new ServerMaintenance("学校网站维护中");
    } else {
        await new AccountValidator().validate(context);
        const infoOperations = new GetNetInfo(context.request.body);
        context.body = await infoOperations.getInfo();
        infoOperations.browser.close().catch();
    }
});
export { router };
