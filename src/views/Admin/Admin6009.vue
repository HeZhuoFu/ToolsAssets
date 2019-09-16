<!-- 功能号 6009, 用户列表 -->
<template>
  <div class="formcontext">
    <el-row style="margin-bottom:1%;">
      <el-button-group>
        <el-button
          type="primary"
          size="mini"
          style="margin-right:10px;"
          @click="getProfile"
          icon="el-icon-search"
        >查询</el-button>
      </el-button-group>
    </el-row>

    <el-table
      v-if="tableData.length > 0"
      :data="tableData"
      size="mini"
      border
      highlight-current-row
      stripe
      style="width:100%"
      max-height="600"
    >
      <el-table-column type="index" label="序号" align="center" width="70"></el-table-column>
      <el-table-column prop="usercode" label="工号" align="center" width="150"></el-table-column>
      <el-table-column prop="username" label="姓名" align="center" width="150"></el-table-column>
      <el-table-column prop="companyid" label="公司" align="center" width="150"></el-table-column>
      <el-table-column prop="cccode" label="部门代码" align="center" width="150"></el-table-column>
      <el-table-column prop="ccname" label="部门名称" align="center" width="150"></el-table-column>
    </el-table>

  </div>
</template>
    
<script>
export default {
  name: "Admin6009",

  data() {
    return {
      tableData: [],
      // DiaLogMenu组件数据
      // 提供给子组件的数据
      ruleForm: {
        moduleid: "",
        modulename: "",
        parentmenu: "",
        menuid: "",
        menuname: "",
        formid: "",
        seq: "",
        iconclass: "",
        memo: ""
      }
    };
  },

  created() {
    this.getProfile();
  },

  methods: {
    // 获取表格数据
    getProfile() {
      this.$axios
        .get(this.$sysadminurl + "/nc_sysuser/getbypage?Page=1&Rows=100")
        .then(res => {
          this.multipleSelection = [];
          this.tableData = res.data.rows;
        });
    }
  }
};
</script>

<style scoped>
</style>