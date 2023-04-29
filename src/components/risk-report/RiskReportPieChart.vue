<template>
  <div class="risk-report-pie-chart">
    <div class="risk-report-pie-chart__wrapper"></div>
    <div :id="'chart-'+idx" style="height: 300px"></div>
  </div>
</template>

<script>
import echarts from '@/plugins/echarts'

const getOption = (data) => {
  const getTooltip = (param) => {
    console.log('[[[param]]]: ', param)
    const data = param.data
    const strategies = []
    data.strategies.forEach((item) => strategies.push(`<div>${item.name}</div>`))
    return `
      <div>
        <div>${data.name}的策略</div>
        ${strategies.join('')}
      </div>
    `
  }

  return {
    title: {
      text: '今日策略建议分布',
      // subtext: '',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: params => {
        return getTooltip(params)
      }
    },
    series: [
      {
        name: 'daily-risk-report',
        type: 'pie',
        // radius: '50%',
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
}

export default {
  name: 'RiskReportPieChart',

  props: ['tips', 'idx'],

  data() {
    return {
      chart: undefined
    }
  },

  mounted() {
    const chartDom = document.getElementById(`chart-${this.idx}`)
    this.chart = echarts.init(chartDom)
    this.chart.setOption(getOption(this.tips))
  },

  methods: {

  }

}
</script>

<style lang="less">

</style>
