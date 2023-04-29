import axios from '@/plugins/axios'

export async function getStockDetailById(id) {
  const { data } = await axios.post('/stock/getdetail', {
    id
  })
  return data
}
