import * as echarts from 'echarts'

// 引入图表
import {
  CandlestickChart
} from 'echarts/charts'

// 引入图例工具
import {
  DataZoomComponent
} from 'echarts/components'

// 引入渲染器
import {
  CanvasRenderer
} from 'echarts/renderers'

// 注册引入的组件
echarts.use(
  [
    CandlestickChart,
    DataZoomComponent,
    CanvasRenderer
  ]
)

export default echarts
