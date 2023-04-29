<template>
  <div class="stock-rank">
    <div class="stock-rank__header flex-center">
      <a-radio-group :default-value="curSortType" button-style="solid" size="large">
        <a-radio-button
          v-for="st of sortTypes"
          :key="'st' + st.value"
          button-style="solid"
          :value="st.value"
          @click="onSortTypeChange(st.value)"
          >{{ st.name }}</a-radio-button
        >
      </a-radio-group>
    </div>
    <div class="stock-rank__main">
      <a-table
        :row-key="d => 'sr' + d.id"
        :data-source="stockData"
        :loading="stockDataLoading"
        :pagination="false"
      >
        <a-table-column align="center" title="股票代码">
          <template slot-scope="text, record">
            <a-button type="link" @click="toStock(record.id, record.code)">{{
              record.code
            }}</a-button>
          </template>
        </a-table-column>
        <a-table-column align="center" title="股票名称">
          <template slot-scope="text, record">
            <a-button type="link" @click="toStock(record.id, record.code)">{{
              record.name
            }}</a-button>
          </template>
        </a-table-column>
        <a-table-column align="center" title="历史收益率" data-index="historyProfitRate" />
        <a-table-column align="center" title="历史匹配率" data-index="historyMatchRate" />
<!--        <a-table-column align="center" title="所在行业匹配率" data-index="industryMatchRate" />-->
        <a-table-column align="center" title="所属行业" data-index="industryName" />
      </a-table>
    </div>
    <div class="stock-rank__footer flex-center">
      <a-pagination
        v-model="pageNum"
        :page-size="pageSize"
        :total="totalPages * pageSize"
        @change="onPageChange"
      />
    </div>
  </div>
</template>

<script>
import { listMatchStock, getDetail } from '@/api/strategy-detail/strategy-detail'

export default {
  data() {
    return {
      sortTypes: [
        { value: 'profit', name: '历史收益率排序' },
        { value: 'match', name: '历史匹配率排序' },
        { value: 'latest', name: '最新投资建议' }
      ],
      curSortType: 'match',
      stockData: [],
      stockDataLoading: false,
      pageNum: 1,
      pageSize: 5,
      totalPages: 50,
      strategyId: 0
    }
  },
  methods: {
    mockStockData(idx) {
      return {
        id: idx,
        code: '-',
        name: '-',
        close: 0,
        open: 0,
        high: 0,
        low: 0,
        pctChg: 0,
        vol: 0,
        amount: 0,
        change: 0,
        industryId: 0,
        industryName: ''
      }
    },
    toStock(id, tsCode) {
      this.$router.push({
        path: '/stock',
        query: {
          id,
          tsCode
        }
      })
    },
    onSortTypeChange(val) {
      this.curSortType = val
      this.updateStockData()
    },
    // 将后台返回值转换为表格所需数据格式
    stockRankInfoMapper(sri) {
      console.log(sri)
      return {
        id: sri.stock_id,
        code: sri.stock_code,
        name: sri.stock_name,
        historyProfitRate: (sri.historyProfitRate * 100).toFixed(2) + '%',
        historyMatchRate: (sri.historyMatchRate * 100).toFixed(2) + '%',
        industryMatchRate: (sri.industryMatchRate * 100).toFixed(2) + '%',
        industryName: JSON.parse(sri.ext_info).industry_name
      }
    },
    updateStockData() {
      this.stockDataLoading = true
      listMatchStock(this.strategyId, this.pageNum, this.pageSize, this.curSortType)
        .then(res => {
          // console.log(res)
          this.stockData = res.data.map(sri => this.stockRankInfoMapper(sri))
          console.log(this.stockData)
          this.stockDataLoading = false
        })
        .catch(e => {
          this.stockDataLoading = false
        })
    },
    onPageChange() {
      this.updateStockData()
    },
    chgColor(pctChg) {
      if (pctChg > 0) {
        return 'color-rise'
      } else if (pctChg < 0) {
        return 'color-fall'
      } else {
        return ''
      }
    }
  },
  mounted() {
    this.strategyId = this.$route.params.strategyId
    // console.log(this.strategyId)
    // 预先填充数据，防止屏幕突然加长
    for (let i = 0; i < this.pageSize; i++) {
      this.stockData.push(this.mockStockData(i))
    }
    // console.log(this.stockData)
    this.updateStockData()
  },
  watch: {
    $route: {
      handler() {
        this.strategyId = this.$route.params.strategyId
        this.updateStockData()
      },
      deep: true
    }
  }
}
</script>

<style lang="less">
.stock-rank {
  &__header {
    margin-bottom: 1.5rem;
    .ant-radio-button-wrapper {
      padding: 0 20px;
    }
  }
  &__main {
    margin-bottom: 1rem;
    table {
      border: 1px solid #e8e8e8;
    }
  }
}
</style>
