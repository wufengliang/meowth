import { mongoose } from '../config';
import * as moment from 'moment';

const { model, Schema } = mongoose;

const systemShema = new Schema({
    name: {
        //  系统名称
        type: String,
        required: true,
    },
    systemCode: {
        //  eg:scm->smc-web/scm-app
        type: String,
        required: true,
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
        get: (v: string | Date) => moment(v).format('YYYY-MM-DD HH:mm:ss')
    },
    updateTime: {
        //  更新时间
        type: Date,
        default: null,
        get: (v: string | Date) => moment(v).format('YYYY-MM-DD HH:mm:ss')
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
    },
    developer: {
        //  开发人员
        type: [{ type: Schema.Types.ObjectId, ref: 'user' }]
    },
    leader: {
        //  负责人 (前端、后端)
        type: [{ type: Schema.Types.ObjectId, ref: 'user' }]
    },
    isOpenAutoPipeline: {
        //  是否开启pipelines
        type: Boolean,
        default: false,
    },
    autoPipelineTime: {
        //  自动执行任务时间（分）
        type: Number,
        default: null
    }
}, {
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' },
    toJSON: { getters: true, virtuals: true },
    id: false,
});

systemShema.virtual('systemName').get(function () { return `${(this as any).name}/${(this as any).systemCode}` });

const SystemModel = model('system', systemShema);

export { SystemModel };