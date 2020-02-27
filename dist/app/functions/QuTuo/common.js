"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_exception_1 = require("~/core/http-exception");
const Pools_1 = require("~/app/browser/Pools");
const common_1 = require("../common");
class LoginQuTuo extends common_1.Base {
    constructor(account) {
        super();
        this.account = account;
    }
    async getPage() {
        const browser = (await Pools_1.QuTuoBroswerPool.getBroswer());
        if (browser) {
            this.page = browser.page;
            this.browser = browser.instance;
        }
    }
    async login() {
        await this.getPage();
        const { schoolId, password } = this.account;
        await (await this.page.waitForSelector('input[type="text"]')).type(schoolId);
        await (await this.page.waitForSelector('input[type="password"]')).type(password);
        const loginButton = await this.page.waitForSelector('.weui-btn_primary');
        try {
            await Promise.all([
                loginButton.click(),
                this.page.waitForNavigation({ timeout: 5000 })
            ]);
        }
        catch (e) {
            throw new http_exception_1.ParameterException('密码错误', 200);
        }
    }
}
exports.LoginQuTuo = LoginQuTuo;
