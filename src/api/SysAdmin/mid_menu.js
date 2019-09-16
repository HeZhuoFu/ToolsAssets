/**
 * mid_menu 接口
 */

import base from '@utils/base'; // 导入接口域名列表
import axios from '@service/http'; // 导入http中创建的axios实例

const mid_menu = {

    // 获取目录数据
    getbyUsr(applicationid, usercode, moduleid = '') {
        return axios.get(`${base.sysadminurl}/mid_menu/GetbyUsr?applicationid=` + applicationid + '&usercode=' + usercode + '&moduleid=' + moduleid);
    },

    // 查询菜单数据
    getjoingform(moduleid) {
        return axios.get(`${base.sysadminurl}/mid_menu/getjoingform?moduleid=` + moduleid);
    },

    // 查询单条数据
    getSingle(applicationid, menuid) {
        return axios.get(`${base.sysadminurl}/mid_menu?menuid=` + menuid + '&applicationid=' + applicationid);
    },

    // 新增数据
    addMenu(DtoMid_MenuAdd) {
        return axios.post(`${base.sysadminurl}/mid_menu/`, DtoMid_MenuAdd);
    },

    // 保存数据
    saveMenu(formdata) {
        return axios.put(`${base.sysadminurl}/mid_menu/`, formdata);
    },

    // 删除数据
    delMenu(applicationid, menuid) {
        return axios.delete(`${base.sysadminurl}/mid_menu/deldata?menuid=` + menuid + '&applicationid=' + applicationid);
    },

    // 新增实体类
    DtoMid_MenuAdd: {
        menuname: '',
        formid: 0,
        parentmenu: 0,
        moduleid: '',
        memo: '',
        seq: 0,
        iconclass: '',
        applicationid: ''
    },

    // 修改实体类
    DtoMid_MenuUpdate: {
        menuid: '',
        menuname: '',
        formid: 0,
        parentmenu: 0,
        moduleid: '',
        memo: '',
        seq: 0,
        iconclass: '',
        applicationid: ''
    },
}

export default mid_menu;