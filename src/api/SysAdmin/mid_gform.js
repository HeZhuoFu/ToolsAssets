/**
 * mid_gform 接口
 */

import base from '@utils/base'; // 导入接口域名列表
import axios from '@service/http'; // 导入http中创建的axios实例

const mid_gform = {

    // 分页获取模块数据
    getbypage(page, rows, sort, order, applicationid, moduleid, formid, formname, progformname) {
        return axios.get(`${base.sysadminurl}/mid_gform/getbypage?page=` + page +
            '&rows=' + rows + '&sort=' + sort + '&order=' + order + '&applicationid=' + applicationid + '&moduleid=' + moduleid + '&formid=' +
            formid + '&formname=' + formname + '&progformname=' + progformname);
    },

    getjoinusr(applicationid, usrgroupcode, moduleid = '', formid = '', formname = '', isexists = false) {
        return axios.get(`${base.sysadminurl}/mid_gform/getjoinusr?usrgroupcode=` + usrgroupcode + '&moduleid=' + moduleid +
            '&formid=' + formid + '&formname=' + formname + '&isexists=' + isexists + '&applicationid=' + applicationid);
    },

    // 根据用户获取有权限的formid
    getjoinusercode(applicationid, usercode) {
        return axios.get(`${base.sysadminurl}/mid_gform/getjoinusercode?applicationid=` + applicationid + '&usercode=' + usercode);
    },

    // 新增
    addData(formdata) {
        return axios.post(`${base.sysadminurl}/mid_gform`, formdata);
    },

    // 修改
    updateData(formdata) {
        return axios.put(`${base.sysadminurl}/mid_gform`, formdata);
    },

    // 删除
    deleteData(applicationid, formid) {
        return axios.delete(`${base.sysadminurl}/mid_gform/deldata?formid=` + formid + '&applicationid=' + applicationid);
    },

    DtoMid_GformUpdate() {
        return {
            formid: 0,
            formname: '',
            progformname: '',
            sysid: '',
            moduleid: '',
            dbid: '',
            controller: '',
            parameter: '',
            memo: '',
        }

    }

}

export default mid_gform;