<template>
  <header class="head-nav">
    <el-row>
      <el-col :span="6" class="logo-container">
        <img src="../assets/logo.png" class="logo" alt>
        <span class="title">模具生产管理系统</span>
      </el-col>
      <el-col :span="12">
        <el-menu
          default-active="0"
          mode="horizontal"
          background-color="#324057"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <template v-for="item in items">
            <el-menu-item
              :index="''+item.seqn"
              @click="handleSelect(item.moduleid)"
            >{{item.modulename}}</el-menu-item>
          </template>
        </el-menu>
      </el-col>
      <el-col :span="6" class="user">
        <div class="userinfo">
          <img src="../assets/touxiang.jpg" class="avatar" alt>
          <div class="welcome">
            <p class="name comename">欢迎</p>
            <p class="name avatarname">{{user.username}}</p>
          </div>
          <span class="username">
            <!--下拉箭头-->
            <el-dropdown trigger="click" @command="setDialogInfo">
              <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
  </header>
</template>

<script>
import bus from "../assets/EventBus.js";
export default {
  name: "headNav",

  computed: {
    user() {
      return JSON.parse(localStorage.eleUser || "[]"); //this.$store.getters.user;
    }
  },

  data() {
    return {
      items: []
    };
  },

  created() {
    this.getModule();
  },

  mounted() {
    bus.$emit("tip", "Base");
  },

  methods: {
    getModule() {
      this.items = JSON.parse(localStorage.eleModule || "[]");
    },

    handleSelect(index) {
      bus.$emit("tip", index);
    },

    setDialogInfo(cmdItem) {
      switch (cmdItem) {
        case "info":
          this.showInfoList();
          break;
        case "logout":
          this.logout();
          break;
      }
    },

    showInfoList() {
      this.$router.push("/infoshow");
    },

    logout() {
      // 清除token
      localStorage.removeItem("eleToken");
      localStorage.removeItem("eleModule");
      localStorage.removeItem("eleMenu");
      localStorage.removeItem("eleUser");

      // 跳转
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.el-menu-demo {
  background: #324057;
}
.el-menu.el-menu--horizontal {
  border-bottom: solid 1px #324057;
}
.head-nav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  background: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
}
.logo-container {
  line-height: 60px;
  min-width: 400px;
}
.logo {
  height: 50px;
  width: 50px;
  margin-right: 5px;
  vertical-align: middle;
  display: inline-block;
}
.title {
  vertical-align: middle;
  font-size: 22px;
  font-family: "Microsoft YaHei";
  letter-spacing: 3px;
}
.user {
  line-height: 60px;
  text-align: right;
  float: right;
  padding-right: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}
.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.comename {
  font-size: 12px;
}
.avatarname {
  color: #409eff;
  font-weight: bolder;
}
.username {
  cursor: pointer;
  margin-right: 5px;
}
.el-dropdown {
  color: #fff;
}
</style>

