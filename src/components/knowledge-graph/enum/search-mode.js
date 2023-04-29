const searchMode = [
  'STOCK',
  'INDUSTRY',
  'HOLDER',
  'NEWS'
]
const searchConf = {
  STOCK: {
    name: '股票',
    path: '/knowledge-graph/stock'
  },
  INDUSTRY: {
    name: '行业',
    path: '/knowledge-graph/industry'
  },
  HOLDER: {
    name: '持股关系',
    path: '/knowledge-graph/holder'
  },
  NEWS: {
    name: '资讯',
    path: '/knowledge-graph/news'
  }
}
export const SEARCH_MODE = searchMode
export const SEARCH_CONF = searchConf
