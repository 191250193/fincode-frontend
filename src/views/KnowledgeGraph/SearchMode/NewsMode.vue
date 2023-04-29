<template>
  <div>
    <div class="search-input-wrapper">
      <a-input addonBefore="关联资讯数大于"
               addonAfter="的关联关系"
               style="width: 25vw;height:35px"
               v-model="newsAmount"
               @pressEnter="search"
      >
      </a-input>
      <a-button style="margin-left: 20px"
                type="primary"
                icon="search"
                @click="search"
      >搜索
      </a-button>
    </div>
    <div class="search-result-wrapper" v-if="showResult">
      <NewsRelation :news-amount="Number(newsAmount)"></NewsRelation>
    </div>
  </div>
</template>

<script>
import EventBus from '@/views/KnowledgeGraph/event-bus'
import { message } from 'ant-design-vue'
import NewsRelation from '@/components/knowledge-graph/news/NewsRelation'

export default {
  name: 'NewsMode',
  components: {
    NewsRelation
  },
  data() {
    return {
      showResult: false,
      newsAmount: ''
    }
  },
  methods: {
    search() {
      if (isNaN(Number(this.newsAmount))) {
        message.warning('请输入数字')
      } else {
        this.showResult = true
        EventBus.$emit('search', false)
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/default.less";
</style>
