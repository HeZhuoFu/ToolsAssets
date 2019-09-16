/**
 * mid_module 接口
 */

import base from '@api/base'; // 导入接口域名列表
import axios from '@service/http'; // 导入http中创建的axios实例

const mid_module = {

    // 获取模块数据
    getusermou(usercode) {
        return axios.get(`${base.sysadminurl}/mid_module/getusermou?usercode=` + usercode);
    }

}

export default mid_module;