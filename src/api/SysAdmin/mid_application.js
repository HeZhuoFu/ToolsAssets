/**
 * mid_application 接口
 */

import base from '@utils/base'; // 导入接口域名列表
import axios from '@service/http'; // 导入http中创建的axios实例

const mid_application = {

    // 查询所有数据
    getAll(applicationid, applicationname) {
        return axios.get(`${base.sysadminurl}/imid_application?applicationid=` + applicationid + '&applicationname=' + applicationname);
    }

}

export default mid_application;