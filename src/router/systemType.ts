/*
 * @Author: WuFengliang
 * @Date: 2019-08-27 17:47:04
 * @Description:   系统类别模块
 * @Last Modified time: 2019-08-27 17:47:04
 */
import * as Router from 'koa-router';
import SystemTypeController from '../controller/systemTypes-controll';

const controller = new SystemTypeController();
const router = new Router({ prefix: '/systemType' });

router
    .get('/all', controller.getAll)
    .post('/add',controller.addSystemType)

export default router;