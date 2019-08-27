/*
 * @Author: WuFengliang
 * @Date: 2019-08-27 17:46:12
 * @Description:   系统类别
 * @Last Modified time: 2019-08-27 17:46:12
 */
import { systemType } from '../model/system-type';

export default class SystemTypeController {
    async getAll(ctx: { [key: string]: any }) {
        const data = await systemType.find();
        ctx.body = {
            code: 200,
            data,
            message: '查询成功'
        }
    };

    async addSystemType(ctx: { [key: string]: any }) {
        const { name, path, parentId } = ctx.request.body;
        const data = await systemType.create({ name, path, parentId });
        ctx.body = {
            code: 200,
            data,
            message: '添加成功'
        }
    };
}