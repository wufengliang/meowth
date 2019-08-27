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
    createTime: {
        //  创建时间
        type: Date,
        default: Date.now,
    },
    updateTime: {
        //  更新时间
        type: Date,
        default: null,
    }
});

const system = model('system', systemShema);

export { system };