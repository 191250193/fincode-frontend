import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    isLogin: false,
    rangeDateBegin: '2021-07-28',
    rangeDateEnd: '2022-04-28'
  },
  mutations: {
    usernameSetter(state, payload) {
      state.username = payload.username
    },
    isLoginSetter(state, payload) {
      state.isLogin = payload.isLogin
    },
    rangeDateBeginSetter(state, begin) {
      state.rangeDateBegin = begin
    },
    rangeDateEndSetter(state, end) {
      state.rangeDateEnd = end
    }
  },
  actions: {
  },
  modules: {
  }
})
