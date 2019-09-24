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
	/**
	 * 获取所有用户列表
	 * @api {GET} /api/user/all 获取所有用户路由
	 * @apiHeaderExample {json} Header-Example:
	 *      {
	 *          "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ind1ZmVuZ2xpYW5nIiwiaWF0IjoxNTY5MzA0OTY2LCJleHAiOjE1NjkzMTIxNjZ9.HXbPm_ggEIMevSOpLK2Ug7NgAekaQK-h2e6_N3El9t0"
	 *      }
	 * @apiDescription 获取所有用户路由
	 * @apiName getAll
	 * @apiSampleRequest /api/user/all
	 * @apiGroup User
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
		const data = await UserModel.find().select('-password');
		ctx.body = {
			code: 200,
			data,
			message: '查询用户列表成功'
		}
	}

	/**
	 * 添加用户
	 * @api {POST} /api/user/add 添加用户路由
	 * @apiHeaderExample {json} Header-Example:
	 *      {
	 *          "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ind1ZmVuZ2xpYW5nIiwiaWF0IjoxNTY5MzA0OTY2LCJleHAiOjE1NjkzMTIxNjZ9.HXbPm_ggEIMevSOpLK2Ug7NgAekaQK-h2e6_N3El9t0"
	 *      }
	 * @apiDescription 添加系统路由
	 * @apiName addUser
	 * @apiSampleRequest /api/system/add
	 * @apiParam {String} name  姓名 
	 * @apiParam {String} username  登录账号 
	 * @apiParam {String} password  登录密码 
	 * @apiParam {String} role  角色
	 * @apiParam {String} mobile  手机号码
	 * @apiParam {String} contactQQ  QQ号
	 * @apiParam {String} [email]  邮箱
	 * @apiGroup User
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

	/**
		* 编辑用户路由
		* @api {POST} /api/user/edit 编辑用户路由
		* @apiHeaderExample {json} Header-Example:
		*      {
		*          "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ind1ZmVuZ2xpYW5nIiwiaWF0IjoxNTY5MzA0OTY2LCJleHAiOjE1NjkzMTIxNjZ9.HXbPm_ggEIMevSOpLK2Ug7NgAekaQK-h2e6_N3El9t0"
		*      }
		* @apiDescription 编辑用户路由
		* @apiName editUser
		* @apiSampleRequest /api/user/edit
		* @apiParam {String} id  用户id 
		* @apiParam {String} name 用户姓名 
		* @apiParam {String} username  用户登录账号
		*	@apiParam {String} mobile 用户手机号码
		*	@apiParam {String} contactQQ 用户QQ号
		*	@apiParam {String} role 用户角色
		*	@apiParam {String} email 用户邮箱
		* @apiGroup User
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
	async editUser(ctx: { [key: string]: any }) {
		const { id, name, username, mobile, contactQQ, role, email } = ctx.request.body,
			result = await UserModel.findById(id);
		if (!result) {
			ctx.throw(404, '用户不存在');
		}
		const data = await UserModel.updateOne({ _id: id }, { $set: { name, username, mobile, contactQQ, role, email } });
		ctx.body = {
			code: 200,
			message: '用户更新成功'
		}
	}


	/**
	 * 删除用户
	 * @api {POST} /api/user/delete 删除用户
	 * @apiHeaderExample {json} Header-Example:
	 *      {
	 *          "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ind1ZmVuZ2xpYW5nIiwiaWF0IjoxNTY5MzA0OTY2LCJleHAiOjE1NjkzMTIxNjZ9.HXbPm_ggEIMevSOpLK2Ug7NgAekaQK-h2e6_N3El9t0"
	 *      }
	 * @apiDescription 删除用户
	 * @apiName deleteSytem
	 * @apiSampleRequest /api/user/delete
	 * @apiParam {String} id  用户id 
	 * @apiGroup User
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

	/**
		* 用户登录
		* @api {POST} /api/user/login 用户登录
		* @apiDescription 用户登录
		* @apiName login
		* @apiSampleRequest /api/user/login
		* @apiParam {String} username  用户登录账号
		*	@apiParam {String} password 用户登录密码
		* @apiGroup User
		* @apiVersion 1.0.0
		* @apiSuccessExample Response-Success:
		*      HTTP 1.1/ 200K
		*      {
		*          'code': 200,
		*          'msg': '登录成功',
		*					'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ind1ZmVuZ2xpYW5nIiwiaWF0IjoxNTY5MzA0OTY2LCJleHAiOjE1NjkzMTIxNjZ9.HXbPm_ggEIMevSOpLK2Ug7NgAekaQK-h2e6_N3El9t0'
		*      }
		* @apiErrorExample Response-Fail:
		*      HTTP 1.1/ 404K
		*      {
		*          code:500
		*      }
		*/
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

	/**
		* 用户注册
		* @api {POST} /api/user/register 用户注册
		* @apiDescription 用户注册
		* @apiName register
		* @apiSampleRequest /api/user/register
		* @apiParam {String} name 用户姓名 
		* @apiParam {String} username  用户登录账号
		* @apiParam {String} password  用户登录密码
		*	@apiParam {String} mobile 用户手机号码
		*	@apiParam {String} contactQQ 用户QQ号
		*	@apiParam {String} role 用户角色
		*	@apiParam {String} email 用户邮箱
		*	@apiParam {Boolean} isLeader 是否是负责人
		* @apiGroup User
		* @apiVersion 1.0.0
		* @apiSuccessExample Response-Success:
		*      HTTP 1.1/ 200K
		*      {
		*          'code': 200,
		*          'msg': '注册成功',
		*      }
		* @apiErrorExample Response-Fail:
		*      HTTP 1.1/ 404K
		*      {
		*          code:500
		*      }
		*/
	async register(ctx: { [key: string]: any }) {
		const { name, username, password, role, mobile, contactQQ, isLeader } = ctx.request.body;
		const result = await UserModel.create({ name, username, password: SettingPassword.setPassword(password), role, mobile, contactQQ, status: "ACITIVED", isLeader });
		if (result) {
			ctx.body = {
				code: 200,
				message: '注册成功'
			}
		} else {
			ctx.throw(500, '异常错误');
		}
	}

	/**
	 * 获取登录信息
	 * @api {POST} /api/user/delete 获取登录信息
	 * @apiHeaderExample {json} Header-Example:
	 *      {
	 *          "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ind1ZmVuZ2xpYW5nIiwiaWF0IjoxNTY5MzA0OTY2LCJleHAiOjE1NjkzMTIxNjZ9.HXbPm_ggEIMevSOpLK2Ug7NgAekaQK-h2e6_N3El9t0"
	 *      }
	 * @apiDescription 获取登录信息
	 * @apiName getPerson
	 * @apiSampleRequest /api/user/me
	 * @apiGroup User
	 * @apiVersion 1.0.0
	 * @apiSuccessExample Response-Success:
	 *      HTTP 1.1/ 200K
	 *      {
	 *          'code': 200,
	 *          'msg': '获取个人信息成功',
	 * 					'data':{}
	 *      }
	 * @apiErrorExample Response-Fail:
	 *      HTTP 1.1/ 404K
	 *      {
	 *          code:404
	 *      }
	 */
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

	/**
	 * 获取某个用户信息
	 * @api {POST} /api/user/delete 获取某个用户信息
	 * @apiHeaderExample {json} Header-Example:
	 *      {
	 *          "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ind1ZmVuZ2xpYW5nIiwiaWF0IjoxNTY5MzA0OTY2LCJleHAiOjE1NjkzMTIxNjZ9.HXbPm_ggEIMevSOpLK2Ug7NgAekaQK-h2e6_N3El9t0"
	 *      }
	 * @apiDescription 获取某个用户信息
	 * @apiName getPerson
	 * @apiSampleRequest /api/user/single/:username
	 * @apiGroup User
	 * @apiVersion 1.0.0
	 * @apiSuccessExample Response-Success:
	 *      HTTP 1.1/ 200K
	 *      {
	 *          'code': 200,
	 *          'msg': '查询成功',
	 * 					'data':{}
	 *      }
	 * @apiErrorExample Response-Fail:
	 *      HTTP 1.1/ 404K
	 *      {
	 *          code:404
	 *      }
	 */
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