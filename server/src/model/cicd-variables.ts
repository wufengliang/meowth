/*
 * @Author: WuFengliang 
 * @Date: 2019-08-27 11:07:09 
 * @Description:   ci/cd schema 
 * @Last Modified time: 2019-08-27 11:07:09 
 */
import { mongoose } from '../config';

const { Schema, model } = mongoose;

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
    },
    ip: {
        //  ip地址
        type: String,
        required: true,
        match: /((1\d{2}|25[0-5]|2[0-4]\d|[1-9]?\d)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)/,
    },
    path: {
        //  服务器部署路径
        type: String,
        required: true,
    },
    creator: {
        //  创建人
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    modifier: {
        //  更新人
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, {
    versionKey: false,
});

const CiCdVariableModel = model('cicdVariable', cicdShema);

export { CiCdVariableModel };