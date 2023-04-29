import axios from '@/plugins/axios'

// 搜索股票
export async function search(keyword) {
  const { data } = await axios.post('/stock/search', {
    keyword
  })
  return data
}

export async function getStockFullInfo(id) {
  const { data } = await axios.post('/stock/getfullinfo', {
    id
  })
  return data
}

export async function followStock(stockId) {
  const { data } = await axios.post('/stockfollowed/follow', {
    stockId
  })
  return data
}

export async function isFollowed(stockId) {
  const { data } = await axios.post('/stockfollowed/isfollowed', {
    stockId
  })
  return data
}
