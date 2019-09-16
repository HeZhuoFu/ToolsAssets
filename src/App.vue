<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";

export default {
  name: "app",
  // 提供reload方法
  provide: function() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  created() {
    // 刷新后vuex数据不会被清除
    // if (localStorage.eleToken) {
    //   const decode = jwt_decode(localStorage.eleToken);
    //   this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decode));
    //   this.$store.dispatch("setUser", decode);
    // }
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    },
    // 刷新方法
    reload: function() {
      this.isRouterAlive = false;
      // 该方法会在dom更新后执行
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>


<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
