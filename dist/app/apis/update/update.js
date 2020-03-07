"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const update_message_1 = require("./update-message");
const router = new Router();
exports.router = router;
router.get("/functions/update", async (context) => {
    context.body = update_message_1.message;
});
