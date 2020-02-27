// import { getNetInfo } from '~/app/functions/getNetInfo';
//管理GetImgBroswer的类
import { Browser, BrowserType } from './Browsers'
import { QuTuoBrowser, PayNetBrowser } from './Browsers'
export class BroswerPool {
    pools: Browser[] = [];
    plength: number;
    interval: number;
    closeTimeout: number;
    constructor(public BrowserType: BrowserType, { plength = 2, interval = Browser.timeout, closeTimeout = 30000 } = {}) {
        this.plength = plength;
        this.interval = interval;
        this.closeTimeout = closeTimeout;
        this.confim();
        this.watch();
        // this.watch();
    }
    //向外界抛出一个Browser实例
    public async getBroswer() {
        const browser = this.hasBroswer()
            ? this.popBroswer() as Browser
            : await this.BrowserType.createBrowser();
        this.confim();
        // this.autoDestroyBroswer(browser.instance);
        return browser
    }
    public confim() {
        let diff = this.plength - this.pools.length;
        if (diff > 0) {
            while (diff--)
                this.addBroswer().catch((_e) => {
                    console.log('添加一个浏览器失败');
                });
        }
    }
    private async addBroswer() {
        const browser = await this.BrowserType.createBrowser();
        this.pushBroswer(browser);
    }
    private pushBroswer(browser: Browser) {
        this.pools.push(browser);
    }
    private popBroswer() {
        return this.pools.pop();
    }
    private async hasBroswer() {
        return this.pools.length > 0;
    }
    // private autoDestroyBroswer(browser: Puppeteer.Browser) {
    //     return setTimeout(() => {
    //         browser.close().catch();
    //         this.confim();
    //     }, this.closeTimeout)
    // }
    private watch() {
        setInterval(() => this.confim(), this.interval)
    }
}
export const QuTuoBroswerPool = new BroswerPool(QuTuoBrowser);
export const PayNetBrowserPool = new BroswerPool(PayNetBrowser);