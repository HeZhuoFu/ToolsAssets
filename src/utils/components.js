// 全局通用组件

import Breadcrumb from "@components/Breadcrumb";
import ActionTool from "@components/ActionTool";
import CommonTable from "@components/Table";
import CommonTable2 from "@components/Table2";
import DocStatusImg from "@components/DocStatusImg";


export default (Vue) => {
    Vue.component("Breadcrumb", Breadcrumb),
        Vue.component("ActionTool", ActionTool),
        Vue.component("CommonTable", CommonTable),
        Vue.component("CommonTable2", CommonTable2),
        Vue.component("DocStatusImg", DocStatusImg)

}