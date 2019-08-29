/*
 * @Author: WuFengliang 
 * @Date: 2019-08-29 14:28:26 
 * @Description:   系统开发负责人维护模块 
 * @Last Modified time: 2019-08-29 14:28:26 
 */
import SystemDevelopController from '../controller/system-develop-controller';
import * as Router from 'koa-router';

const router = new Router({ prefix: '/system-develop' }),
    controller = new SystemDevelopController();

router
    //  获取所有系统维护列表
    .get('/all', controller.getAll)
    //  添加系统维护人员
    .post('/add', controller.addDevelop)
    //  删除系统维护人员
    .post('/delete', controller.deleteDevelop)
    //  编辑系统维护人员
    .post('/edit', controller.editDevelop);

export default router;
