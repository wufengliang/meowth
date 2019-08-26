
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import config from './config';

const app = new Koa();
const router = new Router();

app.use(bodyParser());

router.get('/*', async (ctx) => {
    ctx.body = 'Hello World!';
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(config.PORT);