/*
 * @Author: WuFengliang 
 * @Date: 2019-08-27 16:11:24 
 * @Description:   系统类型 
 * @Last Modified time: 2019-08-27 16:11:24 
 */
import { mongose } from '../config';

const { model, Schema } = mongose;

const systemTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    parentId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'systemModel'
    }
});

const systemType = model('systemType', systemTypeSchema);

export { systemType };