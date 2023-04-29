<template>
  <a-table
    :dataSource="tableData"
    :columns="columns"
    :loading="loading"
    :pagination="false"
    size="middle"
    :scroll="{ y: 230 }"
  >
  </a-table>
</template>

<script>
import { getStockHolderRelationById } from '@/api/knowledge-graph'

export default {
  name: 'StockHolderRelation',
  props: {
    companyId: String
  },
  data() {
    const columns = [
      {
        title: '持股方',
        key: 'companyName',
        dataIndex: 'companyName'
      },
      {
        title: '持股方代码',
        key: 'companyId',
        dataIndex: 'companyId'
      },
      {
        title: '持股比例',
        key: 'holdRatio',
        dataIndex: 'holdRatio'
      },
      {
        title: '持股数量',
        key: 'holdAmount',
        dataIndex: 'holdAmount'
      },
      {
        title: '涨跌幅',
        key: 'pct_chg',
        dataIndex: 'pct_chg'
      }
    ]
    return {
      loading: true,
      tableData: [],
      // tableData: Array(20).fill({
      //   companyId: '1',
      //   companyName: '1',
      //   holdRatio: 0, // 持股比例
      //   holdAmount: 0, // 持股数量
      //   pct_chg: 0
      // }),
      columns
    }
  },
  watch: {
    companyId: function () {
      this.loading = true
      this.apiGetStockHolderRelationById()
    }
  },
  mounted() {
    this.apiGetStockHolderRelationById()
  },
  methods: {
    apiGetStockHolderRelationById() {
      getStockHolderRelationById(this.companyId).then(res => {
        this.tableData = res.data
        this.loading = false
      })
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/default.less";
</style>
