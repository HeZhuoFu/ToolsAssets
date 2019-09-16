/**
 * mid_usrgroupusr 接口
 */

import base from '@utils/base'; // 导入接口域名列表
import axios from '@service/http'; // 导入http中创建的axios实例

const mid_usrgroupusr = {

    // 新增用户角色组
    adddata(formdata) {
        return axios.post(`${base.sysadminurl}/mid_usrgroupusr/`, formdata)
    },

    // 删除用户角色组
    deletedata(applicationid, usrgroupcode, usercode) {
        return axios.delete(`${base.sysadminurl}/mid_usrgroupusr?usrgroupcode=` + usrgroupcode + '&usercode=' + usercode + '&applicationid=' + applicationid)
    }

}

export default mid_usrgroupusr;