<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      text-color="black"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
            <el-submenu v-if="item.children" :key="item.menuid" :index="'' + item.seq">
              <template slot="title">
                <i :class="item.iconclass "></i>
                <span slot="title">{{item.menuname}}</span>
              </template>
              <router-link
                v-for="(citem,cindex) in item.children"
                :to="{ name: citem.formid, params: { formid: citem.formid}}"
                :key="cindex"
              >
                <el-menu-item :index="''+citem.seq">
                  <span slot="title">{{citem.menuname}}</span>
                </el-menu-item>
              </router-link>
            </el-submenu>
          </template>
    </el-menu>
  </div>
</template>

<script>
import bus from "../assets/EventBus.js";
export default {
  data() {
    return {
      collapse: false,
      items: [],
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });

    bus.$on("tip", index => {
      this.getleftdatas(index);
    });
  },
  methods:{
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
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 60px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 180px;
}
.sidebar > ul {
  height: 100%;
}
a {
  text-decoration: none;
}
/* menu下划线？ */
.el-menu .el-submenu {
  border: none;
  border-bottom: solid 1px #e4e7ed;
}
.el-submenu__title {
  font-size: 12px;
}

.el-menu .el-menu-item {
  font-size: 12px;
}
</style>
