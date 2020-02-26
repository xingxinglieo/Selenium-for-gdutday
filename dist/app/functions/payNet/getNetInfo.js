"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
;
class GetNetInfo extends common_1.LoginSchoolNet {
    constructor(account) {
        super(account);
        this.account = account;
    }
    async getInfo() {
        await this.login();
        return { ...await this.getAccountInfo(), ...await this.getNetStatus() };
    }
    async getAccountInfo() {
        return await this.page.$$eval('.account', (elements) => {
            const innerText = elements;
            return {
                account: innerText[0].innerText.trim(),
                remain: innerText[1].innerText.trim(),
                present: innerText[2].innerText.trim()
            };
        });
    }
    async getNetStatus() {
        let money = "", status = "", page = this.page;
        while (money === "" || status === "") {
            await page.waitFor(100);
            money = await page.$eval('.redtextl', e => e.innerText.trim());
            status = await page.$eval('.greentextl', e => e.innerText.trim());
        }
        return { money, status };
    }
}
exports.GetNetInfo = GetNetInfo;
