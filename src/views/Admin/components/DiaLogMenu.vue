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
        size="mini"
        label-width="120px"
        style="margin:0px;width:auto;"
      >
        <el-row>
          <el-col :span="11">
            <el-form-item label="模块代码" prop="moduleid">
              <el-input v-model="ruleForm.moduleid" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="模块名称" prop="modulename">
              <el-input v-model="ruleForm.modulename" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="父级菜单" prop="parentmenu">
              <el-input v-model="ruleForm.parentmenu" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="菜单代码" prop="menuid">
              <el-input v-model="ruleForm.menuid" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="菜单代码" prop="menuname">
              <el-input v-model="ruleForm.menuname" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="指向功能号" prop="formid">
              <el-input v-model="ruleForm.formid" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="排序代码" prop="seq">
              <el-input v-model="ruleForm.seq" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="图标样式" prop="iconclass">
              <el-input v-model="ruleForm.iconclass" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22">
            <el-form-item label="菜单备注" prop="memo">
              <el-input v-model="ruleForm.memo" autocomplete="off"></el-input>
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
  name: "DiaLogMenu",

  data() {
    return {
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
                this.$emit("update",this.ruleForm.moduleid);
            });
        }
      });
    }
  }
};
</script>

