/*
 * @Author: WuFengliang
 * @Date: 2019-08-27 16:24:01
 * @Description:   系统模块
 * @Last Modified time: 2019-08-27 16:24:01
 */
import * as Router from 'koa-router';
import SystemController from '../controller/system-controller';

const controller = new SystemController();
const router = new Router({ prefix: '/system' });

router
    //  获取所有系统
    .get('/all', controller.getAll)
    //  添加系统 
    .post('/add', controller.addSystem)
    //  删除系统
    .post('/delete', controller.deleteSystem)
    //  编辑系统
    .post('/edit', controller.editSystem)

export default router;