// import { router as getPayImg } from '~/app/apis/getPay/getPayImg';
import { router as getNetInfo } from "~/app/apis/payNet/getNetInfo";
import { router as getPayImg } from "~/app/apis/payNet/getPayImg";
import { router as loginQuTuo } from "~/app/apis/quTuo/loginQuTuo";
import { router as text } from "~/app/apis/test/text";
const routerList = [getNetInfo, getPayImg, loginQuTuo, text];
export function registerRouter(app: Koa.Application) {
    routerList.forEach(router => {
        app.use(router.routes()); 
    });
}
