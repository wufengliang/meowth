/*
 * @Author: WuFengliang
 * @Date: 2019-09-10 17:27:47
 * @Description:   开发人员列表
 * @Last Modified time: 2019-09-10 17:27:47
 */
import { mongoose } from '../config';
import * as moment from 'moment';
import SettingPassword from '../utils/password'

const { model, Schema } = mongoose;

const userSchema = new Schema({
    name: {
        //  姓名
        type: String,
        required: true,
        trim: true,
        maxlength: 8,
        unique: true,
    },
    username: {
        //  登录账号
        type: String,
        required: true,
        maxlength: 15
    },
    password: {
        //  密码
        type: String,
        trim: true,
        required: true,
        get: (value: string) => SettingPassword.setPassword(value)
    },
    role: {
        //  角色
        type: String,
        required: true,
        trim: true,
    },
    telPhone: {
        //  手机号码
        type: String,
        maxlength: 11,
        minlength: 11,
    },
    contactQQ: {
        type: String,
        required: true,
    },
    createTime: {
        type: Date,
        default: Date.now,
        get: (v: string | Date) => moment(v).format('YYYY-MM-DD HH:mm')
    },
    updateTime: {
        type: Date,
        default: null,
        get: (v: string | Date) => moment(v).format('YYYY-MM-DD HH:mm')
    },
    isOpen: {
        //  是否开启
        type: Boolean,
        default: false,
    }
}, {
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
});

userSchema.set('toJSON', { getters: true });

const UserModel = model('user', userSchema);

export { UserModel };