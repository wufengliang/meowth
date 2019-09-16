/*
 * @Author: WuFengliang
 * @Date: 2019-08-27 16:24:01
 * @Description:   系统模块
 * @Last Modified time: 2019-08-27 16:24:01
 */
import { SystemModel } from '../model/system';

export default class SystemController {

    async getAll(ctx: { [key: string]: any }) {
        const data = (await SystemModel.find());
        ctx.body = {
            code: 200,
            data,
            message: '查询成功'
        }
    };

    async addSystem(ctx: { [key: string]: any }) {
        //  后期接入登录 creator取当前登录账号
        const { name, systemCode, systemType, creator = 'admin' } = ctx.request.body;
        const result = await SystemModel.find({ name, systemCode });
        if (result.length > 0) {
            ctx.throw(403, '当前系统已存在');
        }
        const data = await SystemModel.create({ name, systemCode, systemType, creator });
        ctx.body = {
            code: 200,
            data,
            message: '添加成功'
        }
    };

    async deleteSystem(ctx: { [key: string]: any }) {
        const ids = ctx.request.body.ids,
            data = await SystemModel.find({ _id: { $in: ids } });

        if (data.length === 0) {
            ctx.throw(404, '当前系统不存在');
        }
        const result = await SystemModel.deleteMany({ _id: { $in: ids } });
        ctx.body = {
            code: 200,
            message: '删除成功'
        }
    };

    async editSystem(ctx: { [key: string]: any }) {
        const { id, systemCode, systemType } = ctx.request.body;
        if (!systemCode && !systemType) {
            ctx.throw(404, '参数错误');
        }
        const data = await SystemModel.find({ _id: id });

        if (!data) {
            ctx.throw(404, 'id不存在');
        }
        const result = await SystemModel.updateOne({ _id: id }, { systemCode, systemType, updateTime: new Date(), modifier: 'admin' })
        if (!result) {
            ctx.throw(403, '更新异常')
        }
        ctx.body = {
            code: 200,
            message: "更新成功"
        }
    }

    async allTypes(ctx: { [key: string]: any }) {

        const data = await SystemModel.find({}).distinct('name').exec();
        ctx.body = {
            code: 200,
            data,
            message: '查询所有系统类型成功'
        }
    }
}


