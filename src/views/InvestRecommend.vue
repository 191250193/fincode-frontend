<template>
  <div class="invest-recommend">
    <div class="invest-recommend__header">
      <div class="page-title">
        <span>投资推荐</span>
        <div class="page-subtitle">基于全股票全策略的全局数据进行投资新股的推荐</div>
      </div>
    </div>
    <div class="invest-recommend__main">
      <a-table
        :row-key="d => 'ir' + d.id"
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
        <a-table-column align="center" title="上市日期">
          <template slot-scope="text, record">
            <span>{{ longTimeStrFormat(record.listDate) }}</span>
          </template>
        </a-table-column>
        <a-table-column align="center" title="所属行业">
          <template slot-scope="text, record">
            <span>{{ record.industryName ? record.industryName : '无' }}</span>
          </template>
        </a-table-column>
        <!-- <a-table-column align="center" title="涨跌幅">
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
        <a-table-column align="center" title="成交额" data-index="amount" /> -->
        <a-table-column align="center" title="操作建议">
          <template slot-scope="text, record">
            <span>{{ handleType(record.type) }}</span>
          </template>
        </a-table-column>
        <a-table-column align="center" title="综合收益指数">
          <template slot-scope="text, record">
            <span>{{ record.returnIndex.toFixed(3) }}</span>
          </template>
        </a-table-column>
      </a-table>
    </div>
    <div class="invest-recommend__footer flex-center">
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
import { getInvestRecommend } from '@/api/invest-recommend/invest-recommend'
import { longTimeStrFormat } from '@/utils/format'

export default {
  data() {
    return {
      stockData: [],
      stockDataLoading: false,
      pageNum: 1,
      pageSize: 8,
      totalPages: 10
    }
  },
  methods: {
    longTimeStrFormat,
    mockStockData(idx) {
      return {
        id: idx,
        code: '-',
        name: '-',
        listDate: '20200101',
        close: 0,
        open: 0,
        high: 0,
        low: 0,
        industryId: 0,
        industryName: '',
        returnIndex: 0
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
    // 将后台返回值转换为表格所需数据格式
    investRecommendInfoMapper(sri) {
      return {
        id: sri.stockDetail.stock_id,
        code: sri.stockDetail.ts_code,
        name: sri.stockDetail.name,
        listDate: sri.stockDetail.list_date,
        close: sri.stockPrice ? sri.stockPrice.close : '当日无',
        open: sri.stockPrice ? sri.stockPrice.open : '当日无',
        high: sri.stockPrice ? sri.stockPrice.high : '当日无',
        low: sri.stockPrice ? sri.stockPrice.low : '当日无',
        industryId: sri.industry.id,
        industryName: sri.industry.name,
        type: sri.stockTipDaily ? sri.stockTipDaily.type : '',
        returnIndex: sri.stockTipOverall ? sri.stockTipOverall.return_index : 0
      }
    },
    updateStockData() {
      this.stockDataLoading = true
      getInvestRecommend(this.pageNum, this.pageSize)
        .then(res => {
          console.log(res)
          this.stockData = res.data.map(sri => this.investRecommendInfoMapper(sri))
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
    },
    handleType(type) {
      if (type === 'buy') {
        return '买入'
      } else if (type === 'sell') {
        return '卖出'
      } else {
        return '观望'
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
.page-title {
  display: flex;
  flex-direction: row;
  align-items: center;

  @h: 32px;

  &::before {
    width: (@h - 2px) / 4;
    height: (@h - 2px);
    background: rgba(0, 0, 0, 0.65);
    content: '';
    margin-right: 8px;
  }

  span {
    height: @h;
    line-height: @h;
    font-weight: 600;
    font-size: 20px;
    margin-right: 12px;
  }

  .page-subtitle {
    font-size: 14px;
    color: rgba(0,0,0,.45);
    margin-top: 4px;
  }
}
.invest-recommend {
  &__header {
    margin-bottom: 1rem;
  }
  &__main {
    margin-bottom: 1rem;
    table {
      border: 1px solid #e8e8e8;
    }
  }
}
</style>
