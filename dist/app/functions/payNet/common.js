"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pools_1 = require("~/app/browser/Pools");
const http_exception_1 = require("~/core/http-exception");
class LoginSchoolNet {
    constructor(params) {
        this.params = params;
    }
    async getPage() {
        const browser = (await Pools_1.PayNetBrowserPool.getBroswer());
        if (browser)
            this.page = browser.page;
    }
    async login() {
        const { schoolId, password } = this.params;
        await (await this.page.waitForSelector('#username')).type(schoolId);
        await (await this.page.waitForSelector('#password')).type(password);
        const loginButton = await this.page.waitForSelector('.auth_login_btn');
        try {
            await Promise.all([
                loginButton.click(),
                this.page.waitForNavigation({ timeout: 8000 })
            ]);
        }
        catch (e) {
            throw new http_exception_1.ParameterException('密码错误', 200);
        }
    }
}
exports.LoginSchoolNet = LoginSchoolNet;
