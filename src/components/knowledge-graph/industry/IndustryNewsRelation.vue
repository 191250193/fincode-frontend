<template>
  <a-card class="search-result-card" title="基于资讯的行业图谱">
    <a-table
      :dataSource="tableData"
      :columns="columns"
      :loading="loading"
      :pagination="false"
      size="middle"
      :scroll="{ y: 440 }"
    >
      <p slot="expandedRowRender" slot-scope="record" style="margin: 0">
        <a-table
          :dataSource="record.relatedCompanyInfo"
          :columns="subColumns"
          :pagination="false"
          size="small"
        >
        </a-table>
        {{ record.description }}
      </p>
    </a-table>

  </a-card>
</template>

<script>
import { getIndustryNewsRelationById } from '@/api/knowledge-graph'

export default {
  name: 'IndustryNewsRelation',
  props: {
    industryId: Number,
    industryName: String
  },
  data() {
    const columns = [
      {
        title: '公司名',
        dataIndex: 'companyName',
        key: 'companyName'
      },
      {
        title: '公司代码',
        dataIndex: 'companyId',
        key: 'companyId'
      },
      {
        title: '涨跌幅',
        dataIndex: 'pct_chg',
        key: 'pct_chg'
      },
      {
        title: '关联公司数',
        dataIndex: 'relatedCompany',
        key: 'relatedCompany'
      }
    ]
    const subColumns = [
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
        title: '涨跌幅',
        key: 'pct_chg',
        dataIndex: 'pct_chg'
      },
      {
        title: '关联资讯数',
        key: 'newsAmount',
        dataIndex: 'newsAmount'
      }
    ]
    return {
      loading: true,
      tableData: [],
      // tableData: Array(20).fill({
      //   companyName: '1',
      //   companyId: '000001.SZ',
      //   pct_chg: 0,
      //   relatedCompany: 0,
      //   relatedCompanyInfo: [
      //     {
      //       companyId: '1',
      //       companyName: '1',
      //       newsAmount: 0, // 关联的资讯数量
      //       pct_chg: 0 // mysql
      //     }
      //   ]
      // }),
      columns,
      subColumns
    }
  },
  watch: {
    industryId: function () {
      this.loading = true
      this.apiGetIndustryNewsRelationById()
    }
  },
  mounted() {
    this.apiGetIndustryNewsRelationById()
  },
  methods: {
    apiGetIndustryNewsRelationById() {
      getIndustryNewsRelationById(this.industryId).then(res => {
        this.tableData = res
        this.loading = false
      })
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/default.less";
</style>
