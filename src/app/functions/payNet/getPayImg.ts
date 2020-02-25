import { LoginSchoolNet, GetImgPramer } from './common';
import { urls } from '~/app/static'
interface PayMessage {
    src: string,
    orderId: string
}
class GetPayImg extends LoginSchoolNet {
    months: string;
    constructor(public payPramer: GetImgPramer) {
        super(payPramer);
        this.months = payPramer.months.toString();
    }
    async getPay(this: GetPayImg): Promise<PayMessage> {
        await this.getPage();
        await this.login();
        await this.toPayPage();
        return await this.getSrc()
    }
    private async toPayPage() {
        const { page } = this;
        await page.goto(urls.SCHOOL_Pay);
        await (await page.waitFor('#rechargeMonth')).type(this.months)
        await (await page.waitFor('input[value="充值"]')).click();
        await page.waitForNavigation();
    }
    private async getSrc() {
        const { page } = this;
        await (await page.waitFor('input[value="确认支付"]')).click();
        //src可能未获取到
        let src = "";
        while (src === "" || src === urls.GET_IMG_ASPX) {
            await page.waitFor(150);
            try {
                src = await page.$eval('#PayImg', e => e.src);
            } catch (err) {
                src = "";
            }
        }
        const orderId = await page.$eval('#lb_wxddh', e => e.innerText)
        return { src, orderId };
    }
}
export function newGetPayImg(payPramer: GetImgPramer) {
    return new GetPayImg(payPramer);
}
