import Vue from 'vue'
import Router from 'vue-router'
import axios from '@service/http'
import api from "@api/api";

// 设置通用引用组件
const _import = (file, ) => require('@views/' + file + '.vue').default

Vue.use(Router)

//全局路由(无需嵌套)
const globalRoutes = [
  { path: '/register', component: _import('Register'), name: 'register', meta: { title: '注册页' } },
  { path: '/login', component: _import('Login'), name: 'login', meta: { title: '登录页' } },
  { path: '/', redirect: '/Home' }
]

//主入口路由(需嵌套整体布局页面)
const mainRoutes = {
  path: '/', component: _import('Index'), name: 'index', children: []
}

//实例化
const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  isAdd: false, //是否已经添加动态(菜单)路由
  routes: globalRoutes.concat(mainRoutes)
})

// 动态加载菜单路由
router.beforeEach((to, from, next) => { //添加动态(菜单)路由

  if (router.options.isAdd || isGlobalRoutes(to)) {//判断是否已经添加动态路由,或者当前为全局路由的时候。 直接访问
    next()
  } else {
    api.mid_gform.getbypage(1, 100, '', '', '', '', '', '').then(res => {

      var datas = res.data.rows;

      localStorage.setItem("eleRouter", JSON.stringify(datas || '[]')); //存储动态路由到ls

      addDynamicMenu(datas)
      next({ ...to, replace: true })
    })

  }
})

//判断当前是否全局路由
function isGlobalRoutes(to) {
  for (let i in globalRoutes) {
    if (globalRoutes[i].path == to.path) {
      return true;
    }
  }
  return false;
}

//添加动态(菜单)路， 参数menu：菜单列表
function addDynamicMenu(menu = []) {

  var routes = [];

  // 添加路由
  routes.push({ name: 'home', path: '/home', component: _import('Home'), name: 'home', meta: { title: '工作台' } });
  routes.push({ name: '404', path: '/404', component: _import('404'), name: '404', meta: { title: '未知页' } });
  // routes.push({ path: '/', redirect: '/home'});

  for (let i in menu) {
    var route = {
      name: menu[i].formid,
      path: '/' + menu[i].moduleid + '/' + menu[i].formid,
      component: _import(menu[i].moduleid + '/' + menu[i].progformname)
    }

    routes.push(route)
  }

  mainRoutes.children = routes
  router.addRoutes([//vue-routers2.2版本以上才支持。
    mainRoutes,
    { path: '*', redirect: { name: '404' }, }
  ])
  router.options.isAdd = true
}

export default router