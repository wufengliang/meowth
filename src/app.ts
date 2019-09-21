
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as jsonError from 'koa-json-error';
import * as session from 'koa-session';
import * as koaJWT from 'koa-jwt';
import * as cors from 'koa2-cors';
import { config, session as setSession, secret } from './config';
import systemRouter from './router/system';
import cicdRouter from './router/cicd-variables';
import userRouter from './router/user';
import verifyToken from './utils/jwt-verify';

const app = new Koa();
const router = new Router({ prefix: '/api' });

app.keys = ['This is a secret key !'];


if (process.env.NODE_ENV === 'development') {
    app.use(cors());
}

app.use(verifyToken());
app.use(session(setSession, app));
app.use(koaJWT({ secret }).unless({ path: [/^\/api\/user\/login/, /^\/api\/user\/register/] }));
app.use(bodyParser());
app.use(jsonError({
    postFormat(e, { stack, status, ...rest }) {
        return process.env.NODE_ENV === 'production' ? rest : { stack, code: status, ...rest };
    }
}));


router.use(systemRouter.routes());  //  系统路由
router.use(cicdRouter.routes());    //  CICD配置路由
router.use(userRouter.routes());    //  获取用户模块路由

app.use(router.routes()).use(router.allowedMethods());

app.listen(config.PORT, () => {
    console.log(`The server is running at the port ${config.PORT} !`);
});