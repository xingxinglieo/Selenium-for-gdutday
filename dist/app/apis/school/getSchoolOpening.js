"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const static_1 = require("~/app/static");
const router = new Router();
exports.router = router;
router.get("/functions/getSchoolOpening", async (context) => {
    context.body = { schoolOpening: static_1.schoolOpening };
});
