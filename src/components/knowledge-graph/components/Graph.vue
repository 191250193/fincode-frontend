<template>
  <div class="kg-bg-chart">
    <div id="KgBgChart" style="width: 80vw; height: 65vh;">
    </div>
  </div>
</template>

<script>
import echarts from '@/plugins/echarts'

export default {
  name: 'Graph',
  data() {
    return {
      chart: undefined
    }
  },
  mounted() {
    this.chart = echarts.init(document.getElementById('KgBgChart'))
    const myChart = this.chart
    this.$nextTick(() => {
      const data = [{
        fixed: true,
        x: this.chart.getWidth() / 2,
        y: this.chart.getHeight() / 2,
        symbolSize: 20,
        id: '-1'
      }]
      const edges = []
      myChart.setOption({
        series: [{
          type: 'graph',
          layout: 'force',
          animation: false,
          data: data,
          force: {
            // initLayout: 'circular'
            // gravity: 0
            repulsion: 100,
            edgeLength: 5
          },
          edges: edges
        }]
      })
      setInterval(function () {
        data.push({
          id: data.length
        })
        const source = Math.round((data.length - 1) * Math.random())
        const target = Math.round((data.length - 1) * Math.random())
        if (source !== target) {
          edges.push({
            source: source,
            target: target
          })
        }
        myChart.setOption({
          series: [{
            roam: true,
            data: data,
            edges: edges
          }]
        })
      }, 400)
    })
  }
}
</script>

<style scoped lang="less">

</style>
