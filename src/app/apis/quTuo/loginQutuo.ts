import Router = require("koa-router");
import { LoginQuTuo } from "~/app/functions/QuTuo/common";
import { AccountValidator } from "~/app/validators/validators";
const router = new Router();
router.post("/functions/loginQuTuo", async context => {
    await new AccountValidator().validate(context);
    const srcOperations = new LoginQuTuo(context.request.body);
    context.body = await srcOperations.login();
    srcOperations.browser.close();
});
export { router };
