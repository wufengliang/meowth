
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
import * as koaStatic from 'koa-static';
import * as schedule from 'node-schedule'
import { SystemModel } from './model/system';
// import getAllProjects from './utils/getall-project';
// import getPipelineRunning from './utils/getproject-pipelines';


const app = new Koa();
const router = new Router({ prefix: '/api' });

/**
 * 开启pipelines定时任务
 * 1.获取开启pipelines定时任务数据
 * 2.给予设置有效的pipelines时间进行设置定时任务
 * 3.定时查询数据库是否存在pipelines数据更新
 */
// const checkPipelines = () => {
//     SystemModel.find({ isOpenAutoPipeline: true }, (err, response) => {
//         if (err) throw err;
//         //  获取有效数据
//         const data = response.map(item => {
//             const d = item.toObject();
//             if (d.autoPipelineTime > 0) {
//                 return d;
//             }
//         })

//         /**
//          * 1.查看系统是否正在执行pipelines
//          * 2.开启定时任务
//          */
//         const scheduleTask = (item: any) => {
//             schedule.scheduleJob(`* ${item.autoPipelineTime} * * * *`, () => {
//                 getPipelineRunning(item.id).then(
//                     (result: Array<any>) => {
//                         let arr = result.map(item => ({
//                             '分支 名称': item.ref,
//                             'Pipeline status': '正在执行…',
//                             'Pipeline URL': item.web_url
//                         }))
//                     }
//                 )
//             });
//         }
//     })
// }

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

router.get('/apidoc', koaStatic('doc'));

app.use(router.routes()).use(router.allowedMethods());

app.listen(config.PORT, () => {
    console.log(`The server is running at the port ${config.PORT} !`);
});