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
          @click="HandleAdd"
          icon="el-icon-share"
        >新增</el-button>
        <el-button
          type="primary"
          @click="HandleEdit"
          size="mini"
          style="margin-right:10px;"
          icon="el-icon-share"
        >修改</el-button>
        <el-button
          type="primary"
          @click="HandleEditDelete"
          size="mini"
          style="margin-right:10px;"
          icon="el-icon-share"
        >删除</el-button>
      </el-button-group>
    </el-row>
    <div>
      <el-form :inline="true">
        <el-form-item label="系统代码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="模块代码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="模块名称">
          <el-input></el-input>
        </el-form-item>
        <el-popover placement="bottom-start" trigger="click" style="padding-left:2%;">
          <el-button size="mini" type="primary" slot="reference">
            更多条件
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
        </el-popover>
      </el-form>
    </div>
    <el-table
      v-if="tableData.length > 0"
      :data="tableData"
      @row-click="handleSelectionChange"
      size="mini"
      border
      highlight-current-row
      stripe
      style="width:100%"
      max-height="450"
    >
      <el-table-column type="index" label="序号" align="center" width="70"></el-table-column>
      <el-table-column prop="applicationid" label="系统代码" align="center" width="150"></el-table-column>
      <el-table-column prop="moduleid" label="模块代码" align="center" width="150"></el-table-column>
      <el-table-column prop="modulename" label="模块名称" align="center" width="150"></el-table-column>
      <el-table-column prop="parentmenu" label="初始目录标识" align="center" width="150"></el-table-column>
      <el-table-column prop="areas" label="区域代码" align="center" width="150"></el-table-column>
      <el-table-column prop="seqn" label="排序号" align="center" width="150"></el-table-column>
      <el-table-column prop="iconfont" label="图标" align="center" width="150"></el-table-column>
      <el-table-column prop="memo" label="备注" align="center"></el-table-column>
    </el-table>

    <DiaLogMould :dialog="dialog" :enterdata="enterdata" :ruleForm="ruleForm" @update="getProfile"></DiaLogMould>
  </div>
</template>
    
<script>
import DiaLogMould from "./components/DiaLogMould";

export default {
  name: "Admin6003",
  components: {
    DiaLogMould
  },
  data() {
    return {
      tableData: [],
      enterdata: false,
      dialog: {
        show: false,
        title: "",
        option: ""
      },
      ruleForm: {
        applicationid: "",
        moduleid: "",
        modulename: "",
        seqn: 0,
        areas: "",
        iconfont: "",
        parentmenu: 0
      },
      multipleSelection: []
    };
  },
  created() {
    this.getProfile();
  },
  methods: {
    HandleAdd() {
      this.enterdata = false;
      this.ruleForm = {
        applicationid: "",
        moduleid: "",
        modulename: "",
        seqn: 0,
        areas: "",
        iconfont: "",
        parentmenu: 0
      };

      this.dialog = {
        show: true,
        title: "添加模块",
        option: "add"
      };
    },

    HandleEdit() {
      if (this.multipleSelection.length == 0) {
        this.$message.warning("请先选中明细!");
        return;
      }
      this.ruleForm = this.multipleSelection;
      this.enterdata = true;
      this.dialog = {
        show: true,
        title: "编辑模块",
        option: "edit"
      };

      this.ruleForm = this.multipleSelection;
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
              this.$sysadminurl +
                "/mid_module/" +
                this.multipleSelection.moduleid
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
    getProfile() {
      // 获取表格数据
      this.$axios.get(this.$sysadminurl + "/mid_module").then(res => {
        this.multipleSelection = [];
        this.tableData = res.data;
      });
    },

    //保存选中结果
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style scoped>
</style>