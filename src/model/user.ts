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
    mobile: {
        //  手机号码
        type: String,
        maxlength: 11,
        minlength: 11,
    },
    email: {
        //  邮箱
        type: String,
        match: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/
    },
    contactQQ: {
        type: String,
        required: true,
    },
    createTime: {
        type: Date,
        default: Date.now,
        get: (v: string | Date) => moment(v).format('YYYY-MM-DD HH:mm:ss')
    },
    updateTime: {
        type: Date,
        default: null,
        get: (v: string | Date) => moment(v).format('YYYY-MM-DD HH:mm:ss')
    },
    status: {
        //  是否开启
        type: String,
        //  已激活，未激活，禁用
        enum: ['ACITIVED', 'NONACITIVED', 'DISABLED'],
        default: false,
    }
}, {
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
});

userSchema.virtual('statusName').get(function () {
    return `${this.statusName === 'ACITIVED' ? '已激活' : (this.statusName === 'NONACITIVED' ? '未激活' : '禁用')}`
})

userSchema.set('toJSON', { getters: true });

const UserModel = model('user', userSchema);

export { UserModel };