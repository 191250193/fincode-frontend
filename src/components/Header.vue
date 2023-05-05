<template>
  <div>
    <a-layout-header
      class="app-layout__header"
      :style="{ position: 'fixed', zIndex: 1, width: '100%' }"
    >
      <div class="logo">FINCODE</div>
      <a-menu v-model="curMenu" theme="dark" mode="horizontal" @click="menuNav">
        <a-menu-item key="sr">股票排行</a-menu-item>
        <a-menu-item key="ir">投资推荐</a-menu-item>
        <!--        <a-menu-item key="kg">知识图谱</a-menu-item>-->
      </a-menu>
      <!-- <a-input-search class="search" placeholder="请输入股票代码/名称" /> -->
      <SearchInput class="search"></SearchInput>

      <div class="user-menu">
        <a-button v-if="!hasLogin" type="link" @click="loginOrRegister"
          >登录/注册
        </a-button>
        <div v-else>
          <a-dropdown class="drop-down" :trigger="['click']">
            <span @click="e => e.preventDefault()">
              {{ username }} <a-icon type="down" />
            </span>
            <a-menu slot="overlay">
              <a-menu-item @click="toPersonalCenter">个人中心</a-menu-item>
              <a-menu-item @click="jumpToRiskReport">风险报告</a-menu-item>
              <a-menu-item @click="signout">登出</a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </div>
    </a-layout-header>
    <Login
      :visibility="loginVisibility"
      :onFinish="loginOrRegisterSuccessfully"
    />
  </div>
</template>

<script>
import Login from '@/components/Login.vue'
import SearchInput from '@/components/SearchInput'

export default {
  components: {
    Login,
    SearchInput
  },

  computed: {
    username() {
      return this.$store.state.username
    },
    hasLogin() {
      return this.$store.state.isLogin
    }
  },

  created() {
    console.log(document.cookie)
  },

  data() {
    return {
      loginVisibility: false,
      curMenu: ['sr']
      // hasLogin: false
      // username: '用户A'
    }
  },
  methods: {
    loginOrRegister() {
      this.loginVisibility = true
    },

    /**
     * 登录（or注册）成功 / 失败 / 关闭登录注册窗口时调用
     * @param type 0:用户自行关闭窗口 1:成功 2:失败
     */
    loginOrRegisterSuccessfully() {
      this.loginVisibility = false
    },

    jumpToRiskReport() {
      this.$router.push({ path: '/riskreport' })
    },

    signout() {
      sessionStorage.removeItem('username')
      sessionStorage.removeItem('isLogin')
      this.$store.commit('usernameSetter', {
        username: ''
      })
      this.$store.commit('isLoginSetter', {
        isLogin: false
      })
    },

    menuNav(menuItem) {
      if (menuItem.key === 'sr') {
        this.$router.push({ path: '/' })
      } else if (menuItem.key === 'ir') {
        this.$router.push({ path: '/invest-recommend' })
      } else if (menuItem.key === 'kg') {
        this.$router.push({ path: '/knowledge-graph/stock' })
      }
    },
    // 个人中心
    toPersonalCenter() {
      this.$router.push({ path: '/personalcenter' })
      console.log('test')
    }
  },
  watch: {
    '$route.path'(newVal, oldVal) {
      if (newVal === '/') {
        this.curMenu = ['sr']
      } else if (newVal === '/invest-recommend') {
        this.curMenu = ['ir']
      } else if (newVal.startsWith('/knowledge-graph')) {
        this.curMenu = ['kg']
      } else {
        this.curMenu = []
      }
    }
  }
}
</script>

<style lang="less">
@import "../assets/default.less";

.app-layout .app-layout__header {
  padding-right: 50px - 15px;
}

.app-layout__header {
  .flex-center-row;

  .logo {
    margin-right: 80px;
    font-size: @logo-font-size;
    color: @highlight-color;
    letter-spacing: 1px;
    user-select: none;
  }

  .ant-menu {
    margin-left: auto;
    height: 100%;

    &-item {
      height: 100%;
      line-height: 64px;
      font-size: 1rem;
    }
  }

  .search {
    max-width: 240px;
    margin-left: auto;
  }

  .user-menu {
    margin-left: 20px;
    color: @font-color;

    .ant-btn {
      font-size: 16px;
    }
  }
}
</style>
