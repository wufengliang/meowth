/*
 * @Author: WuFengliang 
 * @Date: 2019-08-27 11:07:09 
 * @Description:   ci/cd schema 
 * @Last Modified time: 2019-08-27 11:07:09 
 */
import { mongose } from '../config';

const { Schema, model } = mongose;

const cicdShema = new Schema({
    
});

const cicdModel = model('cicdModel', cicdShema);

export { cicdModel };