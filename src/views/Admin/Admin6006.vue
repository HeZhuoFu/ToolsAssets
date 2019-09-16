<!-- 功能号 6006, 权限分配 -->
<template>
  <div class="formcontext">
    <el-row style="margin-bottom:1%;">
      <el-button-group>
        <el-button type="primary" size="mini" style="margin-right:10px;" icon="el-icon-share">查询</el-button>
        <el-button type="primary" size="mini" style="margin-right:10px;" icon="el-icon-share">新增</el-button>
        <el-button type="primary" size="mini" style="margin-right:10px;" icon="el-icon-share">删除</el-button>
      </el-button-group>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="7">
        <div class="grid-content bg-purple" style="height:600px;">
          <el-table
            v-if="usrgroupData.length > 0"
            :data="usrgroupData"
            size="mini"
            border
            highlight-current-row
            stripe
            style="width:100%"
            height="600"
          >
            <el-table-column prop="usrgroupcode" label="角色代码" align="center" width="80"></el-table-column>
            <el-table-column prop="usrgroupname" label="角色名称" align="center" width="150"></el-table-column>
            <el-table-column prop="memo" label="角色说明" align="center"></el-table-column>
          </el-table>
        </div>
      </el-col>

      <el-col :span="8">
        <div style="height:600px;">
          <el-table
            v-if="tableData.length > 0"
            :data="tableData"
            size="mini"
            border
            highlight-current-row
            stripe
            style="width:100%"
            height="600"
          >
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="usrgroupcode" label="隶属角色" align="center" width="80"></el-table-column>
            <el-table-column prop="moduleid" label="隶属模块" align="center" width="80"></el-table-column>

            <el-table-column prop="formid" label="功能号" align="center" width="80"></el-table-column>
            <el-table-column prop="formname" label="功能名称" align="center"></el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="height:600px;">
          <template>
            <el-checkbox-group v-model="showdata" size="mini">
              <el-checkbox
                v-for="(citem) in data"
                :label="citem.name"
                :key="citem.type"
                style="width:100px; margin-top:5px;margin-left:5px"
                border
                @change="checked=>checkRow(checked, citem)"
              ></el-checkbox>
            </el-checkbox-group>
          </template>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Admin6008",

  data() {
    return {
      tableData: [],
      usrgroupData: [],
      data: []
    };
  },

  created() {
    this.getProfile();
    this.getusrgroup();
    this.$axios
      .get(
        "http://localhost:9001/api/mid_actiontype/getbyusrgroupexits?formid=1001&usrgroupcode=100"
      )
      .then(res => {
        this.data = res.data;
        this.loading = false;
      });
  },

  methods: {
    getProfile() {
      this.$axios
        .get("http://localhost:9001/api/mid_gform/getjoinusr?usrgroupcode=100")
        .then(res => {
          this.tableData = res.data;
        });
    },
    getusrgroup() {
      this.$axios.get("http://localhost:9001/api/mid_usergroup").then(res => {
        this.usrgroupData = res.data;
      });
    }
  }
};
</script>

<style scoped>
</style>