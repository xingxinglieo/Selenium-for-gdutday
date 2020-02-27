import { PayNetBrowserPool } from '~/app/browser/Pools';
import { ParameterException } from '~/core/http-exception';
import { Base } from '../common'

export interface AccountPramer {
    schoolId: string
    password: string
}
export interface GetImgPramer extends AccountPramer {
    months: string
}
export class LoginSchoolNet extends Base {
    constructor(public params: AccountPramer) {
        super();
    }
    protected async getPage() {
        const browser = (await PayNetBrowserPool.getBroswer());
        if (browser) {
            this.page = browser.page;
            this.browser = browser.instance;
        }
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