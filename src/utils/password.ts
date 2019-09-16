/*
 * @Author: WuFengliang
 * @Date: 2019-09-10 17:46:36
 * @Description:   跟密码有关的操作
 * @Last Modified time: 2019-09-10 17:46:36
 */
import * as bcrypt from 'bcryptjs';

class SettingPassword {

    setPassword(value: string) {
        return bcrypt.hashSync(value, 10);
    }

    comparePassword(loginPassword: string, postPassword: string) {
        return bcrypt.compareSync(loginPassword, postPassword);
    }
}

export default new SettingPassword()