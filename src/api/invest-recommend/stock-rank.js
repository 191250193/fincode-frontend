import axios from '@/plugins/axios'

export async function getStockRank(sortType, page, limit) {
  const { data } = await axios.post('/stockrank/list', {
    sortType,
    page,
    limit
  })
  return data
  // return new Promise(resolve => {
  //   setTimeout(() => {
  //     resolve({
  //       code: 0,
  //       message: '',
  //       data: [
  //         {
  //           stockDetail: {
  //             id: 1,
  //             name: '贵州茅台',
  //             tsCode: '000098.SZ',
  //             listDate: '2021-01-01',
  //             area: '',
  //             extInfo: {}
  //           },
  //           stockPrice: {
  //             amount: 1.0,
  //             change: 1.0,
  //             close: 1.0,
  //             high: 1.0,
  //             low: 1.0,
  //             open: 1.0,
  //             pctChg: 1.0,
  //             preClose: 1.0,
  //             vol: 1.0,
  //             time: '2021-01-01'
  //           },
  //           industry: {
  //             id: 1,
  //             name: ''
  //           }
  //         }
  //       ]
  //     })
  //   }, 1000)
  // })
}
