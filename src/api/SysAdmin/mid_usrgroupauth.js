/**
 * mid_usrgroupauth 接口
 */

import base from '@utils/base'; // 导入接口域名列表
import axios from '@service/http'; // 导入http中创建的axios实例

const mid_usrgroupauth = {

    // 新增数据
    addData(formdata) {
        return axios.post(`${base.sysadminurl}/mid_usrgroupauth`, formdata);
    },

    // 删除数据
    delData(applicationid, usrgroupcode, formid) {
        return axios.delete(`${base.sysadminurl}/mid_usrgroupauth?usrgroupcode=` + usrgroupcode + '&formid=' + formid + '&applicationid=' + applicationid);
    },

}

export default mid_usrgroupauth;