<template>
  <div class="search-result-card">
    <a-table :dataSource="tableData"
             :columns="columns"
             :loading="loading"
             :pagination="{defaultPageSize:9}"
    ></a-table>
  </div>
</template>

<script>
import { searchHoldRelation } from '@/api/knowledge-graph'

export default {
  name: 'HolderRelation',
  props: {
    request: Object
  },
  data() {
    const columns = [
      {
        title: '公司代码',
        dataIndex: 'companyId',
        key: 'companyId'
      },
      {
        title: '公司名',
        dataIndex: 'companyName',
        key: 'companyName'
      },
      {
        title: '持股数',
        dataIndex: 'holderNum',
        key: 'holderNum',
        sorter: (a, b) => a.holderNum - b.holderNum
      },
      {
        title: '被持股数',
        dataIndex: 'holdeeNum',
        sorter: (a, b) => a.holdeeNum - b.holdeeNum
      },
      {
        title: '行业',
        dataIndex: 'industryName',
        onFilter: (value, record) => record.industryName === value
      }
    ]
    return {
      loading: true,
      tableData: [],
      columns
    }
  },
  watch: {
    request: function (val) {
      this.apiSearchHoldRelation()
    }
  },
  mounted() {
    this.apiSearchHoldRelation()
  },
  methods: {
    apiSearchHoldRelation() {
      searchHoldRelation(this.request).then(res => {
        this.tableData = res.data
        this.loading = false
      })
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/default.less";

/deep/ .ant-table-pagination.ant-pagination {
  text-align: center;
  float: none;
}
</style>
