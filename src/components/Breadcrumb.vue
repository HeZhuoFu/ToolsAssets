<!-- 面包屑组件 -->
<template>
  <el-row class='divToolBar'>
    <el-divider direction="vertical"></el-divider>
    <span>业务导航: {{formid}}, {{formname}}</span>
    <span style="color:red;font-size:12px;padding-left:20px;">{{memo}}</span>
  </el-row>
</template>

<script>
import { constants } from "crypto";
export default {
  // 名称
  name: "breadcrumb",

  // 组件
  components: {},

  // 数据
  data() {
    return {
      formid: "",
      formname: "",
      memo:"",
    };
  },

  // 操作方法
  methods: {
    // 根据formid获取面包屑信息
    getFomridMessage(formid) {
      var r = JSON.parse(localStorage.eleRouter || "[]");

      var message = r.filter(x => x.formid === Number(formid));

      this.formid = formid;

      this.formname = message[0].formname;

      this.memo = message[0].memo;
    }
  },

  created() {
    if (this.$route.params.formid == undefined) {
      // this.$notify.error({
      //   title: "错误提示",
      //   message: "formid未传递,请联系管理员",
      //   duration: 0
      // });
    } else {
      this.getFomridMessage(this.$route.params.formid);
    }
  }
};
</script>

<style scoped>
.divToolBar {
    height: 35px;
    line-height: 35px;
    background-color: #E5F3FE;
    border-bottom: 1px solid #7AC0DA;
    font-size: 13px;
    text-align: left;
    color: #2b50fc;
    padding-left: 10px;
}
</style>