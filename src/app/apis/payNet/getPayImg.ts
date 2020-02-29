import Router = require("koa-router");
import { config } from "~/config";
import { GetPayImg } from "~/app/functions/payNet/getPayImg";
import { PayNetValidator } from "~/app/validators/validators";
import { available } from "~/app/other/test";
import { ServerMaintenance } from "~/core/http-exception";
const router = new Router();
router.post("/functions/getPayImg", async context => {
    if (!available) {
        new ServerMaintenance("学校网站维护中");
    } else {
        if (config.dev) console.log(context);
        await new PayNetValidator().validate(context);
        const srcOperations = new GetPayImg(context.request.body);
        context.body = await srcOperations.getPay();
        srcOperations.browser.close().catch();
    }
});
export { router };
