import AppLication = require('koa'); //应用对象
import bodyParser = require('koa-bodyparser');
import { config } from '~/config'
import bestRequire = require('best-require');//ts-ignore
bestRequire(`${__dirname}`);//ts-ignore

import { consoleLog } from '~/middlewares/consoleLog';
import { catchError } from '~/middlewares/exception';
import InitManager from '~/core/init';

const app = new AppLication();
app.use(catchError);//最后执行
app.use(bodyParser());
if (config.dev) app.use(consoleLog);
InitManager.initCore(app);

const host = 3000;
app.listen(host);
console.log(`listen on${host}`);
