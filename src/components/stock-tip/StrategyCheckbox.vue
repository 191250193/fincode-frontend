<template>
  <div  @click="onCheckRow"  class="strategy-checkbox">
    <a-row>
      <a-col :span="20" class="strategy-checkbox-title">
        <a-row type="flex" justify='space-around' align="middle">
          {{strategyData.name}}
          <a-button size="small" type="link" class="detail-button" @click="toStrategy">
            详情
          </a-button>
          <a-divider type="vertical" />
          <div :class="suggestionClass">{{suggestionText}}</div>
        </a-row>
      </a-col>
      <a-col :span="4" class="strategy-checkbox-check">
        <a-row type="flex" justify='end' align="middle">
          <a-checkbox :checked="checked"/>
        </a-row>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24" class="strategy-checkbox-value" align="start" style="color: #3597e7">
        当前区间：{{dates[0]}} ~ {{dates[1]}}
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="12" class="strategy-checkbox-value" align="start">
        区间日均收益率 {{ periodProfitRate }}%
      </a-col>
      <a-col :span="12" class="strategy-checkbox-value" align="end">
        区间匹配命中率 {{ periodMatchRate }}%
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="12" class="strategy-checkbox-value" align="start">
        历史日均收益率 {{strategyData.profitRate}}%
      </a-col>
      <a-col :span="12" class="strategy-checkbox-value" align="end">
        历史匹配命中率 {{strategyData.matchRate}}%
      </a-col>
    </a-row>
    <a-row v-show="checked">
      <a-col :span="12" class="strategy-checkbox-extra" >
        <a-col :span="24" class="strategy-checkbox-extra-title">
          止盈率
        </a-col>
        <a-col :span="24" class="strategy-checkbox-extra-value">
          12%
        </a-col>
      </a-col>
      <a-col :span="12" class="strategy-checkbox-extra">
        <a-col :span="24" class="strategy-checkbox-extra-title">
          止损率
        </a-col>
        <a-col :span="24" class="strategy-checkbox-extra-value">
          10%
        </a-col>
      </a-col>
<!--      <a-col :span="12" class="strategy-checkbox-extra">-->
<!--        <a-col :span="24" class="strategy-checkbox-extra-title">-->
<!--          当前行业匹配率-->
<!--        </a-col>-->
<!--        <a-col :span="24" class="strategy-checkbox-extra-value">-->
<!--          {{strategyData.industryMatchRate}}%-->
<!--        </a-col>-->
<!--      </a-col>-->
    </a-row>
  </div>
</template>

<script>
import { calPeriodRate } from '@/api/stock-tip/stock-tip'

export default {
  props: ['strategy', 'checked', 'onCheck'],
  data() {
    return {
      strategyData: {},
      suggestionClass: 'suggestion suggestion-0',
      suggestionText: '建议观望',
      periodProfitRate: 0.0,
      periodMatchRate: 0.0
    }
  },
  computed: {
    dates() {
      return [this.$store.state.rangeDateBegin, this.$store.state.rangeDateEnd]
    }
  },
  watch: {
    dates: function () {
      calPeriodRate(this.strategy.stockId, this.strategy.strategyId, this.dates[0], this.dates[1])
        .then(res => {
          this.periodProfitRate = Number(res.data.profitRate * 100).toFixed(1)
          this.periodMatchRate = Number(res.data.matchRate * 100).toFixed(1)
        })
    }
  },
  methods: {
    onCheckRow() {
      this.onCheck(this.strategy.strategyId)
    },
    toStrategy() {
      this.$router.push({
        path: '/strategy/' + this.strategy.strategyId
      })
    }
  },
  mounted() {
    this.strategyData = {
      name: this.strategy.strategyName,
      profitRate: Number(this.strategy.historyProfitRate * 100).toFixed(),
      matchRate: Number(this.strategy.historyMatchRate * 100).toFixed()
      // industryMatchRate: Number(this.strategy.IndustryMatchRate * 100).toFixed()
    }
    if (this.strategy.latestTip === 'buy') {
      this.suggestionClass = 'suggestion suggestion-1'
      this.suggestionText = '建议买入'
    }
    if (this.strategy.latestTip === 'sell') {
      this.suggestionClass = 'suggestion suggestion-2'
      this.suggestionText = '建议卖出'
    }
  }
}
</script>

<style lang="less">
@import "../../assets/default.less";
.strategy-checkbox {
  color: @highlight-color;
  background-color: @theme-color-deep;
  margin-bottom: 3px;
  width: 96%;
  margin: 2%;
  border-radius: 5px;
  padding: 8px;
  flex: 1;
  cursor: pointer;
}
.strategy-checkbox-left {
  width: 92%
}
.strategy-checkbox-right {
  width: 7%;
  margin-left: 1%;
}
.strategy-checkbox-right-button {
  font-size: 6px;
}
.strategy-checkbox-title {
  color: @highlight-color;
  padding: 3px;
}
.strategy-checkbox-check {
  padding: 4px;
}
.strategy-checkbox-value {
  font-size: 13px;
  font-weight: 300;
  color: @highlight-color;
  padding: 2px 2px 2px 5px;
}
.strategy-checkbox-extra-title {
  color: @checked-color;
  padding: 3px;
  text-align: center;
}
.strategy-checkbox-extra-value {
  color: @highlight-color;
  padding: 2px;
  text-align: center;
}
.detail-button {
  margin-left: 6px;
}
.suggestion {
  margin-left: 12px;

  font-size: 12px;
  font-weight: 300;
  line-height: 20px;

  border: 1px solid #d9d9d9;
  border-radius: 4px;
  box-sizing: border-box;
  width: fit-content;
  padding: 0 7px;

  &-1 {
    color: #f5222d;
    border-color: #f5222d;
  }
  &-2 {
    color: #52c41a;
    border-color: #52c41a;
  }
}
</style>
