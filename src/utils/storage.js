/**
 * 把sessionStorage的内容存到vuex
 * 因为刷新会导致vuex清空，所以在全局路由钩子函数里调用了这个函数来恢复vuex
 * @param {*} store
 */
export const getStorage = (store) => {
  const isLogin = JSON.parse(sessionStorage.getItem('isLogin'))
  const usernameStored = sessionStorage.getItem('username')
  const username = usernameStored === null ? '' : usernameStored

  store.commit('isLoginSetter', {
    isLogin: isLogin
  })

  store.commit('usernameSetter', {
    username: username
  })
}
