/**
 *  用户验证接口
 */

import base from '@utils/base'; // 导入接口域名列表
import axios from '@service/http'; // 导入http中创建的axios实例

let identity = {
    // 调用方法，防止data重复
    getCommEntity() {
        return {
            formid: "", // 功能号
            sort: "",
            order: 'desc',
            hackReset: false,
            multipleSelection: [], // 选中行的数据
            pagination: {
                total: 0, //总数
                pageIndex: 1, //初始页码
                pageSize: 20 //初始页数
            },
            // 弹出层
            dialog: {
                show: false,
                title: "",
                option: ""
            },
            options: {
                border: true, //是否开启表格边框
                loading: false, //加载动画
                heidht: 0, //表格高度
                subheight: 0, //表格减除高度
            }
        }
    },

    // 登录接口    
    getToken(params) {
        return axios.post(`${base.identityurl}/connect/token`, params);
    }
}


export default identity;