/*
 * @Author: WuFengliang 
 * @Date: 2019-08-29 10:55:56 
 * @Description:   系统开发负责人 
 * @Last Modified time: 2019-08-29 10:55:56 
 */
import { mongoose } from '../config';

const { model, Schema } = mongoose;

const systemDevelopSchema = new Schema({
    leader: {
        //  负责人
        type: Array,
        required: true,
    },
    frontEnd: Array,    //  前端
    backEnd: Array,  //  后端
    testEngineer: Array, //  测试
    productManager: Array,   //  产品
    system: {
        type: mongoose.Types.ObjectId,
        unique: true,
        ref: 'system',
    }
},{
    versionKey:false,
});

const SystemDevelopModel = model('systemDevelop', systemDevelopSchema);

export { SystemDevelopModel }