import axios from '@/plugins/axios'

export async function listMatchStock(id, page, limit, orderBy) {
  const { data } = await axios.post('/strategy/listmatchstock', {
    id,
    page,
    limit,
    orderBy
  })
  return data
}

export async function getDetail(id) {
  const { data } = await axios.post('/strategy/getdetail', {
    id
  })
  return data
}
