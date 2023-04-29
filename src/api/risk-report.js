import axios from '@/plugins/axios'

// 当前登录的用户的信息是存在服务端的
export async function getFollowedStocks(limit, page) {
  console.log('[[[in]]]')
  const { data } = await axios.post('/stockfollowed/list', {
    limit,
    page
  })

  return data
}

export async function unfollowStock(stockId) {
  const { data } = await axios.post('/stockfollowed/unfollow', {
    stockId
  })

  return data
}
