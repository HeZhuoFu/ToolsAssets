<!-- 工具栏按钮组件 -->
<template>

  <div v-if="docstatus==100">
    <img src="@assets/已确认.png" style="position:absolute;right:5%; top:90px;" />
  </div>

  <div v-else-if="docstatus==0">
    <img src="@assets/处理中.png" style="position:absolute;right:5%; top:90px;" />
  </div>

  <div v-else-if="docstatus >= 50">
    <img src="@assets/处理中.png" style="position:absolute;right:5%; top:90px;" />
  </div>

  <div v-else-if="docstatus == -1">
    <img src="@assets/已作废.png" style="position:absolute;right:5%; top:90px;" />
  </div>
</template>

<script>
export default {
  // 名称
  name: "docstatusimg",

  // 数据
  data() {
    return {
      actiondata: [] //按钮数据集
    };
  },

  // 计算属性
  computed: {},

  //创建完成
  created() {},

  // 装载完成
  mounted() {},

  // 传递参数
  props: {
    docstatus: Number
  },

  // 操作方法
  methods: {}
};
</script>

<style scoped />;
