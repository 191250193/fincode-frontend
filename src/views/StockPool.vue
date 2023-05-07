<template>
  <a-row class="background">
    <a-layout class="background-layout">
      <a-layout-sider theme="light" width="350px">
        <a-row
          type="flex"
          justify="center"
          align="middle"
          class="pool-sider-upper"
        >
          <a-row type="flex" justify="space-between">
            <div class="pool-sider-upper-title">
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
        <div class="pool-sider-divider" />
        <div class="pool-sider-lower">
          <StockDetailForPool :stock="stockDetail" v-for="(item, key) in poolId" :key="key" :id="item" @deleteStock="deleteStockFromPool"/>
        </div>
      </a-layout-sider>
      <a-layout-content class="pool-content">
        <!-- <k-line
          :kData="kData"
          :buyPoints="buyPoints"
          :sellPoints="sellPoints"
        /> -->
        <k-line1
          :kData="newKData[0]"
          :buyPoints=[]
          :sellPoints=[]
        />
        <k-line2
          :kData="newKData[1]"
          :buyPoints=[]
          :sellPoints=[]
        />
        <k-line3
          :kData="newKData[2]"
          :buyPoints=[]
          :sellPoints=[]
        />
        <k-line4
          :kData="newKData[3]"
          :buyPoints=[]
          :sellPoints=[]
        />
        <!-- <k-line
          v-for="(item, key) in newKData"
          :key="key"
          :kData="item"
          :buyPoints=[]
          :sellPoints=[]
        /> -->
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
import KLineChart1 from '@/components/MulKLineChart/KLineChart1.vue'
import KLineChart2 from '@/components/MulKLineChart/KLineChart2.vue'
import KLineChart3 from '@/components/MulKLineChart/KLineChart3.vue'
import KLineChart4 from '@/components/MulKLineChart/KLineChart4.vue'
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
    'k-line1': KLineChart1,
    'k-line2': KLineChart2,
    'k-line3': KLineChart3,
    'k-line4': KLineChart4
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
      poolId: [],
      newKData: []
    }
  },
  methods: {
    deleteStockFromPool(id) {
      var tempArr = this.poolId.filter(item => item !== id)
      this.poolId = tempArr
      this.kLineData()
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
      if (this.poolId.length < 4) {
        this.poolId.push(info[0])
      }
      // console.log(this.poolId)
      this.kLineData()
    },
    getStockPrice() {
      const endDate = moment().format('yyyy-MM-DD')
      listPriceById(this.stockId, endDate, 1200)
        .then(res => {
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
    getStrategyOverall() { // allStrategyIds
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
    getStrategyTips() { // buyPoints, sellPoints
      if (this.checkedStrategyIds.length === 0) {
        this.buyPoints = []
        this.sellPoints = []
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
      })
    },
    kLineData() {
      this.newKData = []
      var tempArr = this.poolId.map((id) => {
        // console.log('id:', id)
        const endDate = moment().format('yyyy-MM-DD')
        listPriceById(id, endDate, 1200).then(res => {
          const stockData = res.data.map(sri => this.priceMapper(sri))
          this.newKData.push(stockData)
        })
        console.log('newKData', this.newKData)
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

.pool-content {
  background-color: @theme-color;
  height: 85vh;
  // flex: 1;
  display: flex;
  flex-direction: column;

  .k-line-chart {
    width: 98%;
    flex: 1;
    margin-bottom: 1%;
  }
}
.pool-button {
  font-size: 1rem;
  margin: 2px;
}
.pool-button-row {
  width: 80%;
}
.pool-sider-divider {
  height: 0.5vh;
  margin-right: 1rem;
  background-color: @checked-color;
}
.pool-sider-upper {
  background-color: @theme-color;
  overflow: auto;
  height: 13vh;
  flex: 1;
  margin-right: 1rem;
  padding: 0.5rem;
}
.pool-sider-lower {
  background-color: @theme-color;
  height: 71.5vh;
  flex: 1;
  margin-right: 1rem;
  overflow: auto;
}
.pool-sider-upper-title {
  color: @checked-color;
  padding: 3px;
  text-align: center;
  font-size: 20px;
}
.pool-content-upper-title {
  color: @checked-color;
  padding: 20px 3px 20px 3px;
  text-align: center;
  font-size: 20px;
}
.pool-sider-upper-value {
  color: @highlight-color;
  padding: 2px;
  text-align: center;
}
.pool-sider-lower::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.pool-sider-lower::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #033761;
}
.pool-sider-lower::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: @theme-color;
}
</style>
