import { mongose } from '../config';

const { model, Schema } = mongose;

const systemShema = new Schema({
    name: {
        //  系统名称
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    systemCode: {
        //  eg:scm->smc-web/scm-app
        type: String,
        required: true,
        trim: true,
    },
    systemType: {
        //  系统类型 （web/app/nodejs/小程序)
        type: String,
        enum: ['WEB', 'APP', 'NODEJS', '小程序'],
        default: 'WEB',
    },
    createTime: {
        //  创建时间
        type: Date,
        default: Date.now,
    },
    updateTime: {
        //  更新时间
        type: Date,
        default: null,
    },
    creator: {
        //  创建人
        type: String,
        required: true,
    },
    modifier: {
        //  修改人
        type: String,
        default: null,
    }
});

const system = model('system', systemShema);

export { system };