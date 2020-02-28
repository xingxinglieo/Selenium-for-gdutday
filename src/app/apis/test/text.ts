import Router = require("koa-router");
import { available } from "~/app/other/test";
const router = new Router();
router.get("/functions/test", async context => {
    context.body = {
        available,
    };
});
export { router };
