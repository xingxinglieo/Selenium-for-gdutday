import AppLication = require('koa'); //应用对象
import bodyParser = require('koa-bodyparser');
// import { config } from '~/config'
import bestRequire = require('best-require');//ts-ignore
bestRequire(`${__dirname}`);//ts-ignore

import catchError from '~/middlewares/exception';
import InitManager from '~/core/init';

const app = new AppLication();

app.use(catchError);
app.use(bodyParser());

InitManager.initCore(app);
app.listen(3000);  