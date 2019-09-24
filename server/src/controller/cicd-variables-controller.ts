/*
 * @Author: WuFengliang
 * @Date: 2019-08-27 15:20:30
 * @Description:   ci/cd 逻辑处理
 * @Last Modified time: 2019-08-27 15:20:30
 */
import { CiCdVariableModel } from '../model/cicd-variables';

export default class CiCdVariableController {
    /**
     * 获取所有CICD路由
     * @api {GET} /api/cicd/all 获取所有CICD路由
     * @apiHeaderExample {json} Header-Example:
     *      {
     *          "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ind1ZmVuZ2xpYW5nIiwiaWF0IjoxNTY5MzA0OTY2LCJleHAiOjE1NjkzMTIxNjZ9.HXbPm_ggEIMevSOpLK2Ug7NgAekaQK-h2e6_N3El9t0"
     *      }
     * @apiDescription 获取所有CICD路由
     * @apiName getAll
     * @apiSampleRequest /api/cicd/all
     * @apiGroup CICD
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
        const data = await CiCdVariableModel.find().populate('code');
        ctx.body = {
            code: 200,
            data,
            message: '查询成功'
        }
    }

    /**
     * 添加CICD路由
     * @api {POST} /api/cicd/add 添加CICD路由
     * @apiHeaderExample {json} Header-Example:
     *      {
     *          "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ind1ZmVuZ2xpYW5nIiwiaWF0IjoxNTY5MzA0OTY2LCJleHAiOjE1NjkzMTIxNjZ9.HXbPm_ggEIMevSOpLK2Ug7NgAekaQK-h2e6_N3El9t0"
     *      }
     * @apiDescription 添加CICD路由
     * @apiName addCicd
     * @apiSampleRequest /api/cicd/add
     * @apiParam {String} code  系统编码 
     * @apiParam {String} environment  系统环境 
     * @apiParam {String} port  端口 
     * @apiParam {String} ip  ip地址
     * @apiParam {String} path  服务器部署路径 
     * @apiGroup CICD
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
    async addCicd(ctx: { [key: string]: any }) {
        const { code, type, environment, port, ip, path } = ctx.request.body,
            data = await CiCdVariableModel.create({ code, type, environment, port, ip, path });
        ctx.body = {
            code: 200,
            data,
            message: '添加成功'
        }
    }

    /**
    * 删除CICD路由
    * @api {POST} /api/cicd/delete 删除CICD路由
    * @apiHeaderExample {json} Header-Example:
    *      {
    *          "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ind1ZmVuZ2xpYW5nIiwiaWF0IjoxNTY5MzA0OTY2LCJleHAiOjE1NjkzMTIxNjZ9.HXbPm_ggEIMevSOpLK2Ug7NgAekaQK-h2e6_N3El9t0"
    *      }
    * @apiDescription 删除CICD路由
    * @apiName deleteCicd
    * @apiSampleRequest /api/cicd/delete
    * @apiParam {Array} ids  系统id 
    * @apiGroup CICD
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
    async deleteCicd(ctx: { [key: string]: any }) {
        const { ids } = ctx.request.body,
            data = await CiCdVariableModel.deleteMany({ _id: { $in: ids } });
        ctx.body = {
            code: 200,
            message: '删除成功'
        };

    }

    /**
    * 编辑CICD路由
    * @api {POST} /api/cicd/edit 编辑CICD路由
    * @apiHeaderExample {json} Header-Example:
    *      {
    *          "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ind1ZmVuZ2xpYW5nIiwiaWF0IjoxNTY5MzA0OTY2LCJleHAiOjE1NjkzMTIxNjZ9.HXbPm_ggEIMevSOpLK2Ug7NgAekaQK-h2e6_N3El9t0"
    *      }
    * @apiDescription 编辑CICD路由
    * @apiName editCicd
    * @apiSampleRequest /api/cicd/edit
    * @apiParam {String} id  系统id 
    * @apiParam {String} environment 系统环境 
    * @apiParam {String} port  系统端口
    * @apiGroup CICD
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
    async editCicd(ctx: { [key: string]: any }) {
        const { id, environment, port, ip, path } = ctx.request.body,
            data = await CiCdVariableModel.find({ _id: id });
        if (data.length === 0) {
            ctx.body = {
                code: 201,
                message: '当前参数异常'
            }
        } else {
            const result = await CiCdVariableModel.updateOne({ _id: id }, { environment, port, ip, path });
            ctx.body = {
                code: 200,
                message: '更新成功'
            }
        }
    }
}