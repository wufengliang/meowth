/*
 * @Author: WuFengliang 
 * @Date: 2019-08-28 14:28:53 
 * @Description:   CI/CD路由 
 * @Last Modified time: 2019-08-28 14:28:53 
 */
import * as Router from 'koa-router';
import CiCdVariableController from '../controller/cicd-variables-controller';

const router = new Router({ prefix: '/cicd' }),
    controller = new CiCdVariableController();

router
    //  获取所有CICD配置
    .get('/all', controller.getAll)
    //  添加CICD配置
    .post('/add', controller.addCicd)
    //  删除CICD配置
    .post('/delete', controller.deleteCicd)
    //  编辑CICD配置
    .post('/edit',controller.editCicd)

export default router;