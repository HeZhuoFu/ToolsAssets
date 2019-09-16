/**
 * mid_menu 接口
 */

import base from '@api/base'; // 导入接口域名列表
import axios from '@service/http'; // 导入http中创建的axios实例

const mid_menu = {

    // 获取目录数据
    getbyUsr(usercode, moduleid='') {
        return axios.get(`${base.sysadminurl}/mid_menu/GetbyUsr?usercode=` + usercode + '&moduleid=' + moduleid);
    }

}

export default mid_menu;