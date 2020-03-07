"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
exports.available = true;
setInterval(async () => {
    try {
        await axios_1.default.get("https://selfmanager.gdut.edu.cn/", {
            timeout: 60000,
        });
        exports.available = true;
    }
    catch (err) {
        exports.available = false;
    }
}, 5 * 60 * 1000);
