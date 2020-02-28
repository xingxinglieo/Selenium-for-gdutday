"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = require("puppeteer");
const devices = require("puppeteer/DeviceDescriptors");
const config_1 = require("~/config");
const static_1 = require("~/app/static");
let uid = 0;
//实例类
class Browser {
    constructor() {
    }
    async launchBrowser(browserOptions = {
        headless: !config_1.config.dev,
        dumpio: config_1.config.dev,
    }) {
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
exports.Browser = Browser;
//创建一个浏览器的到成功最大接受时间
Browser.timeout = 20000;
async function defaultfun(_) { }
class BrowserType {
    constructor(url, { beforeGoto = defaultfun, afterGoto = defaultfun, isPhone = false, } = {}) {
        this.url = url;
        this.beforeGoto = beforeGoto;
        this.afterGoto = afterGoto;
        this.isPhone = isPhone;
    }
    async createBrowser() {
        const browser = new Browser();
        await browser.launchBrowser();
        if (this.isPhone)
            await browser.page.emulate(devices["iPhone X"]);
        try {
            await this.firstStep(browser.page);
            return browser;
        }
        catch (err) {
            browser.instance.close();
            throw err;
        }
    }
    async firstStep(page) {
        await this.beforeGoto(page);
        await page.goto(this.url);
        await this.afterGoto(page);
    }
}
exports.BrowserType = BrowserType;
class QuTuo {
    static async firstStep(page) {
        await QuTuo.selectSchool(page);
        await QuTuo.confirmSchool(page);
    }
    static async selectSchool(page) {
        const searchInput = await page.waitForSelector('input[type = "search"]');
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
            if (li !== null)
                await li.click();
        } while (li !== null);
        await this.confirmSchool(page);
    }
    static async confirmSchool(page) {
        //confim the selected school
        await page.waitFor(1300);
        const loginLogo = await page.$eval(".login-logo", e => e.innerText.trim());
        if (loginLogo !== this.schoolName)
            this.selectSchool(page);
        else
            return;
    }
}
QuTuo.schoolName = "广东工业大学";
exports.PayNetBrowser = new BrowserType(static_1.urls.SCHOOL_LOGIN);
exports.QuTuoBrowser = new BrowserType(static_1.urls.QUTUO_LOGIN_SELECT, {
    isPhone: true,
    afterGoto: QuTuo.firstStep,
});
