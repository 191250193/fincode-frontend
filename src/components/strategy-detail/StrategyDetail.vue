<template>
  <a-row  type="flex" justify="start" class="strategy-detail">
    <a-col :span="24" class="strategy-title">
      策略详情
    </a-col>
    <a-col :span="4" >
      <a-col :span="24" class="strategy-detail-title">
        策略名称
      </a-col>
      <a-col :span="24" class="strategy-detail-value">
        {{strategy.name}}
      </a-col>
    </a-col>
<!--    <a-col :span="3" >-->
<!--      <a-col :span="24" class="strategy-detail-title">-->
<!--        适用股票数-->
<!--      </a-col>-->
<!--      <a-col :span="24" class="strategy-detail-value">-->
<!--        {{strategy.MatchCnt}} 支-->
<!--      </a-col>-->
<!--    </a-col>-->
<!--    <a-col :span="3" >-->
<!--      <a-col :span="24" class="strategy-detail-title">-->
<!--        盈利股票数-->
<!--      </a-col>-->
<!--      <a-col :span="24" class="strategy-detail-value">-->
<!--        {{strategy.ProfitCnt}} 支-->
<!--      </a-col>-->
<!--    </a-col>-->
    <a-col :span="4" >
      <a-col :span="24" class="strategy-detail-title">
        策略类型
      </a-col>
      <a-col :span="24" class="strategy-detail-value">
        {{type}}
      </a-col>
    </a-col>
  </a-row>
</template>

<script>
import { getDetail } from '@/api/strategy-detail/strategy-detail'
export default {
  props: [],
  data() {
    return {
      strategy: {},
      type: '买入型'
    }
  },
  methods: {
    getStrategyDetail() {
      getDetail(this.$route.params.strategyId)
        .then(res => {
          // console.log(this.$route.params.strategyId)
          // console.log(res)
          this.strategy = res.data
          if (this.strategy.type === 'sell') {
            this.type = '卖出型'
          }
          // console.log(this.strategy.name)
        })
    }
  },
  mounted() {
    this.getStrategyDetail()
  },
  watch: {
    $route: {
      handler() {
        this.getStrategyDetail()
      },
      deep: true
    }
  }
}
</script>

<style lang="less">
@import "../../assets/default.less";
.strategy-title {
  font-weight: bold;
  font-size: 28px;
  margin-bottom: 10px;
}
.strategy-detail {
  width: 98%;
  margin: 1%;
}
.strategy-detail-name {
  color: @theme-color;
  padding: 2px;
  font-size: 22px;
}
.strategy-detail-enname {
  color: @checked-color;
  padding: 2px;
  font-size: 12px;
}
.strategy-detail-title {
  color: @theme-color;
  padding: 3px;
  font-size: 16px;
}
.strategy-detail-value {
  color: @checked-color;
  padding: 2px;
  font-size: 18px;
}
</style>
