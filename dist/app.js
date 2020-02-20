"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppLication = require("koa"); //应用对象
const bodyParser = require("koa-bodyparser");
const bestRequire = require("best-require");
bestRequire(`${__dirname}`);
const exception_1 = require("~/middlewares/exception");
const init_1 = require("~/core/init");
const app = new AppLication();
app.use(exception_1.default);
app.use(bodyParser());
init_1.default.initCore(app);
app.listen(3000);
