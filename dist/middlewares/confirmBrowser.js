"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pools_1 = require("~/app/browser/Pools");
exports.confrimBroswer = async (_context, next) => {
    await next();
    Pools_1.PayNetBrowserPool.confim();
    Pools_1.QuTuoBroswerPool.confim();
};
