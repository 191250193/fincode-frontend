<template>
  <div id="app">
    <a-layout class="app-layout">
      <Header />
      <a-layout-content class="app-layout__content" style="margin-top: 64px">
        <router-view />
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  components: {
    Header
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .app {
    &-layout {
      height: 100vh;
      &__content {
        padding: 4px 48px;
        padding-bottom: 24px;
      }
    }
  }
}
// 美化滚动条
::-webkit-scrollbar {
  background-color: #eee;
  width: 6px;
}

::-webkit-scrollbar-thumb {
  background-color: #aaa;
}
</style>
