import Router = require('koa-router');
import { newGetPayImg } from '~/app/functions/payNet/getPayImg';
import { PayNetValidator } from '~/app/validators/validators'
const router = new Router();
router.get('/functions/getPayImg', async context => {
    await new PayNetValidator().validate(context)
    const srcOperations = newGetPayImg(context.request.body);
    context.body = await srcOperations.getPay();
})
export { router };
