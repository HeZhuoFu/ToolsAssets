<template>
  <div>
    <el-row class="menu_page">
      <el-col>
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#324057"
          text-color="#fff"
          unique-opened
          active-text-color="#409eff"
        >
          <router-link to="/home">
            <el-menu-item index="99">
              <i class="fa fa-margin fa-servr el-icon-menu"></i>
              <span slot="title">工作台账</span>
            </el-menu-item>
          </router-link>

          <template v-for="item in items">
            <el-submenu v-if="item.children" :index="'' + item.seq">
              <template slot="title">
                <i :class=" 'fa fa-margin ' + item.iconclass "></i>
                <span slot="title">{{item.menuname}}</span>
              </template>
              <router-link
                v-for="(citem,cindex) in item.children"
                :to=" '/' + citem.moduleid + '/' + citem.formid"
                :key="cindex"
              >
                <el-menu-item :index="''+citem.seq">
                  <span slot="title">{{citem.menuname}}</span>
                </el-menu-item>
              </router-link>
            </el-submenu>
          </template>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import bus from "../assets/EventBus.js";
export default {
  name: "left-menu",
  data() {
    return {
      items: []
    };
  },
  created() {
    bus.$on("tip", index => {
      this.getleftdatas(index);
    });
  },
  methods: {
    // 获取左侧数据
    getleftdatas(moduleid) {
      var alldatas = JSON.parse(localStorage.eleMenu || "[]");
      // console.log(localStorage.eleRouter);
       this.items = alldatas.filter(x => x.moduleid === moduleid);
    }
  }
};
</script>

<style scoped>
.menu_page {
  position: fixed;
  top: 71px;
  left: 0;
  min-height: 100%;
  background-color: #324057;
  z-index: 99;
}
.el-menu {
  border: none;
}
.fa-margin {
  margin-right: 10px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}

.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>
