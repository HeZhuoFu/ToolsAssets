<template>
  <div class="formcontext">
    <el-row class="self-margin-down">
      <el-button-group>
        <el-button type="primary" size="mini" style="margin-right:10px;" icon="el-icon-search">查询</el-button>
      </el-button-group>
    </el-row>
    <el-table
      v-if="tableData.length > 0"
      :data="tableData"
      size="mini "
      border
      stripe
      style="width:100%"
      max-height="550"
    >
      <el-table-column type="index" label="序号" align="center" width="70"></el-table-column>
      <el-table-column prop="applicationid" label="应用代码" align="center" width="150"></el-table-column>
      <el-table-column prop="applicationname" label="应用名称" align="center" width="150"></el-table-column>
      <el-table-column prop="memo" label="应用说明" align="center"></el-table-column>
    </el-table>
  </div>
</template>
    
<script>
export default {
  name: "Admin6002",
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      // 获取表格数据
      this.$axios
        .get(this.$sysadminurl + "/imid_application")
        .then(res => {
          this.tableData = res.data;
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
</style>