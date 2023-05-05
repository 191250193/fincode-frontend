<template>
  <div class="personal-center">
    <div class="personal-center-left fl">
      <div class="user-avatar">
        <img src="../assets/user-image.png" alt="" />
      </div>
      <div class="user-name">{{ username }}</div>
      <div class="user-divider"></div>
      <ul class="personal-center-side-list">
        <li>
          <img
            class="personal-center-icon"
            src="../assets/personal-center.png"
            alt=""
          />
          <div  style="color:#1890ff;cursor: pointer">个人中心</div>
        </li>
        <li>
          <img class="stock-pool-icon" src="../assets/stock-pool.png" alt="" />
          <div style="cursor: pointer" @click="toStockPool">股票池</div>
        </li>
      </ul>
    </div>
    <div class="personal-center-right fr">
      <SearchFollowStock class="search"></SearchFollowStock>
      <div class="follow-stock">
        <!-- <a-table
          :row-key="d => 'sr' + d.id"
          :data-source="stockData"
          :loading="stockDataLoading"
          :pagination="false"
        >
          <a-table-column align="center" title="股票代码">
            <template slot-scope="text, record">
              <a-button type="link" @click="toStock(record.id, record.ts_code)">{{
                record.ts_code
              }}</a-button>
            </template>
          </a-table-column>
          <a-table-column align="center" title="股票名称">
            <template slot-scope="text, record">
              <a-button type="link" @click="toStock(record.id, record.ts_code)">{{
                record.name
              }}</a-button>
            </template>
          </a-table-column>
          <a-table-column align="center" title="昨日收盘" data-index="close" />
          <a-table-column align="center" title="昨日开盘" data-index="open" />
          <a-table-column align="center" title="昨日最高" data-index="high" />
          <a-table-column align="center" title="昨日最低" data-index="low" />
          <a-table-column align="center" title="涨跌幅">
            <template slot-scope="text, record">
              <span :class="chgColor(record.pctChg)">{{
                record.pctChg.toFixed(2) + "%"
              }}</span>
            </template>
          </a-table-column>
          <a-table-column align="center" title="涨跌额" data-index="change">
            <template slot-scope="text, record">
              <span :class="chgColor(record.change)">{{
                record.change.toFixed(2)
              }}</span>
            </template>
          </a-table-column>
          <a-table-column align="center" title="成交量" data-index="vol" />
          <a-table-column align="center" title="成交额" data-index="amount" />
          <a-table-column
            align="center"
            title="取消关注"
            data-index="unfollow"
          />
        </a-table> -->
        <a-table :dataSource="stockData" :columns="columns">
          <!-- <template #action>
            <a>Delete</a>
          </template> -->
          <a slot="action" slot-scope="record" @click="unfollowCurrentStock(record)">取消关注</a>
        </a-table>
      </div>
      <div class="follow-stock-footer">
        <!-- <a-pagination
          v-model="pageNum"
          :page-size="pageSize"
          :total="totalPages * pageSize"
          @change="onPageChange"
        /> -->
      </div>
    </div>
  </div>
</template>

<script>
import SearchFollowStock from '@/components/SearchFollowStock'
import { getFollowedStocks, unfollowStock } from '@/api/risk-report.js'
import { getStockFullInfo } from '@/api/stock'

const columns = [
  { title: '股票代码', dataIndex: 'ts_code', key: 'ts_code' },
  { title: '股票名称', dataIndex: 'name', key: 'name' },
  { title: '昨日收盘', dataIndex: 'close', key: 'close' },
  { title: '昨日开盘', dataIndex: 'open', key: 'open' },
  { title: '昨日最高', dataIndex: 'high', key: 'high' },
  { title: '昨日最低', dataIndex: 'low', key: 'low' },
  { title: '涨跌幅', dataIndex: 'pct_chg', key: 'pct_chg' },
  { title: '涨跌额', dataIndex: 'change', key: 'change' },
  { title: '成交量', dataIndex: 'vol', key: 'vol' },
  { title: '成交额', dataIndex: 'amount', key: 'amount' },
  {
    title: '取消关注',
    dataIndex: '',
    key: 'x',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  components: {
    SearchFollowStock
  },
  data() {
    return {
      stockDataLoading: false,
      stockData: [],
      //   {
      //     ts_code: '300117.SZ',
      //     name: '嘉寓股份',
      //     list_date: '20100902',
      //     stock_id: 1597,
      //     area: '北京',
      //     close: 3.85,
      //     high: 3.86,
      //     low: 3.78,
      //     open: 3.83,
      //     pct_chg: 0.7853,
      //     pre_close: 3.82,
      //     amount: 40869.601,
      //     change: 0.03,
      //     vol: 106835,
      //     industry_id: 4,
      //     enname: '建筑业(E)',
      //     time: 20230228
      //   },
      //   null,
      //   {
      //     ts_code: '603877.SH',
      //     name: '太平鸟',
      //     list_date: '20170109',
      //     stock_id: 4093,
      //     area: '浙江',
      //     close: 22.17,
      //     high: 22.95,
      //     low: 20.81,
      //     open: 21.21,
      //     pct_chg: 4.0845,
      //     pre_close: 21.3,
      //     amount: 152171.388,
      //     change: 0.87,
      //     vol: 69880.38,
      //     industry_id: 2,
      //     enname: '制造业(C)',
      //     time: 20230228
      //   },
      //   {
      //     ts_code: '300993.SZ',
      //     name: '玉马遮阳',
      //     list_date: '20210524',
      //     stock_id: 2444,
      //     area: '山东',
      //     close: 14.39,
      //     high: 14.48,
      //     low: 14.2,
      //     open: 14.33,
      //     pct_chg: 0.3487,
      //     pre_close: 14.34,
      //     amount: 25037.958,
      //     change: 0.05,
      //     vol: 17452.16,
      //     industry_id: 2,
      //     enname: '制造业(C)',
      //     time: 20230228
      //   },
      //   {
      //     ts_code: '603896.SH',
      //     name: '寿仙谷',
      //     list_date: '20170510',
      //     stock_id: 4108,
      //     area: '浙江',
      //     close: 49.62,
      //     high: 49.73,
      //     low: 47.81,
      //     open: 48.05,
      //     pct_chg: 2.563,
      //     pre_close: 48.38,
      //     amount: 102662.824,
      //     change: 1.24,
      //     vol: 20888.87,
      //     industry_id: 2,
      //     enname: '制造业(C)',
      //     time: 20230228
      //   }
      // ],
      pageNum: 1,
      pageSize: 8,
      totalPages: 10,
      columns
    }
  },
  computed: {
    username() {
      return this.$store.state.username
    }
  },
  mounted() {
  // list = list.filter(n => n)
    // this.stockData = this.stockData.filter(n => n)
    // 预先填充数据，防止屏幕突然加长
    for (let i = 0; i < this.pageSize; i++) {
      this.stockData.push(this.mockStockData(i))
    }
    this.loadFollowedStocks()
    // console.log('stock data', this.stockData)
  },
  methods: {
    unfollowCurrentStock(record) {
      var id = record.stock_id
      // console.log('stockId', id)
      unfollowStock(id).then(res => {
        this.loadFollowedStocks()
        this.$message.success('取消关注成功')
      })
    },
    mockStockData(idx) {
      return {
        id: idx,
        code: '-',
        name: '-',
        close: 0,
        open: 0,
        high: 0,
        low: 0,
        pctChg: 0,
        vol: 0,
        amount: 0,
        change: 0,
        industryId: 0,
        industryName: ''
      }
    },
    toStock(id, tsCode) {
      this.$router.push({
        path: '/stock',
        query: {
          id,
          tsCode
        }
      })
    },
    chgColor(pctChg) {
      if (pctChg > 0) {
        return 'color-rise'
      } else if (pctChg < 0) {
        return 'color-fall'
      } else {
        return ''
      }
    },
    onPageChange() {
      this.updateStockData()
    },
    // 股票池
    toStockPool() {
      this.$router.push({ path: `/stockpool/${567}` })
    },
    loadFollowedStocks() {
      getFollowedStocks(this.pageSize, this.pageNum).then((res) => {
        if (res.code !== 0) {
          console.error(res.message)
          return
        }
        var kdata = []
        for (var i = 0; i < res.data.length; i++) {
          getStockFullInfo(res.data[i].id).then(res => {
            if (res.data !== null) {
              kdata.push(res.data)
            }
          })
            .catch(e => {})
        }
        this.stockData = kdata
      })
    }
  }
}
</script>

<style>
/* 左边部分 */
.fl {
  float: left;
}
.personal-center-left {
  width: 15%;
  margin-top: 13px;
}
.user-avatar {
  margin: 0 auto;
  width: 100px;
  height: 100px;
  border: 2px solid rgb(255, 255, 255);
  border-radius: 50%;
  overflow: hidden;
}
.user-avatar img {
  width: 100%;
  height: 100%;
}
.user-name {
  margin-top: 16px;
  text-align: center;
  line-height: 22px;
}
.user-divider {
  margin-top: 10px;
  border-bottom: 1px solid #dedede;
}
.personal-center-side-list {
  margin-top: 10px;
  /* padding: 0 0 0 10!important; */
}
.personal-center-side-list li {
  height: 34px;
  line-height: 34px;
  list-style: none;
  font-weight: 600;
}
.personal-center-icon {
  float: left;
  width: 20px;
  height: 20px;
  margin: 6px;
}
.stock-pool-icon {
  float: left;
  width: 20px;
  height: 20px;
  margin: 6px;
}

/* 右边部分 */
.fr {
  float: right;
}
.personal-center-right {
  width: 85%;
  min-height: 1000px;
}
.stock-rank {
  margin-bottom: 1rem;
  table {
    border: 1px solid #e8e8e8;
  }
}
.follow-stock {
  margin-top: 15px;
}
.follow-stock-footer {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
