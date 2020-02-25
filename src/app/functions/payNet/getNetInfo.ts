import { LoginSchoolNet, AccountPramer } from './common';
interface Info {
    account: string,
    remain: string,
    present: string,
    money: string,
    status: string
};
class GetNetInfo extends LoginSchoolNet {
    constructor(public account: AccountPramer) {
        super(account);
    }
    async getInfo(this: GetNetInfo): Promise<Info> {
        await this.getPage();
        await this.login();
        return { ...await this.getAccountInfo(), ... await this.getNetStatus() }
    }
    private async getAccountInfo() {
        return await this.page.$$eval('.account', (elements) => {
            const innerText = elements
            return {
                account: innerText[0].innerText.trim(),
                remain: innerText[1].innerText.trim(),
                present: innerText[2].innerText.trim()
            }
        })
    }
    private async getNetStatus() {
        let money = "", status = "", page = this.page;
        while (money === "" || status === "") {
            await page.waitFor(100);
            money = await page.$eval('.redtextl', e => e.innerText.trim());
            status = await page.$eval('.greentextl', e => e.innerText.trim());
        }
        return { money, status };
    }
}
export function newGetNetInfo(account: AccountPramer) {
    return new GetNetInfo(account);
}