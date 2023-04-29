<template>
  <a-card class="search-result-card">
    <a-descriptions title="基于资讯的关联关系">
      <a-description-item>
      </a-description-item>
    </a-descriptions>
    <div style="margin-top: -40px">
      <a-table
        :dataSource="tableData"
        :columns="columns"
        :loading="loading"
        :pagination="false"
        size="middle"
        :scroll="{ y: 450 }"
      >
      </a-table>
    </div>
  </a-card>
</template>

<script>
import { Descriptions } from 'ant-design-vue'
import { getStockNewsRelationById } from '@/api/knowledge-graph'

export default {
  name: 'StockNewsRelation',
  components: {
    ADescriptionItem: Descriptions.Item
  },
  props: {
    companyId: String
  },
  data() {
    const columns = [
      {
        title: '关联方',
        key: 'companyName',
        dataIndex: 'companyName'
      },
      {
        title: '关联方代码',
        key: 'companyId',
        dataIndex: 'companyId'
      },
      {
        title: '关联资讯数',
        key: 'newsAmount',
        dataIndex: 'newsAmount'
      },
      {
        title: '涨跌幅',
        key: 'pct_chg',
        dataIndex: 'pct_chg'
      }
    ]
    return {
      loading: true,
      tableData: Array(20).fill({
        companyId: '1',
        companyName: '1',
        newsAmount: 0, // 关联的资讯数量
        pct_chg: 0 // mysql
      }),
      columns
    }
  },
  watch: {
    companyId: function (val) {
      this.loading = true
      this.apiGetStockNewsRelationById()
    }
  },
  mounted() {
    this.apiGetStockNewsRelationById()
  },
  methods: {
    apiGetStockNewsRelationById() {
      getStockNewsRelationById(this.companyId).then(res => {
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
