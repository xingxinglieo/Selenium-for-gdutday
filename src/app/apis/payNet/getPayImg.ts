import Router = require('koa-router');
import { config } from '~/config'
import { newGetPayImg } from '~/app/functions/payNet/getPayImg';
import { PayNetValidator } from '~/app/validators/validators'
const router = new Router();
router.get('/functions/getPayImg', async context => {
    if (config.dev) console.log(context);
    await new PayNetValidator().validate(context)
    const srcOperations = newGetPayImg(context.request.query);
    context.body = await srcOperations.getPay();
})
export { router };
