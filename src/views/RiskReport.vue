<template>
  <risk-report-table />
</template>

<script>
import RiskReportTable from '@/components/risk-report/RiskReportTable.vue'

// TODO: 路由守卫，判断是否已经登录

export default {
  components: {
    RiskReportTable
  },
  data() {
    return {
    }
  },

  methods: {
  }
}
</script>

<style lang="less">

</style>
