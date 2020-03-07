import { router as getNetInfo } from "~/app/apis/payNet/getNetInfo";
import { router as getPayImg } from "~/app/apis/payNet/getPayImg";
import { router as loginQuTuo } from "~/app/apis/quTuo/loginQuTuo";
import { router as text } from "~/app/apis/test/text";
import { router as login } from "~/app/apis/school/login";
import { router as update} from "~/app/apis/update/update";
const routerList = [getNetInfo, getPayImg, loginQuTuo, text, login,update];
export function registerRouter(app: Koa.Application) {
    routerList.forEach(router => {
        app.use(router.routes());
    });
}
