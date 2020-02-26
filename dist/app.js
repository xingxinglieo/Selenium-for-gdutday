"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppLication = require("koa"); //应用对象
const bodyParser = require("koa-bodyparser");
// import { config } from '~/config'
const bestRequire = require("best-require"); //ts-ignore
bestRequire(`${__dirname}`); //ts-ignore
const exception_1 = require("~/middlewares/exception");
const init_1 = require("~/core/init");
const app = new AppLication();
app.use(exception_1.default);
app.use(bodyParser());
init_1.default.initCore(app);
const host = 3000;
app.listen(host);
console.log(`listen on${host}`);
