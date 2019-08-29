/*
 * @Author: WuFengliang 
 * @Date: 2019-08-29 14:30:34 
 * @Description:   系统开发负责模块功能编写 
 * @Last Modified time: 2019-08-29 14:30:34 
 */

import { SystemDevelopModel } from '../model/system-develop';

export default class SystemDevelopController {
    async getAll(ctx: { [key: string]: any }) {
        const data = await SystemDevelopModel.find().populate('system').exec();
        ctx.body = {
            code: 200,
            data,
            message: '查询成功'
        }
    }

    async addDevelop(ctx: { [key: string]: any }) {
        const { leader, frontEnd, backEnd, testEngineer, productManager, system } = ctx.request.body;
        if (!system) {
            ctx.throw(404, '系统不存在');
        }
        const result = await SystemDevelopModel.create({ leader, frontEnd, backEnd, testEngineer, productManager, system });
        ctx.body = {
            code: 200,
            message: '添加成功'
        }
    }

    async deleteDevelop(ctx: { [key: string]: any }) {
        const { ids } = ctx.request.body,
            data = await SystemDevelopModel.find({ _id: { $in: ids } });
        if (data.length === 0) {
            ctx.throw(404, '维护数据不存在');
        }
        const result = await SystemDevelopModel.deleteMany({ _id: { $in: ids } });

        ctx.body = {
            code: 200,
            message: "删除成功"
        }
    }

    async editDevelop(ctx: { [key: string]: any }) {
        const { id, leader, frontEnd, backEnd, testEngineer, productManager, system } = ctx.request.body;

        if (!id) {
            ctx.throw(404, '当前数据不存在');
        }

        if (!system) {
            ctx.throw(404, '维护系统不存在');
        }

        const result = await SystemDevelopModel.find({ _id: id });
        if (result.length === 0) {
            ctx.throw(404, '当前数据不存在');
        }

        const data = await SystemDevelopModel.updateOne({ _id: id }, { leader, frontEnd, backEnd, testEngineer, productManager, system });

        ctx.body = {
            code: 200,
            message: '更新成功'
        }
    }
}