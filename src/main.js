import Vue from 'vue'
import App from '@/App.vue'
import router from '@routes/router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from '@service/http'
import moment from 'moment';
import 'moment/locale/zh-cn'
import Message from "element-ui";

import api from "@api/api";

moment.locale('zh-cn');

Vue.use(ElementUI);

Vue.prototype.$axios = axios
Vue.prototype.$message = Message
Vue.prototype.$moment = moment
Vue.prototype.$api = api

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

