import * as puppeteer from 'puppeteer';
import * as devices from 'puppeteer/DeviceDescriptors';
import { config } from '~/config';
import { urls } from '~/app/static'
let uid = 0;
//实例类
export class Browser {
    instance!: puppeteer.Browser
    page!: puppeteer.Page
    constructor() {
    }
    static timeout = 20000;
    async launchBrowser(browserOptions: puppeteer.LaunchOptions = {
        headless: !config.dev,
        dumpio: config.dev,
    }) {
        this.instance = await puppeteer.launch(browserOptions)
        const instance = this.instance;
        const page = await instance.newPage();
        this.page = page;
        //如果失败自动关闭
        return setTimeout(function () {
            instance.close();
        }, Browser.timeout)
    }
}
//操作类工厂
type asyncOperation = (_: puppeteer.Page) => Promise<unknown>;
async function defaultfun(_: puppeteer.Page): Promise<any> { };
export class BrowserType {
    beforeGoto: asyncOperation;
    afterGoto: asyncOperation;
    isPhone: boolean;
    constructor(private url: string, { beforeGoto = defaultfun, afterGoto = defaultfun, isPhone = false } = {}) {
        this.beforeGoto = beforeGoto;
        this.afterGoto = afterGoto;
        this.isPhone = isPhone;
    }
    async createBrowser() {
        const browser = new Browser();
        const timer = await browser.launchBrowser();
        if (this.isPhone) await browser.page.emulate(devices['iPhone X'])
        await this.firstStep(browser.page);
        clearInterval(timer);
        return browser;
    }
    async firstStep(page: puppeteer.Page) {
        await this.beforeGoto(page);
        await page.goto(this.url);
        await this.afterGoto(page);
    }
}
class QuTuo {
    static schoolName = '广东工业大学';
    static async firstStep(page: Puppeteer.Page) {
        await QuTuo.selectSchool(page);
        await QuTuo.confirmSchool(page);
    }
    static async selectSchool(page: Puppeteer.Page) {
        const searchInput = await page.waitForSelector('input[type = "search"]');
        await searchInput.type(this.schoolName, {
            delay: 70
        });
        let text = "";
        while (text !== this.schoolName) {
            page.waitFor(200);
            text = await page.$eval('li', e => (e.innerText).trim());
        }
        let li;
        do {
            page.waitFor(300);
            li = await page.$('li');
            if (li !== null) await li.click();
        } while (li !== null)
        await this.confirmSchool(page);
    }
    static async  confirmSchool(page: Puppeteer.Page) {
        //confim the selected school
        await page.waitFor(1300);
        const loginLogo = await page.$eval('.login-logo', e => (e.innerText).trim());
        if (loginLogo !== this.schoolName) this.selectSchool(page);
        else return;
    }
}
export const PayNetBrowser = new BrowserType(urls.SCHOOL_LOGIN);
export const QuTuoBrowser = new BrowserType(urls.QUTUO_LOGIN_SELECT, {
    isPhone: true,
    afterGoto: QuTuo.firstStep,
})

