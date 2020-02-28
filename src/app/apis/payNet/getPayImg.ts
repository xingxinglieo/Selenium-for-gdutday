import Router = require("koa-router");
import { config } from "~/config";
import { GetPayImg } from "~/app/functions/payNet/getPayImg";
import { PayNetValidator } from "~/app/validators/validators";
import { available } from "~/app/other/test";
const router = new Router();
router.post("/functions/getPayImg", async context => {
    if (!available) {
        context.body = { msg: "网站维护" };
        context.status = 502;
    } else {
    if (config.dev) console.log(context);
    await new PayNetValidator().validate(context);
    const srcOperations = new GetPayImg(context.request.body);
    context.body = await srcOperations.getPay();
    srcOperations.browser.close().catch();
    }
});
export { router };
