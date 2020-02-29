"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = require("puppeteer");
const devices = require("puppeteer/DeviceDescriptors");
const config_1 = require("~/config");
const static_1 = require("~/app/static");
const test_1 = require("~/app/other/test");
const http_exception_1 = require("~/core/http-exception");
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
//操作类工厂
async function defaultGoto(_) {
    return;
}
async function defaultLaunch(_) {
    return;
}
class BrowserType {
    constructor(url, { beforeLaunch = defaultLaunch, afterLaunch = defaultLaunch, beforeGoto = defaultGoto, afterGoto = defaultGoto, isPhone = false, } = {}) {
        this.url = url;
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
            if (this.isPhone)
                await browser.page.emulate(devices["iPhone X"]);
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
class School {
    static async isMaintenance() {
        if (!test_1.available) {
            throw new http_exception_1.ServerMaintenance("学校网站维护");
        }
    }
}
exports.PayNetBrowser = new BrowserType(static_1.urls.SCHOOL_LOGIN, {
    beforeLaunch: School.isMaintenance,
});
exports.QuTuoBrowser = new BrowserType(static_1.urls.QUTUO_LOGIN_SELECT, {
    isPhone: true,
    afterGoto: QuTuo.firstStep,
});
