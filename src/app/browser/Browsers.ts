import * as puppeteer from "puppeteer";
import * as devices from "puppeteer/DeviceDescriptors";
import { config } from "~/config";
import { urls } from "~/app/static";
import { available } from "~/app/other/test";
import { ServerMaintenance } from "~/core/http-exception";
let uid = 0;
//实例类
export class Browser {
    instance!: puppeteer.Browser;
    page!: puppeteer.Page;
    constructor() {}
    //创建一个浏览器的到成功最大接受时间
    static timeout = 20000;
    async launchBrowser(
        browserOptions: puppeteer.LaunchOptions = {
            headless: !config.dev,
            dumpio: config.dev,
        }
    ) {
        this.instance = await puppeteer.launch(browserOptions);
        const instance = this.instance;
        const page = await instance.newPage();
        this.page = page;
        //如果失败自动关闭
        // return setTimeout(function () {
        //     instance.close();
        // }, Browser.timeout)
    }
}
//操作类工厂
async function defaultGoto(_: puppeteer.Page): Promise<unknown> {
    return;
}
async function defaultLaunch(_?: puppeteer.Browser): Promise<unknown> {
    return;
}
export class BrowserType {
    beforeGoto: typeof defaultGoto;
    afterGoto: typeof defaultGoto;
    beforeLaunch: typeof defaultLaunch;
    afterLaunch: typeof defaultLaunch;
    isPhone: boolean;
    constructor(
        private url: string,
        {
            beforeLaunch = defaultLaunch,
            afterLaunch = defaultLaunch,
            beforeGoto = defaultGoto,
            afterGoto = defaultGoto,
            isPhone = false,
        } = {}
    ) {
        this.beforeGoto = beforeGoto;
        this.afterGoto = afterGoto;
        this.beforeLaunch = beforeLaunch;
        this.afterLaunch = afterLaunch;
        this.isPhone = isPhone;
    }
    async createBrowser() {
        await this.beforeLaunch();
        const browser = new Browser();
        try {
            await browser.launchBrowser();
            await this.afterLaunch(browser.instance);
            if (this.isPhone) await browser.page.emulate(devices["iPhone X"]);
            await this.firstStep(browser.page);
            return browser;
        } catch (err) {
            browser.instance.close();
            throw err;
        }
    }
    async firstStep(page: puppeteer.Page) {
        await this.beforeGoto(page);
        await page.goto(this.url);
        await this.afterGoto(page);
    }
}
class QuTuo {
    static schoolName = "广东工业大学";
    static async firstStep(page: Puppeteer.Page) {
        await QuTuo.selectSchool(page);
        await QuTuo.confirmSchool(page);
    }
    static async selectSchool(page: Puppeteer.Page) {
        const searchInput = await page.waitForSelector(
            'input[type = "search"]'
        );
        await searchInput.type(this.schoolName, {
            delay: 70,
        });
        let text = "";
        while (text !== this.schoolName) {
            page.waitFor(200);
            text = await page.$eval("li", e => e.innerText.trim());
        }
        let li;
        do {
            page.waitFor(300);
            li = await page.$("li");
            if (li !== null) await li.click();
        } while (li !== null);
        await this.confirmSchool(page);
    }
    static async confirmSchool(page: Puppeteer.Page) {
        //confim the selected school
        await page.waitFor(1300);
        const loginLogo = await page.$eval(".login-logo", e =>
            e.innerText.trim()
        );
        if (loginLogo !== this.schoolName) this.selectSchool(page);
        else return;
    }
}
class School {
    static async isMaintenance() {
        if (!available) {
            throw new ServerMaintenance("学校网站维护");
        }
    }
}
export const PayNetBrowser = new BrowserType(urls.SCHOOL_LOGIN, {
    beforeLaunch: School.isMaintenance,
});
export const QuTuoBrowser = new BrowserType(urls.QUTUO_LOGIN_SELECT, {
    isPhone: true,
    afterGoto: QuTuo.firstStep,
});
