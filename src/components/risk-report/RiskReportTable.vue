<template>
  <a-table :columns="columns" :data-source="tabledata" @expand="loadCharts" :loading="loading">
    <a slot="action" slot-scope="record" @click="unfollowCurrentStock(record.id)">取消关注</a>
    <div slot="expandedRowRender" slot-scope="record" style="margin: 0">
      <a-row v-if="record.report !== null">
        <a-col :span="8" :offset="3">
          <risk-report-pie-chart :tips="getPieChartTip(record)" :idx="record.key" />
        </a-col>
        <a-col :span="6" :offset="3">
          <div>综合提示：{{ record.action }}</div>
          <div
            v-for="strategy in record.report"
            :key="strategy.id"
          >
            <span>{{ strategy.name }}：{{ strategy.tip }}</span>
          </div>
        </a-col>
      </a-row>
      <a-row v-else>今日暂无策略给出提示，建议保持观望</a-row>
    </div>
  </a-table>
</template>

<script>
// import echarts from '@/plugins/echarts'
import RiskReportPieChart from '@/components/risk-report/RiskReportPieChart.vue'
import { getFollowedStocks, unfollowStock } from '@/api/risk-report.js'

const columns = [
  { title: '股票代码', dataIndex: 'code', key: 'code' },
  { title: '股票名称', dataIndex: 'name', key: 'name' },
  { title: '今日操作提示', dataIndex: 'action', key: 'action' },
  // { title: '收益率', dataIndex: 'profit', key: 'profit' },
  // { title: '今日涨幅', dataIndex: 'increase', key: 'increase' },
  // { title: '交易量', dataIndex: 'volume', key: 'volume' },
  {
    title: '取消关注',
    dataIndex: '',
    key: 'x',
    scopedSlots: { customRender: 'action' }
  }
]

// const data = [
//   {
//     key: 1,
//     code: 100001,
//     name: '一支股票',
//     action: '买',
//     profit: '1.00',
//     increase: '1.00',
//     volume: '10000',
//     report: {
//       strategies: [
//         {
//           id: 1,
//           name: '策略1',
//           matching: '0.15',
//           profit: '0.35',
//           tip: '买'
//         },
//         {
//           id: 2,
//           name: '策略2',
//           matching: '0.05',
//           profit: '0.15',
//           tip: '卖'
//         },
//         {
//           id: 3,
//           name: '策略3',
//           matching: '0.55',
//           profit: '0.55',
//           tip: '买'
//         }
//       ]
//     }
//   },
//   {
//     key: 2,
//     code: 100002,
//     name: '一支股票',
//     action: '卖',
//     profit: '1.00',
//     increase: '1.00',
//     volume: '10000',
//     report: {
//       strategies: [
//         {
//           id: 1,
//           name: '策略1',
//           matching: '0.15',
//           profit: '0.35',
//           tip: '买'
//         },
//         {
//           id: 2,
//           name: '策略2',
//           matching: '0.05',
//           profit: '0.15',
//           tip: '卖'
//         },
//         {
//           id: 3,
//           name: '策略3',
//           matching: '0.55',
//           profit: '0.55',
//           tip: '买'
//         }
//       ]
//     }
//   }
// ]

const mockTip = [
  { value: 3, name: 'buy', test: ['1', '2', '3'] },
  { value: 2, name: 'sell', test: ['4', '5'] }
]

// const PAGE_LIMITATION = 10  // 每页放十支股票

export default {
  name: 'RiskReportTable',

  components: {
    'risk-report-pie-chart': RiskReportPieChart
  },
  data() {
    return {
      tabledata: null,
      loading: true,
      pageLimit: 8,
      currentPage: 1,
      columns,
      mockTip
    }
  },

  mounted() {
    this.loadFollowedStocks()
  },

  methods: {
    unfollowCurrentStock(stockId) {
      unfollowStock(stockId).then(res => {
        this.loadFollowedStocks()
        this.$message.success('取消关注成功')
      })
    },

    loadFollowedStocks() {
      getFollowedStocks(this.pageLimit, this.currentPage).then((res) => {
        if (res.code !== 0) {
          console.error(res.message)
          return
        }
        const data = res.data
        this.formatTableData(data)
      })
    },

    loadCharts(expanded, record) {
      console.log(expanded, record)
    },

    getPieChartTip(record) {
      const strategies = record.report // array
      console.log('strategies: ', strategies)
      // tip: [{value: number, name: string, strategies: array}]
      let sellCnt = 0
      let buyCnt = 0
      const sellArr = []
      const buyArr = []

      strategies.forEach((item) => {
        if (item.tip === 'buy') {
          buyCnt += 1
          buyArr.push(item)
        } else if (item.tip === 'sell' || item.tip === 'loss_sell' || item.tip === 'profit_sell') {
          sellCnt += 1
          sellArr.push(item)
        }
      })

      return [
        { value: sellCnt, name: '建议卖出', strategies: sellArr },
        { value: buyCnt, name: '建议买入', strategies: buyArr }
      ]
    },

    formatTableData(srcData) {
      const formattedTableData = srcData.map((item) => {
        // todo: action解析
        let sellCnt = 0
        let buyCnt = 0
        let action = '保持观望'
        let report = null

        if (item.Report !== null) {
          report = item.Report.map((item) => {
            if (item.Tip === 'sell') sellCnt += 1
            else if (item.Tip === 'buy') buyCnt += 1
            return {
              id: item.Id,
              name: item.Name,
              tip: item.Tip
            }
          })
          if (sellCnt > buyCnt) action = '建议买入'
          else if (sellCnt < buyCnt) action = '建议卖出'
          else action = '保持观望'
        }

        return {
          key: item.Key,
          code: item.Code,
          name: item.Name,
          id: item.Id,
          action: action,
          report: report
        }
      })

      this.tabledata = formattedTableData
      this.loading = false
    }
  }
}
</script>

<style lang="less">

</style>
