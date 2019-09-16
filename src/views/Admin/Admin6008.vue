<template>
  <div class="formcontext">
    <el-row style="margin-bottom:1%;">
      <el-button-group>
        <el-button
          type="primary"
          size="mini"
          style="margin-right:10px;"
          @click="back"
          icon="el-icon-search"
        >返回</el-button>
        <el-button
          type="primary"
          size="mini"
          style="margin-right:10px;"
          @click="submitForm(formdata)"
          icon="el-icon-share"
        >保存</el-button>
      </el-button-group>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid-content bg-purple" style="height:600px;">
          <el-form
            :model="formdata"
            :ref="formdata"
            label-position="right"
            label-width="120px"
            status-icon
            :rules="rules"
            style="padding:50px 50px 50px 0px;"
          >
            <el-form-item label="功能号" prop="formid">
              <el-input :disabled="true" v-model="formdata.formid"></el-input>
            </el-form-item>
            <el-form-item label="页面名称" prop="progformname">
              <el-input :disabled="true" v-model="formdata.progformname"></el-input>
            </el-form-item>
            <el-form-item label="区域代码" prop="moduleid">
              <el-select v-model="formdata.moduleid" placeholder="区域代码">
                <el-option
                  v-for="item in options"
                  :key="item.moduleid"
                  :label="item.modulename"
                  :value="item.moduleid"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="功能名称" prop="formname">
              <el-input v-model="formdata.formname"></el-input>
            </el-form-item>
            <el-form-item label="控制器" prop="controller">
              <el-input v-model="formdata.controller"></el-input>
            </el-form-item>
            <el-form-item label="功能说明" prop="memo">
              <el-input v-model="formdata.memo"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="12">
        <div style="height:600px;">
          <template>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="showdata">
              <el-checkbox
                v-for="(citem) in data"
                :label="citem.name"
                :key="citem.type"
                style="width:120px; margin-top:10px;margin-left:5px"
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
        </div>
      </el-col>
    </el-row>
  </div>
</template
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
      type: 0,
      options: [],
      data: [],
      showdata: [],
      formdata: {
        formid: "",
        progformname: "",
        moduleid: "",
        controller: "",
        formname: "",
        memo: ""
      },
      rules: {
        moduleid: [
          { required: true, message: "模块代码不能为空", trigger: "blur" }
        ],
        formname: [
          { required: true, message: "模块名称不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    if (this.$route.params.multipleSelection != undefined) {
      this.formdata = this.$route.params.multipleSelection;
    }

    this.getappdata();
    //getbyusrgroupexits
    this.$axios
      .get(
        "http://localhost:9001/api/mid_actiontype/getbyusrgroupexits?formid="+this.formdata.formid+"&usrgroupcode=100"
      )
      .then(res => {
        this.data = res.data;
        for (var i = 0; i < res.data.length; i++) {
         if(res.data[i].formidtype != "0"){
           this.showdata.push(res.data[i].name)
            console.log(res.data[i].name)
         }
        }
      });
  },
  methods: {
    checkRow(checked, row) {
      if (this.formdata.formid == "" || this.formdata.formid == undefined) {
        return;
      }

      if (checked == true) {
        // 添加工具栏
        this.$axios.post("http://localhost:9001/api/mid_gformaction", {
          formid: this.formdata.formid,
          actiontype: row.type,
          memo: row.name,
          usrgroupcode: "100",
          usrgroupname: "基础"
        });
      } else if (checked == false) {
        // 删除工具栏
        //
        this.$axios.delete("http://localhost:9001/api/mid_gformaction?usrgroupcode=100&formid="+this.formdata.formid+"&actiontype="+row.type+"");
      }
    },
    back() {
      this.$router.push("/Admin/6005");
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 新增
          if (this.formdata.formid == "" && this.formdata.progformname == "") {
            this.$axios
              .post(this.$sysadminurl + "/mid_gform", this.formdata)
              .then(res => {
                this.$message.success("新增成功");
                this.formdata = res.data;
              });

            return;
          }

          //修改
          this.$axios
            .put(this.$sysadminurl + "/mid_gform", this.formdata)
            .then(res => {
              this.$message.success("修改成功");
              this.formdata = res.data;
            });
        }
      });
    },
    getappdata() {
      // 获取功能列表
      this.$axios.get(this.$sysadminurl + "/mid_module").then(res => {
        this.formdata.moduleid = res.data[0].moduleid;
        this.options = res.data;
      });
    }
  }
};
</script>

<style scoped>
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>