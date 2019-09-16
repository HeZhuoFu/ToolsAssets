/**
 * mid_usergroup 接口
 */

import base from '@utils/base'; // 导入接口域名列表
import axios from '@service/http'; // 导入http中创建的axios实例

const mid_usergroup = {

    // 获取所有数据
    getall(applicationid) {
        return axios.get(`${base.sysadminurl}/mid_usergroup?applicationid=` + applicationid);
    },

    // 新增角色组
    adddata(formdata) {
        return axios.post(`${base.sysadminurl}/mid_usergroup/`, formdata)
    },

    // 根据用户代码获取数据
    getbyusercode(usercode, applicationid) {
        return axios.get(`${base.sysadminurl}/mid_usergroup/getbyusercode?usercode=` + usercode + '&applicationid=' + applicationid)
    }
}

export default mid_usergroup;