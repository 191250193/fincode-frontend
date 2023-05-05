<template>
  <a-row class="background">
    <a-layout class="background-layout">
      <a-layout-sider theme="light" width="350px">
        <a-row
          type="flex"
          justify="center"
          align="middle"
          class="strategy-sider-upper"
        >
          <a-row type="flex" justify="space-between">
            <div class="strategy-sider-upper-title">
              当前股票池组合
              <a-auto-complete
                backfill
                placeholder="添加请输入股票代码/名称"
                @select="addToStockPool"
                @search="searchStock"
                :dataSource="dataSource"
              >
                <template slot="dataSource">
                  <a-select-option
                    v-for="item in dataSource"
                    :key="item.id + '-' + item.tsCode"
                    :title="item.name"
                  >
                    {{ item.tsCode }} {{ item.name }}
                  </a-select-option>
                </template>
              </a-auto-complete>
            </div>
          </a-row>
        </a-row>
        <div class="strategy-sider-divider" />
        <div class="strategy-sider-lower">
          <StockDetailForPool :stock="stockDetail" v-for="(item, key) in poolId" :key="key" :id="item" @deleteStock="deleteStockFromPool"/>
        </div>
      </a-layout-sider>
      <a-layout-content class="stock-content">
        <k-line
          :kData="kData"
          :buyPoints="buyPoints"
          :sellPoints="sellPoints"
        />
        <k-line
          :kData="kData"
          :buyPoints="buyPoints"
          :sellPoints="sellPoints"
        />
      </a-layout-content>
      <a-layout-content class="stock-content">
        <k-line
          :kData="kData"
          :buyPoints="buyPoints"
          :sellPoints="sellPoints"
        />
        <k-line
          :kData="kData"
          :buyPoints="buyPoints"
          :sellPoints="sellPoints"
        />
      </a-layout-content>
    </a-layout>
  </a-row>
</template>

<script>
// import StrategyCheckbox from '@/components/stock-tip/StrategyCheckbox.vue'
import { followStock, search } from '@/api/stock'
import { Select } from 'ant-design-vue'
import StockDetailForPool from '@/components/stock-tip/StockDetailForPool.vue'
import StockDetail from '@/components/stock-tip/StockDetail.vue'
import KLineChart from '@/components/KLineChart.vue'
import {
  listOverallById,
  listTipById,
  listPriceById
} from '@/api/stock-tip/stock-tip'
import moment from 'moment'
import SearchFollowStock from '@/components/SearchFollowStock'

export default {
  name: 'StockTip',
  components: {
    ASelectOption: Select.Option,
    StockDetailForPool,
    'k-line': KLineChart
  },
  data() {
    return {
      stockId: 0,
      stockDetail: {},
      kData: [],
      buyPoints: [],
      sellPoints: [],
      curComProfit: '- -%',
      curComMatch: '- -%',
      strategyList: [],
      checkedStrategyIds: [0, 4],
      allStrategyIds: [],
      refreshStrategy: false,
      dataSource: [],
      poolId2: [1597, 1820],
      poolId: []
    }
  },
  methods: {
    deleteStockFromPool(id) {
      var tempArr = this.poolId.filter(item => item !== id)
      this.poolId = tempArr
      console.log('test', id, tempArr)
    },
    searchStock(value) {
      search(value).then(res => {
        if (res.code === 0) {
          this.dataSource = res.data.slice(0, 10).map(stock => {
            return {
              id: stock.id.toString(),
              name: stock.name,
              tsCode: stock.tsCode
            }
          })
        }
      })
    },
    addToStockPool(value) {
      const info = value.split('-')
      this.poolId.push(info[0])
      console.log(this.poolId)
    },
    getStrategyOverall() {
      listOverallById(this.stockId).then(res => {
        // console.log(res)
        this.strategyList = res.data
        // console.log(this.strategyList)
        // console.log(this.strategyList[0])
        // console.log(this.strategyList[0].strategyId)
        // console.log(this.strategyList[0].StrategyId)
        var idList = []
        for (var i = 0; i < this.strategyList.length; i++) {
          idList.push(this.strategyList[i].strategyId)
        }
        this.allStrategyIds = idList
      })
    },
    getStrategyTips() {
      if (this.checkedStrategyIds.length === 0) {
        this.buyPoints = []
        this.sellPoints = []
        this.curComMatch = '- -%'
        this.curComProfit = '- -%'
        return
      }
      this.refreshStrategy = true
      listTipById(this.stockId, this.checkedStrategyIds).then(res => {
        // console.log(res)
        var buyList = []
        var sellList = []
        setTimeout(() => {
          this.refreshStrategy = false
        }, 1000)
        if (res.data.tipList === null || res.data.tipList.length === 0) {
          this.buyPoints = []
          this.sellPoints = []
          this.curComMatch = '- -%'
          this.curComProfit = '- -%'
          return
        }
        for (var i = 0; i < res.data.tipList.length; i++) {
          const item = res.data.tipList[i]
          const date = this.convertDate(item.tradeDate)
          if (item.type === 'buy') {
            buyList.push(date)
          } else {
            sellList.push(date)
          }
        }
        this.buyPoints = buyList
        this.sellPoints = sellList
        this.curComMatch = (res.data.matchRate * 100).toFixed(1) + '%'
        this.curComProfit = (res.data.profitRate * 100).toFixed() + '%'
      })
    },
    getStockPrice() {
      const endDate = moment().format('yyyy-MM-DD')
      listPriceById(this.stockId, endDate, 1200).then(res => {
        // console.log(endDate)
        // console.log(res)
        const stockData = res.data.map(sri => this.priceMapper(sri))
        // console.log(stockData)
        // 先渲染首屏数据
        this.kData = stockData
        // // 再渲染全部剩余数据
        // setTimeout(() => {
        //   this.kData = stockData.slice(0, 240).concat(this.kData)
        // }, 5000)
      })
    },
    isChecked(id) {
      return this.checkedStrategyIds.indexOf(id) >= 0
    },
    onCheck(id) {
      const index = this.checkedStrategyIds.indexOf(id)
      if (index >= 0) {
        this.checkedStrategyIds.splice(index, 1)
      } else {
        this.checkedStrategyIds.push(id)
      }
      this.getStrategyTips()
    },
    checkAll() {
      if (this.checkedStrategyIds.length === this.allStrategyIds.length) {
        this.checkedStrategyIds = []
      } else {
        // 深拷贝
        var temp = []
        Object.assign(temp, this.allStrategyIds)
        this.checkedStrategyIds = temp
      }
      this.getStrategyTips()
    },
    convertDate(fromDate) {
      var toDate = ''
      fromDate = fromDate + ''
      if (fromDate.length !== 8) {
        return toDate
      }
      toDate += fromDate.substr(0, 4) + '-'
      toDate += fromDate.substr(4, 2) + '-'
      toDate += fromDate.substr(6, 2)
      return toDate
    },
    priceMapper(data) {
      return {
        date: this.convertDate(data.time),
        open: data.open,
        close: data.close,
        high: data.high,
        low: data.low,
        change: data.change,
        vol: data.vol,
        amount: data.amount
      }
    }
  },
  mounted() {
    this.stockId = this.$route.params.stockId
    // console.log(this.stockId)
    this.getStrategyOverall()
    this.getStockPrice()
    this.getStrategyTips()
  },
  watch: {
    $route: {
      handler() {
        this.stockId = this.$route.params.stockId
        this.getStrategyOverall()
        this.getStockPrice()
        this.getStrategyTips()
      },
      deep: true
    }
  }
}
</script>

<style lang="less">
@import "../assets/default.less";

.stock-content {
  background-color: @theme-color;
  height: 85vh;
  flex: 1;
  display: flex;
  flex-direction: column;

  .k-line-chart {
    width: 98%;
    flex: 1;
    margin-bottom: 1%;
  }
}
.strategy-button {
  font-size: 1rem;
  margin: 2px;
}
.strategy-button-row {
  width: 80%;
}
.strategy-sider-divider {
  height: 0.5vh;
  margin-right: 1rem;
  background-color: @checked-color;
}
.strategy-sider-upper {
  background-color: @theme-color;
  overflow: auto;
  height: 13vh;
  flex: 1;
  margin-right: 1rem;
  padding: 0.5rem;
}
.strategy-sider-lower {
  background-color: @theme-color;
  height: 71.5vh;
  flex: 1;
  margin-right: 1rem;
  overflow: auto;
}
.strategy-sider-upper-title {
  color: @checked-color;
  padding: 3px;
  text-align: center;
  font-size: 20px;
}
.stock-content-upper-title {
  color: @checked-color;
  padding: 20px 3px 20px 3px;
  text-align: center;
  font-size: 20px;
}
.strategy-sider-upper-value {
  color: @highlight-color;
  padding: 2px;
  text-align: center;
}
.strategy-sider-lower::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.strategy-sider-lower::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #033761;
}
.strategy-sider-lower::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: @theme-color;
}
</style>
