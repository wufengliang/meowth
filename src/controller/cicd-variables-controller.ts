/*
 * @Author: WuFengliang
 * @Date: 2019-08-27 15:20:30
 * @Description:   ci/cd 逻辑处理
 * @Last Modified time: 2019-08-27 15:20:30
 */
import { cicdVariable } from '../model/cicd-variables';

export default class CiCdVariableController {
    async getAll(ctx: { [key: string]: any }) {
        const data = await cicdVariable.find().populate('code');
        ctx.body = {
            code: 200,
            data,
            message: '查询成功'
        }
    }

    async addCicd(ctx: { [key: string]: any }) {
        const { code, type, environment, port, ip, path } = ctx.request.body,
            data = await cicdVariable.create({ code, type, environment, port, ip, path });
        ctx.body = {
            code: 200,
            data,
            message: '添加成功'
        }
    }

    async deleteCicd(ctx: { [key: string]: any }) {
        const { ids } = ctx.request.body,
            data = await cicdVariable.deleteMany({ _id: { $in: ids } });
        ctx.body = {
            code: 200,
            message: '删除成功'
        };

    }

    async editCicd(ctx: { [key: string]: any }) {
        const { id, environment, port, ip, path } = ctx.request.body,
            data = await cicdVariable.find({ _id: id });
        if (data.length === 0) {
            ctx.body = {
                code: 201,
                message: '当前参数异常'
            }
        } else {
            const result = await cicdVariable.updateOne({ _id: id }, { environment, port, ip, path });
            ctx.body = {
                code: 200,
                message: '更新成功'
            }
        }
    }
}