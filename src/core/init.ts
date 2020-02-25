import Koa = require('koa');
import { registerRouter } from '~/app/router';
require('~/app/browser/Pools');
class InitManager {
    static app: Koa;
    static initCore(app: Koa) {
        this.app = app;
        registerRouter(app);
    }
}
export default InitManager;