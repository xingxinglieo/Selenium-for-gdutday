import Router = require('koa-router');
import { newGetNetInfo } from '~/app/functions/payNet/getNetInfo';
import { AccountValidator } from '~/app/validators/validators'
const router = new Router();
router.post('/functions/getNetInfo', async context => {
    await new AccountValidator().validate(context)
    const infoOperations = newGetNetInfo(context.request.body);
    context.body = await infoOperations.getInfo();
})
export { router };  