
<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">模具生产管理系统</span>
      </div>
      <el-form
        :model="loginUser"
        :rules="rules"
        ref="loginForm"
        class="loginForm"
        label-width="60px"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="loginUser.username" autofocus placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginUser.password"
            placeholder="请输入密码"
            @keyup.enter.native="submitForm('loginForm')"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登 录</el-button>
        </el-form-item>
        <div class="tiparea">
          <p>
            还没有账号？现在
            <router-link to="/register">注册</router-link>
          </p>
        </div>
      </el-form>
    </section>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";

export default {
  // 名称
  name: "login",

  // 组件
  components: {},

  // 数据
  data() {
    return {
      loginUser: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
        ]
      }
    };
  },

  // 操作方法
  methods: {
    // 登录方法
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api.identity.getToken(this.params).then(res => {
            const token = res.data.access_token;
            this.jwtToken(token);
          });
        }
      });
    },

    // 根据token解析出数据并存储到ls
    jwtToken(token) {
      // 存储到ls
      localStorage.setItem("eleToken", token);

      // 解析token
      const decode = jwt_decode(token);
      localStorage.setItem("eleUser", JSON.stringify(decode || "[]"));
      this.saveMenuToLs("admin");
      this.saveMouleToLs("system");

      // 页面跳转
      this.$router.push("/home");
    },

    // 将目录存储到ls中
    saveMenuToLs(usercode) {
      this.$api.mid_menu.getbyUsr(usercode).then(res => {
        var datas = listToTree(res.data, {
          idKey: "menuid",
          parentKey: "parentmenu",
          childrenKey: "children"
        });
        localStorage.setItem("eleMenu", JSON.stringify(datas || "[]"));
      });
    },

    // 将模块信息保存到ls
    saveMouleToLs(usercode) {
      this.$api.mid_module.getusermou(usercode).then(res => {
        localStorage.setItem("eleModule", JSON.stringify(res.data || "[]"));
      });
    },

    // 字符是否为空
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  },

  // 监听
  watch: { checkboxModel: {} },

  // 计算属性
  computed: {
    params: function() {
      const params = new URLSearchParams();
      params.append("client_id", "password");
      params.append("client_secret", "secret");
      params.append("grant_type", "password");
      params.append("username", this.loginUser.username);
      params.append("password", this.loginUser.password);
      return params;
    }
  },

  //创建之前
  beforeCreate: function() {},

  //创建完成
  created: function() {},

  // 挂载之前
  beforeMount: function() {},

  // 挂载完成
  mounted: function() {},

  // 更新之前
  beforeUpdate: function() {},

  // 更新完成
  updated: function() {},

  // 销毁之前
  beforeDestroy: function() {},

  // 销毁完成
  destroyed: function() {}
};
</script>

<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 20%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>


