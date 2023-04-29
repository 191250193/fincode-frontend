import axios from '@/plugins/axios'

const fastAPI = '/kg'

export async function fastAPITest() {
  const { data } = await axios.get(fastAPI)
  return data
}

/**
 * 接口1. 通过companyId获取股票基本信息
 * @param companyId
 * @returns {Promise<void>}
 */
export async function getStockBasicInfoById(companyId) {
  const { data } = await axios.get(fastAPI + '/stock/basic_info',
    { params: { companyId } })
  return data
}

const res1 = {
  industryName: '', // 所在行业
  // 以下为最新行情，数据在mysql里
  time: '', // 交易日期
  open: 0,
  high: 0,
  low: 0,
  close: 0,
  change: 0,
  pct_chg: 0,
  vol: 0,
  amount: 0
}

/**
 * 接口2. 通过companyId获取公司的持股信息
 * @param companyId
 * @returns {Promise<any>}
 */
export async function getStockHolderRelationById(companyId) {
  const { data } = await axios.get(fastAPI + '/stock/holder',
    { params: { companyId } })
  return data
}

const res2 = [
  {
    companyId: '',
    companyName: '',
    holdRatio: 0, // 持股比例
    holdAmount: 0, // 持股数量
    pct_chg: 0 // mysql
  }
]

/**
 * 接口3. 通过companyId获取公司的资讯关系
 * @param companyId
 * @returns {Promise<any>}
 */
export async function getStockNewsRelationById(companyId) {
  const { data } = await axios.get(fastAPI + '/stock/news',
    { params: { companyId } })
  return data
}

const res3 = [
  {
    companyId: '',
    companyName: '',
    newsAmount: 0, // 关联的资讯数量
    pct_chg: 0 // mysql
  }
]

/**
 * 接口4. 获取全部行业信息
 * @returns {Promise<*>}
 */

export async function getAllIndustry() {
  const { data } = await axios.get(fastAPI + '/industry/all')
  return data
}

const res4 = [
  {
    industryId: 0,
    industryName: ''
  }
]

/**
 * 接口5. 根据行业id获取该行业下的所有公司
 * @param industryId
 * @returns {Promise<any>}
 */

export async function getIndustryNewsRelationById(industryId) {
  const { data } = await axios.get(fastAPI + '/industry/news',
    { params: { industryId } })
  return data
}

const res5 = [
  {
    companyName: '',
    companyId: '',
    pct_chg: 0,
    relatedCompany: 0, // 基于资讯关系关联的公司
    // 关联公司的详情
    relatedCompanyInfo: [
      {
        companyName: '',
        companyId: '',
        pct_chg: 0,
        newsAmount: 0 // 关联资讯数
      }
    ]
  }
]

/**
 * 接口6. 根据行业id获取行业图谱
 * @param industryId
 * @returns {Promise<void>}
 */

// TODO
export async function getIndustryGraphById(industryId) {
  const { data } = await axios.get(fastAPI + '/industry/graph',
    { params: { industryId } })
}

/**
 * 接口7. 搜索关联关系
 * @param searchQuery 包含以下四个参数，注：不是object，就是四个参数
 * @returns {Promise<*>}
 */

const searchQuery = {
  holderNumMinQuery: 0, // 持有的数量
  holderNumMaxQuery: 0, // 可选，如果不设置为不限
  holdeeNumMinQuery: 0, // 被持有的数量
  holdeeNumMaxQuery: 0 // 可选，如果不设置为不限
}

export async function searchHoldRelation(searchQuery) {
  const { data } = await axios.get(fastAPI + 'search/relation', {
    params: searchQuery
  })
  return data
}

const res7 = [{
  companyId: '',
  companyName: '',
  industryId: 0,
  industryName: '',
  holderNum: 0, // 持有的数量
  holdeeNum: 0 // 被持有的数量(持股公司+自然人)
}]

/**
 * 接口8. 根据关联资讯数搜索关联关系
 * @param newsAmount 关联资讯数
 * @returns {Promise<*>} 返回一个列表，列表元素为两个关联资讯数>=输入的newsAmount的公司
 */
export async function searchNewsRelation(newsAmount) {
  const { data } = await axios.get(fastAPI + 'search/news', {
    params: { newsAmount }
  })
  return data
}

const res8 = [{
  companyA: {
    companyId: '',
    companyName: '',
    industryName: '',
    basicInfo: {
      open: 0,
      high: 0,
      low: 0,
      close: 0,
      change: 0,
      pct_chg: 0
    }

  },
  companyB: {
    companyId: '',
    companyName: '',
    industryName: '',
    basicInfo: {
      open: 0,
      high: 0,
      low: 0,
      close: 0,
      change: 0,
      pct_chg: 0
    }
  },
  newsAmount: 0, // 关联资讯数
  // 关联这两个公司的全部资讯
  timeline: [
    {
      time: '',
      news: ''
    }
  ]
}]
