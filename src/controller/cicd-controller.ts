/*
 * @Author: WuFengliang
 * @Date: 2019-08-27 15:20:30
 * @Description:   ci/cd 逻辑处理
 * @Last Modified time: 2019-08-27 15:20:30
 */
import * as Router from 'koa-router';

const router = new Router({ prefix: '/cicd' });

router
    .get('/', async ctx => {
        
    })

export { router };