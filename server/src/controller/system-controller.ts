/*
 * @Author: WuFengliang
 * @Date: 2019-08-27 16:24:01
 * @Description:   系统模块
 * @Last Modified time: 2019-08-27 16:24:01
 */
import { SystemModel } from '../model/system';
import { UserModel } from '../model/user';

export default class SystemController {

    /**
     * 获取所有系统路由
     * @api {GET} /api/system/all 获取所有系统路由
     * @apiHeaderExample {json} Header-Example:
     *      {
     *          "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ind1ZmVuZ2xpYW5nIiwiaWF0IjoxNTY5MzA0OTY2LCJleHAiOjE1NjkzMTIxNjZ9.HXbPm_ggEIMevSOpLK2Ug7NgAekaQK-h2e6_N3El9t0"
     *      }
     * @apiDescription 获取所有系统路由
     * @apiName getAll
     * @apiSampleRequest /api/system/all
     * @apiGroup System
     * @apiVersion 1.0.0
     * @apiSuccessExample Response-Success:
     *      HTTP 1.1/ 200K
     *      {
     *          'code': 200,
     *          'msg': '查询成功'
     *      }
     * @apiErrorExample Response-Fail:
     *      HTTP 1.1/ 404K
     *      {
     *          code:500
     *      }
     */
    async getAll(ctx: { [key: string]: any }) {
        const data = await SystemModel.find()
            .populate({ path: 'developer', select: 'name username mobile contactQQ role' })
            .exec();
        ctx.body = {
            code: 200,
            data,
            message: '查询成功'
        }
    };

    /**
     * 添加系统路由
     * @api {POST} /api/system/add 添加系统路由
     * @apiHeaderExample {json} Header-Example:
     *      {
     *          "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ind1ZmVuZ2xpYW5nIiwiaWF0IjoxNTY5MzA0OTY2LCJleHAiOjE1NjkzMTIxNjZ9.HXbPm_ggEIMevSOpLK2Ug7NgAekaQK-h2e6_N3El9t0"
     *      }
     * @apiDescription 添加系统路由
     * @apiName addSytem
     * @apiSampleRequest /api/system/add
     * @apiParam {String} name  系统名称 
     * @apiParam {String} systemCode  系统编码 
     * @apiParam {Array} developer  开发人员 
     * @apiParam {Array} leader  项目负责人
     * @apiGroup System
     * @apiVersion 1.0.0
     * @apiSuccessExample Response-Success:
     *      HTTP 1.1/ 200K
     *      {
     *          'code': 200,
     *          'msg': '添加成功'
     *      }
     * @apiErrorExample Response-Fail:
     *      HTTP 1.1/ 404K
     *      {
     *          code:500
     *      }
     */
    async addSystem(ctx: { [key: string]: any }) {
        //  后期接入登录 creator取当前登录账号
        const username = ctx.session.username;  //  获取当前登录账号
        const user = await UserModel.findOne({ username }).lean().exec();
        const { name, systemCode, systemType, developer, leader } = ctx.request.body;
        const result = await SystemModel.find({ name, systemCode });
        if (result.length > 0) {
            ctx.throw(403, '当前系统已存在');
        }
        const data = await SystemModel.create({ name, systemCode, systemType, creator: user.name, developer: developer, leader });
        ctx.body = {
            code: 200,
            data,
            message: '添加成功'
        }
    };

    /**
   * 删除系统路由
   * @api {POST} /api/system/delete 删除系统
   * @apiHeaderExample {json} Header-Example:
   *      {
   *          "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ind1ZmVuZ2xpYW5nIiwiaWF0IjoxNTY5MzA0OTY2LCJleHAiOjE1NjkzMTIxNjZ9.HXbPm_ggEIMevSOpLK2Ug7NgAekaQK-h2e6_N3El9t0"
   *      }
   * @apiDescription 删除系统
   * @apiName deleteSytem
   * @apiSampleRequest /api/system/delete
   * @apiParam {Array} ids  系统id 
   * @apiGroup System
   * @apiVersion 1.0.0
   * @apiSuccessExample Response-Success:
   *      HTTP 1.1/ 200K
   *      {
   *          'code': 200,
   *          'msg': '删除成功'
   *      }
   * @apiErrorExample Response-Fail:
   *      HTTP 1.1/ 404K
   *      {
   *          code:500
   *      }
   */
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

    /**
    * 编辑系统路由
    * @api {POST} /api/system/edit 编辑系统路由
    * @apiHeaderExample {json} Header-Example:
    *      {
    *          "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ind1ZmVuZ2xpYW5nIiwiaWF0IjoxNTY5MzA0OTY2LCJleHAiOjE1NjkzMTIxNjZ9.HXbPm_ggEIMevSOpLK2Ug7NgAekaQK-h2e6_N3El9t0"
    *      }
    * @apiDescription 编辑系统路由
    * @apiName editSystem
    * @apiSampleRequest /api/system/edit
    * @apiParam {String} id  系统id 
    * @apiParam {String} systemCode 系统编码 
    * @apiParam {String} systemType  系统类型
    * @apiGroup System
    * @apiVersion 1.0.0
    * @apiSuccessExample Response-Success:
    *      HTTP 1.1/ 200K
    *      {
    *          'code': 200,
    *          'msg': '编辑成功'
    *      }
    * @apiErrorExample Response-Fail:
    *      HTTP 1.1/ 404K
    *      {
    *          code:500
    *      }
    */
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
}


