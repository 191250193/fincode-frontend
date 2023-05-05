<template>
  <a-row type="flex" justify="center" class="stock-detail-for-pool">
    <a-col :span="5">
      <a-col :span="24" class="stock-detail-name-for-pool">
        {{ stock.name }}
      </a-col>
      <a-col :span="24" class="stock-detail-enname-for-pool">
        {{ stock.enname }}
      </a-col>
    </a-col>
    <a-col :span="5">
      <a-col :span="24" class="stock-detail-title-for-pool">
        股票代码
      </a-col>
      <a-col :span="24" class="stock-detail-value-for-pool">
        {{ stock.ts_code }}
      </a-col>
    </a-col>
    <a-col :span="5">
      <a-col :span="24" class="stock-detail-title-for-pool">
        行业分类
      </a-col>
      <a-col :span="24" class="stock-detail-value-for-pool">
        {{ extInfo.industry_name }}
      </a-col>
    </a-col>
    <a-col :span="4">
      <a-col :span="24" class="stock-detail-title-for-pool">
        市场分类
      </a-col>
      <a-col :span="24" class="stock-detail-value-for-pool">
        {{ extInfo.market }}
      </a-col>
    </a-col>
    <a-col :span="3">
      <a-col :span="24" class="stock-detail-title-for-pool">
      </a-col>
      <a-col :span="24" class="stock-detail-value-for-pool">
        <a-button size="large" type="primary" shape="circle">删除</a-button>
      </a-col>
    </a-col>
    <!-- <a-col :span="4" >
      <a-col :span="24" class="stock-detail-title-for-pool">
        上市区域
      </a-col>
      <a-col :span="24" class="stock-detail-value-for-pool">
        {{stock.area}}
      </a-col>
    </a-col> -->
  </a-row>
</template>

<script>
import { getStockDetailById } from '@/api/stock-detail/stock-detail'
export default {
  components: {
  },
  props: [],
  data() {
    return {
      stock: {},
      extInfo: {
        industry_name: '--',
        market: '--'
      }
    }
  },
  methods: {
    getStockDetail() {
      getStockDetailById(this.$route.params.stockId).then(res => {
        // console.log(this.$route.params.stockId)
        // console.log(res)
        // console.log(this.stock.ext_info)
        this.stock = res.data
        this.extInfo = JSON.parse(this.stock.ext_info)
        // console.log(this.extInfo)
      })
    }
  },
  mounted() {
    this.getStockDetail()
  }
}
</script>

<style>
.stock-detail-for-pool {
  margin: 7px 0 7px 0;
}
.stock-detail-name-for-pool {
  color: #fff;
  padding: 2px;
  font-size: 16px;
}
.stock-detail-enname-for-pool {
  color: #3597e7;
  padding: 2px;
  font-size: 8px;
}
.stock-detail-title-for-pool {
  color: #fff;
  padding: 3px;
  font-size: 12px;
}
.stock-detail-value-for-pool {
  color: #3597e7;
  padding: 2px;
  font-size: 12px;
}
</style>
