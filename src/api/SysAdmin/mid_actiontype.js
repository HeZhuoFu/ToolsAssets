/**
 * mid_ActionType 接口
 */

import base from '@utils/base'; // 导入接口域名列表
import axios from '@service/http'; // 导入http中创建的axios实例

const mid_actiontype = {

    // 根据用户权限获取功能号对应的按钮数据
    getbyuser(applicationid, usercode, formid) {
        return axios.get(`${base.sysadminurl}/mid_actiontype/getbyuser?usercode=` + usercode + '&formid=' + formid + '&applicationid=' + applicationid);
    },

    getbyusrgroupexits(applicationid, usrgroupcode, formid) {
        return axios.get(`${base.sysadminurl}/mid_actiontype/getbyusrgroupexits?formid=` + formid + '&usrgroupcode=' + usrgroupcode + '&applicationid=' + applicationid);
    }

}

export default mid_actiontype;