/**
 * mid_gformaction 接口
 */

import base from '@utils/base'; // 导入接口域名列表
import axios from '@service/http'; // 导入http中创建的axios实例

const mid_gformaction = {

    // 新增数据
    addData(formdata) {
        return axios.post(`${base.sysadminurl}/mid_gformaction`, formdata);
    },

    // 从全局角色复制
    addall(applicationid, usrgroupcode, formid) {
        return axios.post(`${base.sysadminurl}/mid_gformaction/addall?usrgroupcode=` + usrgroupcode + '&formid=' + Number(formid) + '&applicationid=' + applicationid);
    },

    // 删除数据
    delData(usrgroupcode, formid, actiontype) {
        return axios.delete(`${base.sysadminurl}/mid_gformaction?usrgroupcode=` + usrgroupcode + '&formid=' + formid + '&actiontype=' + actiontype);
    },

}

export default mid_gformaction;