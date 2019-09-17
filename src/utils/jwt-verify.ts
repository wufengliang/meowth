/*
 * @Author: WuFengliang 
 * @Date: 2019-09-12 17:42:25 
 * @Description:   token校验 
 * @Last Modified time: 2019-09-12 17:42:25 
 */
import * as jsonwebtoken from 'jsonwebtoken';
import { secret } from '../config';

export default function () {
    return async function (ctx: { [key: string]: any }, next: Function) {
        const token = ctx.header.authorization;
        if (token) {
            const data = await jsonwebtoken.verify(token.split(' ')[1], secret);
            ctx.session.username = (data as any).username;
        }
        await next();
    }
}