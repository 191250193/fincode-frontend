<template>
  <div class="stock-detail">
    <a-card>
      <div class="stock-detail__container">
      <div class="header">
        <div class="header__left">
          <div class="name">
            <div class="name__text">{{ stock.name }}</div>
            <div v-if='!isFollowed'>
            <a-tooltip placement="bottom">
              <template #title>
                <span>关注股票</span>
              </template>
              <a-icon type="star" @click="followCurrentStock"></a-icon>
            </a-tooltip>
            </div>
            <div v-else>
            <a-tooltip placement="bottom">
              <template #title>
                <span>取消关注</span>
              </template>
              <a-icon type="star" theme='filled' style="color: #FFCC00" @click="unfollowCurrentStock"></a-icon>
            </a-tooltip>
            </div>
          </div>
          <div class="code">{{ stock.ts_code }}</div>
        </div>
        <div class="header__right">
          <div class="close" :class="chgColor(stock.pct_chg)">{{ stock.close }}</div>
          <div class="pctChg" :class="chgColor(stock.pct_chg)">{{ stock.pct_chg.toFixed(2) + '%' }}</div>
        </div>
      </div>
      <div class="nav">
        <a-button icon="line-chart" @click="toStockTip">适用策略</a-button>
<!--        <a-button icon="deployment-unit">知识图谱</a-button>-->
      </div>
      <div class="info">
        <div class="attr">
          <div class="attr-name">更新日期：</div>
          <div class="attr-value">{{ longTimeToStr(stock.time) }}</div>
        </div>
        <div class="attr">
          <div class="attr-name">开盘：</div>
          <div class="attr-value">{{ stock.open.toFixed(2) }}</div>
        </div>
        <div class="attr">
          <div class="attr-name">最高：</div>
          <div class="attr-value">{{ stock.high.toFixed(2) }}</div>
        </div>
        <div class="attr">
          <div class="attr-name">最低：</div>
          <div class="attr-value">{{ stock.low.toFixed(2) }}</div>
        </div>
        <div class="attr">
          <div class="attr-name">昨收：</div>
          <div class="attr-value">{{ stock.pre_close.toFixed(2) }}</div>
        </div>
        <div class="attr">
          <div class="attr-name">涨跌额：</div>
          <div class="attr-value">{{ stock.change.toFixed(2) }}</div>
        </div>
        <div class="attr">
          <div class="attr-name">成交量：</div>
          <div class="attr-value">{{ stock.vol.toFixed(2) }}</div>
        </div>
        <div class="attr">
          <div class="attr-name">成交额：</div>
          <div class="attr-value">{{ stock.amount.toFixed(2) }}</div>
        </div>
        <div class="attr">
          <div class="attr-name">上市日期：</div>
          <div class="attr-value">{{ longTimeStrFormat(stock.list_date) }}</div>
        </div>
        <div class="attr">
          <div class="attr-name">地区：</div>
          <div class="attr-value">{{ stock.area }}</div>
        </div>
      </div>
    </div>
    </a-card>
  </div>
</template>

<script>
import { getStockFullInfo, followStock, isFollowed } from '@/api/stock'
import { longTimeToStr, longTimeStrFormat } from '@/utils/format'
import { unfollowStock } from '@/api/risk-report'

export default {
  data() {
    return {
      isFollowed: false,
      id: 0,
      tsCode: '',
      stock: {
        // TsCode: '',
        // Bame: '',
        // ListDate: '20200305',
        // Area: '',
        // Close: 0,
        // Open: 0,
        // High: 0,
        // Low: 0,
        // PctChg: 0,
        // Change: 0,
        // Vol: 0,
        // Amount: 0,
        // PreClose: 0,
        // IndustryId: 0,
        // IndustryName: '',
        // Time: 20210305
        ts_code: '',
        name: '',
        list_date: '20200305',
        area: '',
        close: 0,
        open: 0,
        high: 0,
        low: 0,
        pct_chg: 0,
        change: 0,
        vol: 0,
        amount: 0,
        pre_close: 0,
        industry_id: 0,
        industry_name: '',
        time: 20210305
      }
    }
  },
  methods: {
    longTimeToStr,
    longTimeStrFormat,
    followCurrentStock() {
      if (this.$store.state.isLogin) {
        this.isFollowed = true
        followStock(this.id).then(res => {
        }).catch(e => {})
        this.$message.success('关注成功')
      } else {
        this.$message.info('请先登录')
      }
    },
    unfollowCurrentStock() {
      this.isFollowed = false
      unfollowStock(this.id).then(res => {
      }).catch(e => {})
      this.$message.success('取消关注成功')
    },
    updatePage(query) {
      this.id = query.id
      this.tsCode = query.tsCode
      this.updateStockData()
    },
    updateStockData() {
      // console.log(this.id)
      getStockFullInfo(this.id).then(res => {
        // console.log(res)
        this.stock = res.data
        // console.log(this.stock)
        // console.log(this.stock.high)
        // console.log(this.stock.Low)
      }).catch(e => {})
      if (this.$store.state.isLogin) {
        isFollowed(this.id).then(res => {
          this.isFollowed = res.data
        }).catch(e => {})
      }
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
    toStockTip() {
      this.$router.push({
        path: `/stocktip/${this.id}`
      })
    }
  },
  mounted() {
    this.updatePage(this.$route.query)
  },
  watch: {
    $route: {
      handler({ query }) {
        this.updatePage(query)
      }
    }
  }
}
</script>

<style lang="less">
@import '../assets/default.less';

.stock-detail {
  display: flex;
  justify-content: center;
  .ant-card-body {
    padding: 24px 36px;
  }
  &__container {
    width: 600px;
    .header {
      display: flex;

      margin-bottom: 18px;
      &__left {
        margin-right: auto;
      }
      &__right {
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        margin-right: 20px;
      }
    }
    .nav {
      display: flex;
      margin-bottom: 24px;
      >button {
        margin-right: 12px;
      }
    }
    .info {
      display: flex;
      flex-wrap: wrap;
      .attr {
        width: 50%;
        margin-bottom: 8px;

        display: flex;
        align-items: center;
        &-name {
          font-size: 16px;
          color: #000;
          width: 140px;
        }
        &-value {
          font-size: 16px;
        }
      }
    }
  }
  @h1: 64px;
  .name {
    display: flex;
    align-items: center;
    font-size: 32px;
    &__text {
      margin-right: 8px;
    }
  }
  .code {
    font-size: 18px;
  }
  .close {
    font-size: 32px;
  }
  .pctChg {
    font-size: 18px;
  }
}
</style>
