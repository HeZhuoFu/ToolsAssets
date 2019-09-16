/**
 *  用户验证接口
 */

import base from '@api/base'; // 导入接口域名列表
import axios from '@service/http'; // 导入http中创建的axios实例

const identity = {

    // 登录接口    
    getToken(params) {
        return axios.post(`${base.identityurl}/connect/token`, params);
    }
    
}

export default identity;