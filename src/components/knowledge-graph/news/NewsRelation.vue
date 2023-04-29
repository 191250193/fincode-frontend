<template>
  <div class="search-result-card" style="overflow:auto">
    <a-spin v-if="loading"></a-spin>
    <div v-else v-for="(info,index) in infos" :key="index">
      <NewsRelationCard :info="info"></NewsRelationCard>
    </div>
  </div>
</template>

<script>
import { searchNewsRelation } from '@/api/knowledge-graph'
import NewsRelationCard from '@/components/knowledge-graph/news/NewsRelationCard'

export default {
  name: 'NewsRelation',
  components: { NewsRelationCard },
  props: {
    newsAmount: Number
  },
  watch: {
    newsAmount: function () {
      this.loading = true
      this.apiSearchNewsRelation()
    }
  },
  data() {
    return {
      loading: true,
      infos: []
    }
  },
  mounted() {
    this.apiSearchNewsRelation()
  },
  methods: {
    apiSearchNewsRelation() {
      searchNewsRelation(this.newsAmount).then(res => {
        this.loading = false
        this.infos = res.data
      })
    }
  }
}
</script>

<style scoped>

</style>
