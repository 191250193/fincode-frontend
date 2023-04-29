import axios from '@/plugins/axios'

export async function getInvestRecommend(page, limit) {
  const { data } = await axios.post('/investrec/list', {
    page,
    limit
  })
  return data
}
