<template>
  <a-row type="flex" justify='center' align="middle" class="strategy">
    <a-col :span="16">
      <strategy-detail />
    </a-col>
    <a-col :span="18">
      <div class="strategy-sider-divider"/>
      <strategy-rank />
    </a-col>
  </a-row>
</template>

<script>
import StrategyRank from '@/components/strategy-detail/StrategyRank'
import StrategyDetail from '@/components/strategy-detail/StrategyDetail'
export default {
  name: 'Strategy',
  components: {
    StrategyRank,
    StrategyDetail
  },
  methods: {}
}
</script>

<style lang="less">

.strategy-sider-divider {
  height: 0.5px;
  margin-bottom: 1rem;
  background-color: grey;
}
</style>
