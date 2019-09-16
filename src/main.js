import Vue from 'vue'
import App from '@/App.vue'
import router from '@routes/router' //路由
import ElementUI from 'element-ui'; //element组件
import 'element-ui/lib/theme-chalk/index.css'; //element样式
import axios from '@service/http'
import moment from 'moment';
import 'moment/locale/zh-cn';
import components from '@/utils/components.js'
import api from "@utils/api";

import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
import XEUtils from 'xe-utils'



Vue.use(VXETable)

moment.locale('zh-cn');
Vue.use(ElementUI, {
    size: 'small'
});
Vue.use(components);

VXETable.setup({
    // 默认尺寸
    size: 'mini',
    // 版本号，对于某些带数据缓存的功能有用到，上升版本号可以用于重置数据
    version: 0,
    // 所有内容超过隐藏
    showAllOverflow: null,
    // 所有表头内容超过隐藏
    showHeaderAllOverflow: null,
    // 默认快捷菜单
    contextMenu: null,
    // 自定义图标配置
    iconMap: {
        sortAsc: 'vxe-icon--caret-top',
        sortDesc: 'vxe-icon--caret-bottom',
        filter: 'vxe-icon--funnel',
        edit: 'vxe-icon--edit-outline',
        tree: 'vxe-icon--caret-right',
        jumpPrev: 'vxe-icon--d-arrow-left',
        jumpNext: 'vxe-icon--d-arrow-right',
        prevPage: 'vxe-icon--arrow-left',
        nextPage: 'vxe-icon--arrow-right'
    },
    // 默认 tooltip 主题样式
    tooltipConfig: {
        zIndex: 3000,
        theme: 'dark'
    },
    // 默认分页参数
    pager: {
        pageSize: 20,
        pagerCount: 7,
        pageSizes: [10, 15, 20, 50, 100],
        layouts: ['PrevJump', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'NextJump', 'Sizes', 'Total']
    },
    // 默认工具栏参数
    toolbar: {
        setting: false,
        buttons: []
    },
    // 默认优化配置项
    optimization: {
        animat: true,
        // 当列大于 40 条时自动启用横向 X 滚动渲染
        scrollX: {
            gt: 40,
            oSize: 5,
            rSize: 16
        },
        // 当数据大于 500 条时自动启用纵向 Y 滚动渲染
        scrollY: {
            gt: 500,
            oSize: 20,
            rSize: 80
        }
    }
})

Vue.prototype.$axios = axios
Vue.prototype.$moment = moment
Vue.prototype.$api = api

// Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')