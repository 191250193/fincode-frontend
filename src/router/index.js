import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '../store/index'
import { getStorage } from '../utils/storage'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

// 解决路由重复问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = 'FinCode | ' + to.meta.title
  }
  window.scrollTo(0, 0)
  getStorage(store)
  next()
})

export default router
