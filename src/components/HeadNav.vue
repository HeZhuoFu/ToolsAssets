<!-- 头部组件 -->
<template>
  <header class="head-nav" >
    <el-row>
      <el-col :span="3" class="logo-container">
        <img src="../assets/logo.png" class="logo" @click="hide" alt />
        <span class="title">模具生产制造系统</span>
      </el-col>
      <el-col :span="15">
        <el-menu
          default-active="0"
          mode="horizontal"
          background-color="#647ed9"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <template v-for="item in items">
            <el-menu-item
              :index="''+item.seqn"
              :key="item.moduleid"
              @click="handleSelect(item.moduleid)"
            >{{item.modulename}}</el-menu-item>
          </template>
        </el-menu>
      </el-col>
      <el-col :span="6" class="user">
        <div class="userinfo">
          <el-input
            style="width:120px;padding-right:20px;"
            @keyup.enter.native="go"
            size="mini"
            v-model="searchformid"
            placeholder="请输入功能号"
          ></el-input>
          <el-button icon="el-icon-refresh" size="mini" circle style="margin-right:20px;"></el-button>
          <img src="../assets/touxiang.jpg" class="avatar" alt />
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
      items: [],
      searchformid: "",
      collapse: false,
    };
  },

  created() {
    this.getModule();
  },

  mounted() {
    // bus.$emit("tip", "Base");
  },

  methods: {
    // logo点击事件
    hide() {
      this.collapse = !this.collapse;
      bus.$emit("collapse", this.collapse);
    },

    go() {
      if (this.searchformid == "") {
        this.$message.warning("请输入功能号!");
        return;
      }

      var r = JSON.parse(localStorage.eleRouter || "[]");

      var url = r.filter(x => x.formid === Number(this.searchformid));

      this.$router.push({
        name: "" + Number(url[0].formid) + "",
        params: { formid: Number(url[0].formid) }
      });
    },
    getModule() {
      setTimeout(this.pause, 1000);
    },

    pause() {
      this.items = JSON.parse(localStorage.eleModule || "[]");
      bus.$emit("tip", "Base");
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
      localStorage.removeItem("eleRouter");
      localStorage.removeItem("eleAction");
      // 跳转
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
/* 重写导航下划线 */
.el-menu.el-menu--horizontal {
  border-bottom: solid 1px #409eff;
}

/* header样式 */
.head-nav {
  width: 100%;
  /* height: 60px; */
  min-width: 600px;
  background: #647ed9;
  color: #fff;
}

/* 网站标题 */
.title {
  vertical-align: middle;
  font-size: 20px;
  font-family: "Microsoft YaHei";
  letter-spacing: 3px;
}

.logo-container {
  line-height: 60px;
}

/* logo图标 */
.logo {
  height: 30;
  width: 30px;
  margin-right: 10px;
  vertical-align: middle;
  display: inline-block;
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

