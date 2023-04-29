<template>
  <div class="stock-rank">
    <div class="stock-rank__header flex-center">
      <a-radio-group :default-value="0" button-style="solid" size="large">
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
        <a-table-column align="center" title="昨日收盘" data-index="close" />
        <a-table-column align="center" title="昨日开盘" data-index="open" />
        <a-table-column align="center" title="昨日最高" data-index="high" />
        <a-table-column align="center" title="昨日最低" data-index="low" />
        <a-table-column align="center" title="涨跌幅">
          <template slot-scope="text, record">
            <span :class="chgColor(record.pctChg)">{{
              (record.pctChg).toFixed(2) + '%'
            }}</span>
          </template>
        </a-table-column>
        <a-table-column align="center" title="涨跌额" data-index="change">
          <template slot-scope="text, record">
            <span  :class="chgColor(record.change)">{{ (record.change).toFixed(2) }}</span>
          </template>
        </a-table-column>
        <a-table-column align="center" title="成交量" data-index="vol" />
        <a-table-column align="center" title="成交额" data-index="amount" />
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
import { getStockRank } from '@/api/invest-recommend/stock-rank'

export default {
  data() {
    return {
      sortTypes: [
        { value: 0, name: '涨幅榜' },
        { value: 1, name: '跌幅榜' },
        { value: 2, name: '成交量' },
        { value: 3, name: '成交额' }
      ],
      curSortType: 0,
      stockData: [],
      stockDataLoading: false,
      pageNum: 1,
      pageSize: 8,
      totalPages: 10
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
      // console.log(sri.stockDetailPO)
      return {
        // id: sri.StockDetail.stockId,
        // code: sri.StockDetail.tsCode,
        // name: sri.StockDetail.name,
        // close: sri.StockPrice.close,
        // open: sri.StockPrice.open,
        // high: sri.StockPrice.high,
        // low: sri.StockPrice.low,
        // pctChg: sri.StockPrice.pctChg,
        // vol: sri.StockPrice.vol,
        // amount: sri.StockPrice.amount,
        // change: sri.StockPrice.change,
        // industryId: sri.Industry.id,
        // industryName: sri.Industry.name
        id: sri.stockDetailPO.stock_id,
        code: sri.stockDetailPO.ts_code,
        name: sri.stockDetailPO.name,
        close: sri.stockPricePO.close,
        open: sri.stockPricePO.open,
        high: sri.stockPricePO.high,
        low: sri.stockPricePO.low,
        pctChg: sri.stockPricePO.pct_chg,
        vol: sri.stockPricePO.vol,
        amount: sri.stockPricePO.amount,
        change: sri.stockPricePO.change,
        industryId: sri.industryPO.id,
        industryName: sri.industryPO.name
      }
    },
    updateStockData() {
      this.stockDataLoading = true
      getStockRank(this.curSortType, this.pageNum, this.pageSize)
        .then(res => {
          // console.log(res)
          this.stockData = res.data.map(sri => this.stockRankInfoMapper(sri))
          // console.log(this.stockData)
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
    // 预先填充数据，防止屏幕突然加长
    for (let i = 0; i < this.pageSize; i++) {
      this.stockData.push(this.mockStockData(i))
    }
    this.updateStockData()
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
