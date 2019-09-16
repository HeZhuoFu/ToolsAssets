/**
 * nc_sysuser 接口
 */

import base from '@utils/base'; // 导入接口域名列表
import axios from '@service/http'; // 导入http中创建的axios实例

const nc_sysuser = {

    // 分页查询用户数据
    getbypage(page, rows, sort, order, usercode, username, cccode, ccname) {
        return axios.get(`${base.sysadminurl}/nc_sysuser/getbypage?Page=` + page + '&Rows=' + rows +
            '&sort=' + sort + '&order=' + order + '&usercode=' + usercode + '&username=' + username +
            '&cccode=' + cccode + '&ccname=' + ccname);
    }

}

export default nc_sysuser;