<template>
  <div class="search-header">
    <a-menu v-model="currentSearchMode"
            mode="horizontal"
            @click="changeSearchMode"
            style="background: transparent; border: 0">
      <a-menu-item v-for="mode in searchMode" :key="mode">{{ searchConf[mode].name }}</a-menu-item>
    </a-menu>
  </div>
</template>

<script>
import { SEARCH_MODE, SEARCH_CONF } from './enum/search-mode'
import EventBus from '@/views/KnowledgeGraph/event-bus'

export default {
  name: 'SearchHeader',
  components: {},
  computed: {},
  data() {
    return {
      searchMode: SEARCH_MODE,
      searchConf: SEARCH_CONF,
      currentSearchMode: []
    }
  },
  mounted() {
    const pathSplit = this.$route.path.split('/')
    this.currentSearchMode = pathSplit.length === 3 ? [pathSplit[2].toUpperCase()] : [SEARCH_MODE[0]]
  },
  methods: {
    changeSearchMode(selectSearchMode) {
      this.currentSearchMode = [selectSearchMode]
      this.$router.push({ path: this.searchConf[this.currentSearchMode[0].key].path })
      EventBus.$emit('search', true)
    }

  }
}
</script>

<style scoped lang="less">
@import "../../assets/default.less";

.search-header {
  text-align: center;
  height: @search-header-height;
}
</style>
