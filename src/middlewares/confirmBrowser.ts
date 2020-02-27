import { PayNetBrowserPool, QuTuoBroswerPool } from '~/app/browser/Pools';
export const confrimBroswer: Koa.Middleware = async (_context, next) => {
    await next();
    PayNetBrowserPool.confim();
    QuTuoBroswerPool.confim();
}