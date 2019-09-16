<template>
  <div>
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right" style="padding:10px 0px 10px 10px;">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row style="padding:0px 0px 5px 10px;">
      <el-popover placement="bottom-start" trigger="click">
        <span>这里显示查询条件的表单</span>
        <el-button size="mini" type="primary" slot="reference">
          请选择查询条件
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
      </el-popover>
      <i class="el-icon-refresh" style="padding:0px 10px 0px 10px;"></i>
      <el-button-group style="padding:5px 0px 5px 10px;">
        <el-button type="primary" size="mini" icon="el-icon-edit">刷新</el-button>
        <el-button type="primary" size="mini" icon="el-icon-share">新增</el-button>
        <el-button type="primary" size="mini" icon="el-icon-delete">删除</el-button>
        <el-button type="primary" size="mini" icon="el-icon-search">搜索</el-button>
        <el-button type="primary" size="mini">
          上传
          <i class="el-icon-upload el-icon--right"></i>
        </el-button>
      </el-button-group>
    </el-row>

    <el-table
      v-if="tableData.length > 0"
      :data="tableData"
      size="mini"
      border
      stripe
      style="width:100%"
      max-height="450"
    >
      <el-table-column type="index" label="序号" align="center" width="70"></el-table-column>
      <el-table-column prop="applicationid" label="系统代码" align="center" width="150"></el-table-column>
      <el-table-column prop="moduleid" label="模块代码" align="center" width="150"></el-table-column>
      <el-table-column prop="modulename" label="模块名称" align="center" width="150"></el-table-column>
      <el-table-column prop="parentmenu" label="父级模块" align="center" width="150"></el-table-column>
      <el-table-column prop="areas" label="区域代码" align="center" width="150"></el-table-column>
      <el-table-column prop="seqn" label="排序号" align="center" width="150"></el-table-column>
      <el-table-column prop="iconfont" label="图标" align="center" width="150"></el-table-column>
      <el-table-column prop="memo" label="备注" align="center" width="150"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
    
<script>
export default {
  name: "fundList",
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
        .get("http://localhost:5000/api/mid_module?isHateoas=false")
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