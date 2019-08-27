
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as jsonError from 'koa-json-error';
import { config } from './config';
import systemRouter from './router/system';
import systemTypeRouter from './router/systemType';

const app = new Koa();
const router = new Router();

router.use(systemRouter.routes());  //  系统路由
router.use(systemTypeRouter.routes());  //  系统类别路由

app.use(bodyParser());
app.use(jsonError({
    postFormat(e, { stack, ...rest }) {
        return process.env.NODE_ENV === 'production' ? rest : { stack, ...rest };
    }
}));

app.use(router.routes()).use(router.allowedMethods());

app.listen(config.PORT, () => {
    console.log(`The server is running at the port ${config.PORT} !`);
});