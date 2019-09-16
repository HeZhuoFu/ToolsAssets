/**
 * mid_gform 接口
 */

import base from '@api/base'; // 导入接口域名列表
import axios from '@service/http'; // 导入http中创建的axios实例

const mid_gform = {

    // 分页获取模块数据
    getbypage(page, rows, sort, order, moduleid, formid, formname, progformname) {
        return axios.get(`${base.sysadminurl}/mid_gform/getbypage?page=` + page +
            '&rows=' + rows + '&sort=' + sort + '&order=' + order + '&moduleid=' + moduleid + '&formid=' +
            formid + '&formname=' + formname + '&progformname=' + progformname);
    },

    // demo12332


}

export default mid_gform;