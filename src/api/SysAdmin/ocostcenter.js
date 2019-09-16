/**
 * ocostcenter 接口
 */

import base from '@utils/base'; // 导入接口域名列表
import axios from '@service/http'; // 导入http中创建的axios实例

const ocostcenter = {

    // 查询所有数据
    getall(companyid, ccode) {
        return axios.get(`${base.sysadminurl}/ocostcenter?companyid=` + companyid + '&ccode=' + ccode);
    },

    // 远程搜索
    getbyquery(query) {
        return axios.get(`${base.sysadminurl}/ocostcenter/getbyquery?query=` + query);
    }

}

export default ocostcenter;