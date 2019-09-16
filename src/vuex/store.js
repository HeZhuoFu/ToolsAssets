// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

// const types = {
//   SET_IS_AUTNENTIATED: 'SET_IS_AUTNENTIATED',  //是否认证通过
//   SET_USER: 'SET_USER', // 用户信息
//   SET_MENU: 'SET_MENU', // 菜单信息
// }

// const state = { // 需要维护的状态
//   isAutnenticated: false, // 是否认证
//   user: {}, //存储用户信息
//   menu: {},  //存储菜单信息
// }

// const getters = {
//   isAutnenticated: state => state.isAutnenticated,
//   user: state => state.user,
//   menu: state => state.menu,
// }

// const mutations = {
//   [types.SET_IS_AUTNENTIATED](state, isAutnenticated) {
//     if (isAutnenticated)
//       state.isAutnenticated = isAutnenticated
//     else
//       state.isAutnenticated = false
//   },
//   [types.SET_USER](state, user) {
//     if (user)
//       state.user = user
//     else
//       state.user = {}
//   },
//   [types.SET_MENU](state, menu) {
//     if (menu)
//       state.menu = menu
//     else
//       state.menu = {}
//   }
// }

// const actions = {
//   setIsAutnenticated: ({ commit }, isAutnenticated) => {
//     commit(types.SET_IS_AUTNENTIATED, isAutnenticated)
//   },
//   setUser: ({ commit }, user) => {
//     commit(types.SET_USER, user)
//   },
//   setMenu: ({ commit }, menu) => {
//     commit(types.SET_MENU, menu)
//   },
//   clearCurrentState: ({ commit }) => {
//     commit(types.SET_IS_AUTNENTIATED, false)
//     commit(types.SET_USER, null)
//     commit(types.SET_MENU, null)
//   }
// }

// export default new Vuex.Store({
//   state,
//   getters,
//   mutations,
//   actions
// })
