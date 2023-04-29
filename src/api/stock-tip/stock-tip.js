import axios from '@/plugins/axios'

export async function listOverallById(stockId) {
  const { data } = await axios.post('/stocktip/listoverall', {
    stockId
  })
  return data
}

export async function listTipById(stockId, strategyIdList) {
  var formData = new FormData()
  formData.append('stockId', stockId)
  for (var i = 0; i < strategyIdList.length; i++) {
    formData.append('strategyIdList', strategyIdList[i])
  }
  formData.append('startDate', '2015-01-01')
  formData.append('endDate', '')
  const { data } = await axios.post('/stocktip/listtipsbyid', formData)
  return data
}

export async function listPriceById(stockId, endDate, limit) {
  const { data } = await axios.post('/stockprice/listpricebyid', {
    stockId,
    endDate,
    limit
  })
  return data
}

export async function calPeriodRate(stockId, strategyId, startDate, endDate) {
  const { data } = await axios.post('/stocktip/getperiodrate', {
    stockId,
    strategyId,
    startDate,
    endDate
  })
  return data
}
