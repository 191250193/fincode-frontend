<template>
  <div class="k-line-chart">
    <div id="kLineChart2" style="width: 100%; height: 100%;"></div>
  </div>
</template>

<script>
import echarts from '@/plugins/echarts'
export default {
  name: 'KLineChart2',
  /**
   * kData: {
   *  date: '2016-02-15',
   *  open: 80.58,
   *  close: 80.58,
   *  high: 80.58,
   *  low: 80.58
   * }
   */
  props: ['kData', 'buyPoints', 'sellPoints'],
  data() {
    return {
      chart: undefined,
      // K线数据每屏显示数量
      kNum: 180,
      buyPointsData: [],
      sellPointsData: []
    }
  },
  methods: {
    // 根据日期搜索 K 线数据
    indexOfKData(date) {
      for (let i = 0; i < this.kData.length; i++) {
        if (date === this.kData[i].date.substr(0, 10)) {
          return i
        }
      }
      return -1
    }
  },
  mounted() {
    // console.log('1kdata in chart:', this.kData, this.buyPoints, this.sellPoints)
    this.chart = echarts.init(document.getElementById('kLineChart2'))
    this.chart.setOption({
      series: [
        {
          id: 'k',
          type: 'candlestick',
          barWidth: '60%',
          markPoint: {
            symbolSize: 32,
            label: {
              formatter: params => {
                return params.value
              },
              color: '#FFF',
              fontWeight: 'lighter',
              fontSize: 12
            }
          }
        }
      ],
      grid: {
        left: '4%',
        right: '1%',
        top: 10,
        bottom: '10%'
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        scale: true
      },
      dataZoom: [
        {
          id: 'dz1',
          type: 'slider',
          brushSelect: false,
          top: '95%',
          bottom: 0,
          left: '6%',
          right: '6%'
        },
        {
          id: 'dz2',
          type: 'inside'
        }
      ],
      tooltip: {
        trigger: 'axis',
        formatter: params => {
          let suggestion = 0
          let suggestionText = '建议观望'
          if (this.buyPoints.indexOf(params[0].name) !== -1) {
            suggestion = 1
            suggestionText = '建议买入'
          }
          if (this.sellPoints.indexOf(params[0].name) !== -1) {
            suggestion = 2
            suggestionText = '建议卖出'
          }
          const html =
          `<div class="k-line-chart__tooltip">
            <div class="date">${params[0].axisValue}</div>
            <div class="suggestion suggestion-${suggestion}">${suggestionText}</div>
            <div class="value">开盘价：${params[0].value[1].toFixed(2)}</div>
            <div class="value">收盘价：${params[0].value[2].toFixed(2)}</div>
            <div class="value">最低价：${params[0].value[3].toFixed(2)}</div>
            <div class="value">最高价：${params[0].value[4].toFixed(2)}</div>
          </div>`
          return html
        }
      }
    })
    window.onresize = () => this.chart.resize()
  },
  watch: {
    kData(newKData) {
      // console.log('kdata in chart:', this.kData, this.buyPoints, this.sellPoints, newKData)
      // 获取缩放日期区间边界值
      const chart = this.chart
      var _this = this
      chart.on('datazoom', function() {
        var rangeStartIdx = chart.getModel().option.dataZoom[0].startValue
        var rangeEndIdx = chart.getModel().option.dataZoom[0].endValue
        _this.rangeStart = newKData[rangeStartIdx].date
        _this.rangeEnd = newKData[rangeEndIdx].date
        _this.$store.commit('rangeDateBeginSetter', _this.rangeStart)
        _this.$store.commit('rangeDateEndSetter', _this.rangeEnd)
      })
      // console.log('kdata in chart:', this.kData, this.buyPoints, this.sellPoints)
      this.chart.setOption({
        series: [
          {
            id: 'k',
            data: newKData.map(k => {
              return [k.open, k.close, k.low, k.high]
            })
          }
        ],
        xAxis: {
          data: newKData.map(k => {
            return k.date.substr(0, 10)
          })
        },
        dataZoom: [
          {
            id: 'dz1',
            startValue: newKData.length - this.kNum + 1,
            endValue: newKData.length
          },
          {
            id: 'dz2',
            startValue: newKData.length - this.kNum + 1,
            endValue: newKData.length
          }
        ]
      })
      this.chart.resize()
    }
  }
}
</script>

<style lang="less">
.k-line-chart {
  &__tooltip {
    display: flex;
    flex-direction: column;
    .date {
      font-weight: 600;
      font-size: 15px;
      margin-bottom: 4px;
    }
    .suggestion {
      margin-bottom: 4px;

      font-size: 12px;
      font-weight: 300;
      line-height: 20px;

      border: 1px solid #d9d9d9;
      border-radius: 4px;
      background: #fafafa;
      box-sizing: border-box;

      width: fit-content;
      padding: 0 7px;

      &-1 {
        color: #f5222d;
        background: #fff1f0;
        border-color: #ffa39e;
      }
      &-2 {
        color: #52c41a;
        background: #f6ffed;
        border-color: #b7eb8f;
      }
    }
    .value {
      font-size: 16px;
      margin-bottom: 1px;
    }
  }
}
</style>
