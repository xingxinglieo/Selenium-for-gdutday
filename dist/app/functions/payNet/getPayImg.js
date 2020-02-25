"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const static_1 = require("~/app/static");
class GetPayImg extends common_1.LoginSchoolNet {
    constructor(payPramer) {
        super(payPramer);
        this.payPramer = payPramer;
        this.months = payPramer.months.toString();
    }
    async getPay() {
        await this.getPage();
        await this.login();
        await this.toPayPage();
        return await this.getSrc();
    }
    async toPayPage() {
        const { page } = this;
        await page.goto(static_1.urls.SCHOOL_Pay);
        await (await page.waitFor('#rechargeMonth')).type(this.months);
        await (await page.waitFor('input[value="充值"]')).click();
        await page.waitForNavigation();
    }
    async getSrc() {
        const { page } = this;
        await (await page.waitFor('input[value="确认支付"]')).click();
        //src可能未获取到
        let src = "";
        while (src === "" || src === static_1.urls.GET_IMG_ASPX) {
            await page.waitFor(150);
            try {
                src = await page.$eval('#PayImg', e => e.src);
            }
            catch (err) {
                src = "";
            }
        }
        const orderId = await page.$eval('#lb_wxddh', e => e.innerText);
        return { src, orderId };
    }
}
function newGetPayImg(payPramer) {
    return new GetPayImg(payPramer);
}
exports.newGetPayImg = newGetPayImg;
