// import { getNetInfo } from '~/app/functions/getNetInfo';
//管理GetImgBroswer的类
import { Browser, BrowserType } from './Broswers'
import { QuTuoBrowser, PayNetBrowser } from './Broswers'

export class BroswerPool {
    pools: Browser[] = [];
    plength: number;
    interval: number;
    closeTimeout: number;
    constructor(public BrowserType: BrowserType, { plength = 2, interval = Browser.timeout, closeTimeout = 30000 } = {}) {
        this.plength = plength;
        this.interval = interval;
        this.closeTimeout = closeTimeout;
        this.watch();
    }
    async getBroswer() {
        const browser = this.hasBroswer()
            ? await this.popBroswer() as Browser
            : await this.BrowserType.createBrowser();
        this.autoDestroyBroswer(browser.instance);
        return browser
    }
    async addBroswer() {
        const browser = await this.BrowserType.createBrowser();
        this.pushBroswer(browser);
    }
    pushBroswer(browser: Browser) {
        this.pools.push(browser);
    }
    popBroswer() {
        return this.pools.pop();
    }
    async hasBroswer() {
        return this.pools.length > 0;
    }
    async autoDestroyBroswer(browser: Puppeteer.Browser) {
        return setTimeout(async () => await browser.close(), this.closeTimeout)
    }
    async watch() {
        const f = confim.bind(this);
        await f();
        setInterval(f, this.interval)
        async function confim(this: BroswerPool) {
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
export const QuTuoBroswerPool = new BroswerPool(QuTuoBrowser);
export const PayNetBrowserPool = new BroswerPool(PayNetBrowser);