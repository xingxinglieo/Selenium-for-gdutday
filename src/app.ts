import AppLication = require('koa'); //应用对象
import bodyParser = require('koa-bodyparser');
import bestRequire = require('best-require');//ts-ignore
bestRequire(`${__dirname}`);//ts-ignore

import { config } from '~/config'
import { consoleLog } from '~/middlewares/consoleLog';
import { catchError } from '~/middlewares/exception';
import { confrimBroswer } from '~/middlewares/confirmBrowser'
import InitManager from '~/core/init';

const app = new AppLication();
app.use(catchError);//最后执行
app.use(bodyParser());
if (config.dev) app.use(consoleLog);
app.use(confrimBroswer);
InitManager.initCore(app);

const host = 3000;
app.listen(host);
console.log(`listen on${host}`);
