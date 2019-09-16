/**
 * ocompany 接口
 * 公司列表
 */

import base from '@utils/base'; // 导入接口域名列表
import axios from '@service/http'; // 导入http中创建的axios实例

const ocompany = {

    // 查询所有数据
    getall() {
        return axios.get(`${base.sysadminurl}/ocompany`);
    }

}

export default ocompany;