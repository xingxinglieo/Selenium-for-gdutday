import { PayNetBrowserPool } from '~/app/browser/Pools';
import { ParameterException } from '~/core/http-exception';
export interface AccountPramer {
    schoolId: string
    password: string
}
export interface GetImgPramer extends AccountPramer {
    months: string
}
export class LoginSchoolNet {
    page !: Puppeteer.Page
    constructor(public params: AccountPramer) {
    }
    protected async getPage() {
        const browser = (await PayNetBrowserPool.getBroswer());
        if (browser) this.page = browser.page;
    }
    protected async login() {
        await this.getPage();
        const { schoolId, password } = this.params;
        await (await this.page.waitForSelector('#username')).type(schoolId);
        await (await this.page.waitForSelector('#password')).type(password);
        const loginButton = await this.page.waitForSelector('.auth_login_btn');
        try {
            await Promise.all([
                loginButton.click(),
                this.page.waitForNavigation({ timeout: 8000 })
            ])
        } catch (e) {
            throw new ParameterException('密码错误', 200)
        }
    }
}