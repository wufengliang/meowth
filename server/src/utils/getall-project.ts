/*
 * @Author: WuFengliang
 * @Date: 2019-10-23 11:18:43
 * @Description:   获取所有gitlab项目
 * @Last Modified time: 2019-10-23 11:18:43
 */
import * as robot from '../config/robot';
import * as request from 'request';

const url = 'https://git.1ziton.com/api/v4/projects?per_page=100&owned=true&simple=true';

export default function () {
    return new Promise((resolve, reject) => {
        request(url, {
            method: 'get', headers: {
                'Private-Token': robot.default.private_token
            }
        }, (err, response, body) => {
            if (err) {
                reject(err);
            }
            if (response.statusCode === 200) {
                resolve(JSON.parse(body));
            }
        })
    })
};

