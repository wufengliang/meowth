/*
 * @Author: WuFengliang 
 * @Date: 2019-09-10 17:35:48 
 * @Description:   用户模块 
 * @Last Modified time: 2019-09-10 17:35:48 
 */

import * as Router from 'koa-router';
import UserController from '../controller/user-controller';

const controller = new UserController();
const router = new Router({ prefix: '/user' });

router
    //  获取所有用户列表
    .get('/all', controller.getAll)
    //  添加用户
    .post('/add', controller.addUser)
    //  编辑用户
    .post('/edit', controller.editUser)
    //  登录
    .post('/login', controller.login)
    //  注册
    .post('/register', controller.register)
    //  获取用户信息
    .post('/me', controller.getPerson)
    //  获取某个用户信息
    .post('/single/:username', controller.getUserInfo)
    //  删除账号
    .post('/delete', controller.deleteUser)
export default router;