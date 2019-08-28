/*
 * @Author: WuFengliang 
 * @Date: 2019-08-27 11:07:09 
 * @Description:   ci/cd schema 
 * @Last Modified time: 2019-08-27 11:07:09 
 */
import { mongose } from '../config';

const { Schema, model } = mongose;

const cicdShema = new Schema({
    code: {
        //  CI/CD配置项工程系统编码 (scm->scm-web)
        type: Schema.Types.ObjectId,
        ref: "system"
    },
    environment: {
        //  环境
        type: String,
        required: true,
    },
    port: {
        //  端口
        type: String,
        required: true,
        select: false,
    },
    ip: {
        //  ip地址
        type: String,
        required: true,
        match: /((1\d{2}|25[0-5]|2[0-4]\d|[1-9]?\d)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)/,
        select: false,
    },
    path: {
        //  服务器部署路径
        type: String,
        required: true,
        select: false,
    }
});

const cicdVariable = model('cicdVariable', cicdShema);

export { cicdVariable };