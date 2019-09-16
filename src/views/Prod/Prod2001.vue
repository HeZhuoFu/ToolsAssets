<template>
  <div>
    <!-- <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right" style="padding:10px 0px 0px 10px;">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>-->

    <el-row style="padding:10px 0px 10px 10px;">
      <el-col :span="3">
        <el-popover placement="bottom-start" trigger="click">
          <el-button size="mini" type="primary" slot="reference">
            请选择查询条件
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
        </el-popover>
      </el-col>
      <el-col :span="12" style="text-align: center;">
        <template>
          <div>
            <el-radio-group v-model="radio" size="small" >
              <el-radio-button label="本阶段"></el-radio-button>
              <el-radio-button label="未确定" ></el-radio-button>
              <el-radio-button label="已确定"></el-radio-button>
              <el-radio-button label="未送达"></el-radio-button>
              <el-radio-button label="已处理"></el-radio-button>
              <el-radio-button label="所有"></el-radio-button>
            </el-radio-group>
          </div>
        </template>
      </el-col>
      <el-col :span="9">
        <el-button-group style="float:right;">
          <el-button type="primary" size="mini" style="margin-right:10px;" icon="el-icon-edit">刷新</el-button>
          <el-button type="primary" size="mini" style="margin-right:10px;" icon="el-icon-share">新增</el-button>
          <el-button type="primary" size="mini" style="margin-right:10px;" icon="el-icon-delete">删除</el-button>
          <el-button type="primary" size="mini" style="margin-right:10px;" icon="el-icon-search">搜索</el-button>
          <el-button type="primary" size="mini" style="margin-right:10px;">
            上传
            <i class="el-icon-upload el-icon--right"></i>
          </el-button>
        </el-button-group>
      </el-col>
    </el-row>

    <el-table
      v-if="tableData.length > 0"
      :data="tableData"
      size="small"
      border
      style="width:100%"
      max-height="600"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand" size="mini">
            <el-form-item label="销售公司">
              <span>{{ props.row.companyid }}</span>
            </el-form-item>
            <el-form-item label="销售名称">
              <span>{{ props.row.companyname }}</span>
            </el-form-item>
            <el-form-item label="供货公司">
              <span>{{ props.row.supplycompanyid }}</span>
            </el-form-item>
            <el-form-item label="供货公司">
              <span>{{ props.row.supplycompanyname }}</span>
            </el-form-item>
            <el-form-item label="计费模式">
              <span>{{ props.row.doctype }}</span>
            </el-form-item>
            <el-form-item label="备注">
              <span>{{ props.row.memo }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      </el-table-column>

      <el-table-column type="selection" width="40"></el-table-column>
      <!-- <el-table-column type="index" label="序号" align="center" width="50"></el-table-column> -->
      <el-table-column prop="doccode" label="单号" align="center" width="120"></el-table-column>
      <el-table-column prop="docstatus" label="状态" align="center" width="50"></el-table-column>
      <el-table-column
        prop="enterdate"
        label="单据日期"
        :formatter="formatData"
        align="center"
        width="100"
      ></el-table-column>
      <el-table-column prop="cltcode" label="客户代码" align="center" width="100"></el-table-column>
      <el-table-column prop="cltname" label="客户名称" align="center" width="250"></el-table-column>
      <el-table-column prop="sumtotalmoney" label="本金金额" align="center" width="100">
        <template slot-scope="scope">
  <span style="color:#00d053">{{scope.row.sumtotalmoney}}</span>
</template>
      </el-table-column>
      <el-table-column prop="stcode" label="仓库代码" align="center" width="100"></el-table-column>
      <el-table-column prop="stname" label="仓库名称" align="center" width="100"></el-table-column>
      <el-table-column prop="entername" label="录入人" align="center" width="80"></el-table-column>
      <el-table-column prop="enterdate" label="录入时间" :formatter="formatTime" align="center" width="130"></el-table-column>
      <el-table-column label="操作" align="center" >
      <template slot-scope="scope">
  <el-button size="mini">编辑</el-button>
  <el-button size="mini" type="danger">删除</el-button>
</template>
    </el-table-column>
  </el-table>
    </el-table>
  </div>
</template>
    
<script>
export default {
  name: "fundList",
  data() {
    return {
      tableData: [],
      radio: "所有"
    };
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      // 获取表格数据
      this.$axios
        .get(
          "http://localhost:5001/api/mj_salesorderhd/getbypage?Page=1&Rows=100&StartDate=2018-1-1&EndDate=2019-1-1"
        )
        .then(res => {
          this.tableData = res.data.rows;
        })
        .catch(err => console.log(err));
    },
    formatData: function(row, column) {
      //return row.enterdate
      return this.$moment(row.docdate).format("YYYY-MM-DD");
    },
    formatTime: function(row, column) {
      return this.$moment(row.enterdate).format("YYYY-MM-DD HH:mm ");
    }
  }
};
</script>

<style scoped>
</style>