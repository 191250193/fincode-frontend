<template>
  <div style="margin-top: -15px">
    <SearchHeader />
    <div class="search-content">
      <!--TODO 文字替换成知识图谱图片，只拿一次，缓存在LocalStorage -->
      <div class="search-bg" v-if="showBg">
        <Graph></Graph>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SearchHeader from '@/components/knowledge-graph/SearchHeader'
import EventBus from '@/views/KnowledgeGraph/event-bus'
import Graph from '@/components/knowledge-graph/components/Graph'

export default {
  name: 'KnowledgeGraph',
  components: {
    Graph,
    SearchHeader
  },
  data() {
    return {
      showBg: true
    }
  },
  created() {
    EventBus.$on('search', val => {
      this.showBg = val
    })
  }
}
</script>

<style scoped lang="less">
@import "../../assets/default.less";

.search-content {

}

.search-bg {
  position: fixed;
  top: 220px;
  left: 10vw;
  height: 50vh;
}
</style>
