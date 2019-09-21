/*
 * @Author: WuFengliang 
 * @Date: 2019-09-10 17:36:23 
 * @Description:   用户模块功能编写 
 * @Last Modified time: 2019-09-10 17:36:23 
 */
import { UserModel } from '../model/user';
import SettingPassword from '../utils/password';
import * as jsonwebtoken from 'jsonwebtoken';
import { secret } from '../config';

export default class UserController {
    //  获取所有用户列表
    async getAll(ctx: { [key: string]: any }) {
        const data = await UserModel.find().select('-password');
        ctx.body = {
            code: 200,
            data,
            message: '查询用户列表成功'
        }
    }

    //  添加用户
    async addUser(ctx: { [key: string]: any }) {
        const { name, username, password, role, telPhone, contactQQ } = ctx.request.body,
            result = await UserModel.create({ name, username, password, role, telPhone, contactQQ });
        if (!result) {
            ctx.throw(500, '异常错误');
        }
        ctx.body = {
            code: 200,
            message: '添加成功'
        }
    }

    //  编辑用户
    async editUser(ctx: { [key: string]: any }) {
        const { id, name, username, telPhone, contactQQ } = ctx.request.body,
            result = await UserModel.findById(id);
        if (!result) {
            ctx.throw(404, '用户不存在');
        }
        const data = await UserModel.updateOne({ _id: id }, { $set: { name, username, telPhone, contactQQ } });
        ctx.body = {
            code: 200,
            message: '用户更新成功'
        }
    }

    //  删除用户
    async deleteUser(ctx: { [key: string]: any }) {
        const { id } = ctx.request.body;
        await UserModel.findById(id, async (err) => {
            if (err) {
                ctx.throw(404, '用户不存在');
            }
            const result = await UserModel.deleteOne({ _id: id });
            if (result) {
                ctx.body = {
                    code: 200,
                    message: '用户已删除'
                }
            }
        })
    }

    //  登录
    async login(ctx: { [key: string]: any }) {
        const { username, password } = ctx.request.body;
        let result = await UserModel.findOne({ username }).lean().exec();
        if (result) {
            const bool = SettingPassword.comparePassword(password, result.password);
            if (bool) {
                //  返回token
                const token = jsonwebtoken.sign({ username }, secret, { expiresIn: '2h' }); //  token有效时间2小时
                ctx.session.username = username;
                ctx.body = {
                    code: 200,
                    message: '登录成功',
                    token,
                }
            } else {
                ctx.throw(401, '密码错误');
            }
        } else {
            ctx.throw(404, '用户不存在');
        }
    }

    //  注册
    async register(ctx: { [key: string]: any }) {
        const { name, username, password, role, mobile, contactQQ } = ctx.request.body;
        const result = await UserModel.create({ name, username, password: SettingPassword.setPassword(password), role, mobile, contactQQ, status: "ACITIVED" });
        if (result) {
            ctx.body = {
                code: 200,
                message: '注册成功'
            }
        } else {
            ctx.throw(500, '异常错误');
        }
    }

    //  获取登录信息
    async getPerson(ctx: { [key: string]: any }) {
        const username = ctx.session.username;
        const data = await UserModel.findOne({ username }).select('-password').lean();

        if (data) {
            ctx.body = {
                code: 200,
                data,
                message: '获取个人信息成功'
            }
        } else {
            ctx.body = {
                code: 404,
                message: '当前用户不存在'
            }
        }
    }

    //  获取某个用户信息
    async getUserInfo(ctx: { [key: string]: any }) {
        const { username } = ctx.params;
        const data = await UserModel.findOne({ username }).select('-password').lean();
        ctx.body = {
            code: 200,
            message: '查询成功',
            data
        }
    }

}