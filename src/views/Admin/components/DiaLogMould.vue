<!-- 模块 新增编辑组件 -->
<template>
  <div class="dialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-modal="false"
      :close-on-press-eacape="false"
      :modal-append-to-body="false"
    >
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        style="margin:10px;width:auto;"
      >
        <el-row>
          <el-col :span="11">
            <el-form-item label="模块代码" prop="moduleid">
              <el-input
                v-model="ruleForm.moduleid"
                :disabled="enterdata"
                autocomplete="off"
                placeholder="请输入模块代码"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="模块名称" prop="modulename">
              <el-input v-model="ruleForm.modulename" autocomplete="off" placeholder="请输入模块名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="所属功能" prop="applicationname">
              <el-select v-model="ruleForm.applicationid" placeholder="请选择" filterable>
                <el-option
                  v-for="item in options"
                  :key="item.applicationid"
                  :label="item.applicationname"
                  :value="item.applicationid"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="排序标识" prop="seqn">
              <el-input v-model="ruleForm.seqn" autocomplete="off" placeholder="请输入模块名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="图标样式" prop="iconfont">
              <el-input v-model="ruleForm.iconfont" autocomplete="off" placeholder="请输入模块代码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="初始菜单" prop="parentmenu">
              <el-input
                v-model="ruleForm.parentmenu"
                disabled
                autocomplete="off"
                placeholder="请输入模块代码"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="区域代码" prop="areas">
              <el-input v-model="ruleForm.areas" disabled autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.show = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "DiaLogMould",
  data() {
    return {
      rules: {
        moduleid: [
          { required: true, message: "模块代码不能为空", trigger: "blur" }
        ],
        modulename: [
          { required: true, message: "模块名称不能为空", trigger: "blur" }
        ]
      },
      options: []
    };
  },
  created() {
    this.getappdata();
  },
  props: {
    dialog: Object,
    ruleForm: Object,
    enterdata: true
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const url = this.dialog.option;
          if (url == "add") {
            this.ruleForm.areas = this.ruleForm.moduleid;
            this.$axios
              .post(this.$sysadminurl + "/mid_module", this.ruleForm)
              .then(res => {
                this.$message.success("新增成功");
                this.dialog.show = false;
                this.$emit("update");
              });
          } else if (url == "edit") {
            this.$axios
              .put(this.$sysadminurl + "/mid_module", this.ruleForm)
              .then(res => {
                this.$message.success("修改成功");
                this.dialog.show = false;
                this.$emit("update");
              });
          }
        }
      });
    },
    getappdata() {
      // 获取功能列表
      this.$axios.get(this.$sysadminurl + "/imid_application").then(res => {
        this.ruleForm.applicationid = res.data[0].applicationid;
        this.options = res.data;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

