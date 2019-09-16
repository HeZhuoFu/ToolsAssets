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
        <el-button
          type="primary"
          size="mini"
          style="margin-right:10px;"
          @click="Add"
          icon="el-icon-share"
        >新增</el-button>
        <el-button
          type="primary"
          size="mini"
          style="margin-right:10px;"
          icon="el-icon-share"
          @click="HandleEdit"
        >修改</el-button>
        <el-button
          type="primary"
          size="mini"
          style="margin-right:10px;"
          icon="el-icon-share"
          @click="HandleEditDelete"
        >删除</el-button>
      </el-button-group>
    </el-row>

    <el-table
      v-if="tableData.length > 0"
      :data="tableData"
      size="mini"
      @row-click="handleSelectionChange"
      border
      highlight-current-row
      stripe
      style="width:100%"
      max-height="600"
    >
      <el-table-column type="index" label="序号" align="center" width="70"></el-table-column>
      <el-table-column prop="formid" label="功能号" align="center" width="150"></el-table-column>
      <el-table-column prop="formname" label="功能名称" align="center" width="150"></el-table-column>
      <el-table-column prop="moduleid" label="模块代码" align="center" width="150"></el-table-column>
      <el-table-column prop="modulename" label="模块名称" align="center" width="150"></el-table-column>
      <el-table-column prop="progformname" label="页面名称" align="center" width="150"></el-table-column>
      <el-table-column prop="memo" width="150" label="DBID代码" align="center"></el-table-column>
      <el-table-column prop="memo" width="150" label="备注说明" align="center"></el-table-column>
    </el-table>
    <DiaLogGform :dialog="dialog" :ruleForm="ruleForm"></DiaLogGform>
  </div>
</template>
    
<script>
import DiaLogGform from "./components/DiaLogGform";

export default {
  name: "Admin_6005",

  // 引用组件
  components: {
    DiaLogGform
  },
  data() {
    return {
      tableData: [],
      // DiaLogMenu组件数据
      dialog: {
        show: false, // 是否启用组件
        title: "" // 组件标题
      },
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
      },
      multipleSelection: []
    };
  },
  created() {
    this.getProfile();
  },

  methods: {
    HandleEdit() {
      if (this.multipleSelection.length == 0) {
        this.$message.warning("请先选中明细!");
        return;
      }
      // 跳转到明细页面，并将form的值传递过去handleSelect(this.m)
      this.$router.push({ name: '6008', path: '/Admin/6008', params: {multipleSelection:this.multipleSelection}});
    },
    //保存选中结果
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    HandleEditDelete() {
      if (this.multipleSelection.length == 0) {
        this.$message.warning("请先选中明细!");
        return;
      }

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .delete(
              this.$sysadminurl + "/mid_gform/" + this.multipleSelection.formid
            )
            .then(res => {
              this.$message.success("删除成功");
              this.getProfile();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 获取表格数据
    getProfile() {
      this.$axios
        .get(this.$sysadminurl + "/mid_gform/getbypage?Page=1&Rows=100")
        .then(res => {
          this.multipleSelection = [];
          this.tableData = res.data.rows;
        });
    },

    // 获取功能列表
    getappdata() {
      this.$axios.get(this.$sysadminurl + "/imid_application").then(res => {
        this.ruleForm.applicationid = res.data[0].applicationid;
        this.options = res.data;
      });
    },

    // 新增事件
    Add() {
      this.$router.push("/Admin/6008");
      // this.dialog.title = "新增功能";
      // this.dialog.show = true;
    }
  }
};
</script>

<style scoped>
</style>