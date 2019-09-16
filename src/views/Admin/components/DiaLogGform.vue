<!-- gform 新增编辑组件 -->
<template>
  <div class="dialog">
    <el-dialog :title="dialog.title" width="80%" :visible.sync="dialog.show">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        size="mini"
        label-width="120px"
        style="margin:0px;width:auto;"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="模块代码" prop="moduleid">
              <el-input v-model="ruleForm.moduleid" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-transfer v-model="value" :data="data"></el-transfer>
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
  name: "DiaLogGform",

  data() {
    const generateData = _ => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0
        });
      }
      return data;
    };
    return {
      data: generateData(),
      value: [1, 4],
      rules: {
        menuname: [
          { required: true, message: "菜单名称不能为空", trigger: "blur" }
        ],
        formid: [
          { required: true, message: "指向功能号不能为空", trigger: "blur" }
        ]
      }
    };
  },

  props: {
    dialog: Object,
    ruleForm: Object
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post(this.$sysadminurl + "/mid_menu", this.ruleForm)
            .then(res => {
              this.$message.success("新增成功");
              this.dialog.show = false;
              this.$emit("update", this.ruleForm.moduleid);
            });
        }
      });
    }
  }
};
</script>

