/**
 * mid_module 接口
 */

import base from '@utils/base'; // 导入接口域名列表
import axios from '@service/http'; // 导入http中创建的axios实例

const mid_module = {

    // 根据用户代码获取模块数据
    getusermou(applicationid, usercode) {
        return axios.get(`${base.sysadminurl}/mid_module/getusermou?usercode=` + usercode + '&applicationid=' + applicationid);
    },

    // 获取所有模块数据
    getall(applicationid) {
        return axios.get(`${base.sysadminurl}/mid_module?applicationid=` + applicationid);
    },

    // 新增模块数据
    addmodule(addentity) {
        return axios.post(`${base.sysadminurl}/mid_module/`, addentity);
    },

    // 删除模块数据
    deletemodule(moduleid) {
        return axios.delete(`${base.sysadminurl}/mid_module/` + moduleid);
    },

    // 修改模块数据
    aleTableData(addentity) {
        return axios.put(`${base.sysadminurl}/mid_module/`, addentity);
    },

    // 新增实体
    DtoMid_ModuleAdd: {
        applicationid: "",
        moduleid: "",
        modulename: "",
        seqn: 0,
        areas: "",
        memo: "",
        iconfont: "",
        parentmenu: 0
    },

    // 修改实体
    DtoMid_ModuleUpdate: {
        applicationid: "",
        moduleid: "",
        modulename: "",
        seqn: 0,
        areas: "",
        memo: "",
        iconfont: "",
        parentmenu: 0
    },
}

export default mid_module;