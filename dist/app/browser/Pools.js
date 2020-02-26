"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { getNetInfo } from '~/app/functions/getNetInfo';
//管理GetImgBroswer的类
const Broswers_1 = require("./Broswers");
const Broswers_2 = require("./Broswers");
class BroswerPool {
    constructor(BrowserType, { plength = 2, interval = Broswers_1.Browser.timeout, closeTimeout = 30000 } = {}) {
        this.BrowserType = BrowserType;
        this.pools = [];
        this.plength = plength;
        this.interval = interval;
        this.closeTimeout = closeTimeout;
        this.watch();
    }
    async getBroswer() {
        const browser = this.hasBroswer()
            ? await this.popBroswer()
            : await this.BrowserType.createBrowser();
        this.autoDestroyBroswer(browser.instance);
        return browser;
    }
    async addBroswer() {
        const browser = await this.BrowserType.createBrowser();
        this.pushBroswer(browser);
    }
    pushBroswer(browser) {
        this.pools.push(browser);
    }
    popBroswer() {
        return this.pools.pop();
    }
    async hasBroswer() {
        return this.pools.length > 0;
    }
    async autoDestroyBroswer(browser) {
        return setTimeout(async () => await browser.close(), this.closeTimeout);
    }
    async watch() {
        const f = confim.bind(this);
        await f();
        setInterval(f, this.interval);
        async function confim() {
            let diff = this.plength - this.pools.length;
            if (diff > 0) {
                while (diff--)
                    this.addBroswer().catch((e) => {
                        console.log(e);
                        console.log('添加失败');
                    });
            }
        }
    }
}
exports.BroswerPool = BroswerPool;
exports.QuTuoBroswerPool = new BroswerPool(Broswers_2.QuTuoBrowser);
exports.PayNetBrowserPool = new BroswerPool(Broswers_2.PayNetBrowser);
