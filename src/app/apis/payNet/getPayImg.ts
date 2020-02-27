import Router = require('koa-router');
import { config } from '~/config'
import { GetPayImg } from '~/app/functions/payNet/getPayImg';
import { PayNetValidator } from '~/app/validators/validators'
const router = new Router();
router.post('/functions/getPayImg', async context => {
    if (config.dev) console.log(context);
    await new PayNetValidator().validate(context)
    const srcOperations = new GetPayImg(context.request.body);
    context.body = await srcOperations.getPay();
    srcOperations.browser.close();
})
export { router };
