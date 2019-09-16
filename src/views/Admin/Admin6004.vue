<template>
  <div class="formcontext">
    <el-row style="margin-bottom:1%;">
      <el-button-group>
        <el-button
          type="primary"
          size="mini"
          style="margin-right:10px;"
          @click="AddFirstMenu"
          icon="el-icon-search"
        >添加一级菜单</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="getCheckedNodes"
          v-show="tools.add"
          style="margin-right:10px;"
          icon="el-icon-share"
        >新增</el-button>
        <el-button
          type="primary"
          size="mini"
          v-show="tools.delete"
          @click="DeleteMenu"
          style="margin-right:10px;"
          icon="el-icon-share"
        >删除</el-button>
      </el-button-group>
    </el-row>
    <el-row>
      <el-col :span="10">
        <div>
          <el-select
            v-model="module_defalut"
            size="small"
            @change="gettreedata"
            placeholder="请选择模块"
          >
            <el-option
              v-for="item in module_data"
              :key="item.moduleid"
              :label="item.modulename"
              :value="item.moduleid"
            ></el-option>
          </el-select>
          <el-tree
            :data="tree_data"
            ref="tree"
            :default-expand-all="true"
            :expand-on-click-node="false"
            :check-on-click-node="true"
            :props="defaultProps"
            :highlight-current="true"
            @node-click="handleNodeClick"
          ></el-tree>
        </div>
      </el-col>
      <el-col :span="11">
        <el-form
          :label-position="labelPosition"
          size="small"
          label-width="120px"
          :model="formLabelAlign"
          :ref="formLabelAlign"
        >
          <el-form-item label="模块代码">
            <el-input v-model="formLabelAlign.moduleid" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="模块名称">
            <el-input v-model="formLabelAlign.modulename" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="父级菜单">
            <el-input v-model="formLabelAlign.parentmenu" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="菜单代码">
            <el-input v-model="formLabelAlign.menuid" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="菜单名称">
            <el-input v-model="formLabelAlign.menuname"></el-input>
          </el-form-item>
          <el-form-item label="指向功能号">
            <el-input v-model="formLabelAlign.formid"></el-input>
          </el-form-item>
          <el-form-item label="排列序号">
            <el-input v-model="formLabelAlign.seq"></el-input>
          </el-form-item>
          <el-form-item label="图标样式">
            <el-input v-model="formLabelAlign.iconclass"></el-input>
          </el-form-item>
          <el-form-item label="备注信息">
            <el-input v-model="formLabelAlign.memo"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit(formLabelAlign)">保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <DiaLogMenu :dialog="dialog" :ruleForm="ruleForm" @update="gettreedata"></DiaLogMenu>
  </div>
</template>
    
<script>
import DiaLogMenu from "./components/DiaLogMenu";

export default {
  // 组件名称
  name: "Admin_6004",
  // 引用组件
  components: {
    DiaLogMenu
  },
  // 数据列表
  data() {
    return {
      // 树形数据
      tree_data: [],
      // 模块数据
      module_data: [],
      // 表单水平位置
      labelPosition: "right",
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
      // select模块的默认值
      module_defalut: "",

      // 树形控件参数
      defaultProps: {
        children: "children",
        label: "menuname"
      },
      // 表单数据
      formLabelAlign: {
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
      // 工具栏
      tools: {
        add: false,
        delete: false
      }
    };
  },
  // 页面创建后执行
  created() {
    // 渲染出模块下拉框数据,并设置好默认值

    this.getmoduledate();
  },

  // 方法
  methods: {
    // 新增菜单
    getCheckedNodes() {
      // var nodedata = this.$refs.tree.getCheckedNodes();
      this.dialog.show = true;
    },

    // 获取单条目录的数据
    getmenudata(menuid) {
      this.$axios.get(this.$sysadminurl + "/mid_menu/" + menuid).then(res => {
        this.formLabelAlign = res.data;
        this.ruleForm.moduleid = res.data.moduleid;
        this.ruleForm.modulename = res.data.modulename;
        this.ruleForm.parentmenu = res.data.menuid;
      });
    },

    // 点击节点触发的动作
    handleNodeClick(data) {
      this.getmenudata(data.menuid);
      const length = data.children.length;

      if (length > 0) {
        (this.tools.delete = false), (this.tools.add = true);
      } else {
        (this.tools.add = true), (this.tools.delete = true);
      }
    },

    // 获取模块数据
    getmoduledate() {
      this.$axios.get(this.$sysadminurl + "/mid_module").then(res => {
        this.module_data = res.data;
        // 设置默认值
        this.module_defalut = res.data[0].moduleid;
        // 展现默认树
        this.gettreedata(res.data[0].moduleid);
      });
    },

    // 获取树形数据
    gettreedata(vId) {
      this.$axios
        .get(this.$sysadminurl + "/mid_menu/getjoingform?moduleid=" + vId)
        .then(res => {
          var datas = this.$listToTree(res.data, {
            idKey: "menuid",
            parentKey: "parentmenu",
            childrenKey: "children"
          });
          this.tree_data = datas;
        });

      (this.tools.add = false), (this.tools.delete = false);
    },

    // 保存菜单信息
    onSubmit(formLabelAlign) {
      this.$axios
        .put(this.$sysadminurl + "/mid_menu", formLabelAlign)
        .then(res => {
          this.$message.success("保存成功");
        });
    },

    // 添加一级菜单
    AddFirstMenu() {
      this.ruleForm = {
        moduleid: this.module_defalut,
        parentmenu: 0
      };
      this.dialog.show = true;
    },

    // 删除目录
    DeleteMenu() {
      var nodedata = this.$refs.tree.getCheckedNodes();
      if (nodedata[0].children.length > 0) {
        this.$message.console.warn("此菜单下还有子菜单，无法删除!");
        return;
      }
      var menuid = nodedata[0].menuid;
      this.$axios
        .delete(this.$sysadminurl + "/mid_menu/" + menuid)
        .then(res => {
          this.$message.success("删除成功");
        });
      this.gettreedata(nodedata[0].moduleid);
    }
  }
};
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 14px;
}
</style>