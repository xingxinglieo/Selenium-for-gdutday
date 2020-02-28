"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const test_1 = require("~/app/other/test");
const router = new Router();
exports.router = router;
router.get("/functions/check", async (context) => {
    context.body = {
        available: test_1.available,
    };
});
