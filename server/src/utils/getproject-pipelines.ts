/*
 * @Author: WuFengliang
 * @Date: 2019-10-23 16:11:08
 * @Description:   获取项目pipelines执行状态
 * @Last Modified time: 2019-10-23 16:11:08
 */

import * as request from 'request';
import * as robot from '../config/robot';

export default function (projectId: string) {
    const url = `https://git.1ziton.com/api/v4/projects/${projectId}/pipelines?status=running`,
        config = {
            url,
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Private-Token': robot.default.private_token
            }
        }
    return new Promise((resolve, reject) => {
        request(config, (err, response, body) => {
            if (err) {
                reject(err);
            }
            if (response.statusCode === 200) {
                resolve(JSON.parse(body));
            }
        })
    })
}