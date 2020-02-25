"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("~/app/router");
require('~/app/browser/Pools');
class InitManager {
    static initCore(app) {
        this.app = app;
        router_1.registerRouter(app);
    }
}
exports.default = InitManager;
