<template>
  <a-card class="search-result-card">
    <!--    基本信息-->
    <template slot="title">
      {{ companyId }}
      <span style="margin-left: 10px">{{ companyName }}</span>
      <a-tag v-if="!loading" color="#108ee9" style="margin-left: 20px">
        {{ basicInfo.industryName }}
      </a-tag>
    </template>
    <!--    数据加载-->
    <template v-if="loading">
      <a-spin></a-spin>
    </template>
    <!--    最新行情-->
    <a-descriptions v-else>
      <template slot="title">
        最新行情
        <a-tag color="blue" style="margin-left: 20px">{{ basicInfo.time }}</a-tag>
      </template>
      <a-description-item v-for="(item,index) in descriptions" :key="index" :label="item.label">
        {{ basicInfo[item.content] }}
        <span v-if="item.suffix">{{ item.suffix }}</span>
      </a-description-item>
    </a-descriptions>
    <!--    持股关系-->
    <a-descriptions title="持股关系" style="margin-top: 10px">
      <a-description-item></a-description-item>
    </a-descriptions>
    <StockHolderRelation :company-id="companyId"
                         style="margin-top: -40px"
    ></StockHolderRelation>
  </a-card>
</template>

<script>
import { getStockBasicInfoById } from '@/api/knowledge-graph'
import { Descriptions } from 'ant-design-vue'
import StockHolderRelation from '@/components/knowledge-graph/stock/StockHolderRelation'

export default {
  name: 'StockBasicInfo',
  props: {
    companyId: String,
    companyName: String
  },
  components: {
    ADescriptionItem: Descriptions.Item,
    StockHolderRelation
  },
  data() {
    const descriptions = [
      {
        label: '开盘价',
        content: 'open'
      },
      {
        label: '收盘价',
        content: 'close'
      },
      {
        label: '最高价',
        content: 'high'
      },
      {
        label: '最低价',
        content: 'low'
      },
      {
        label: '涨跌额',
        content: 'change'
      },
      {
        label: '涨跌幅',
        content: 'pct_chg'
      },
      {
        label: '成交量',
        content: 'vol',
        suffix: '手'
      },
      {
        label: '成交额',
        content: 'amount',
        suffix: '千元'
      }
    ]
    return {
      loading: true,
      descriptions,
      basicInfo: {
        industryName: 'industry name', // 所在行业
        // 以下为最新行情，数据在mysql里
        time: '', // 交易日期
        open: 0,
        high: 0,
        low: 0,
        close: 0,
        change: 0,
        pct_chg: 0,
        vol: 0,
        amount: 0
      }
    }
  },
  watch: {
    companyId: function (val) {
      this.loading = true
      this.apiGetStockBasicInfoById()
    }
  },
  mounted() {
    this.apiGetStockBasicInfoById()
  },

  methods: {
    apiGetStockBasicInfoById() {
      getStockBasicInfoById(this.companyId).then(res => {
        this.basicInfo = res.data
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
