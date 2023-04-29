<template>
  <a-row  type="flex" justify="center" class="stock-detail">
    <a-col :span="4">
      <a-col :span="24" class="stock-detail-name">
        {{stock.name}}
      </a-col>
      <a-col :span="24" class="stock-detail-enname">
        {{stock.enname}}
      </a-col>
    </a-col>
    <a-col :span="3" >
      <a-col :span="24" class="stock-detail-title">
        股票代码
      </a-col>
      <a-col :span="24" class="stock-detail-value">
        {{stock.ts_code}}
      </a-col>
    </a-col>
    <a-col :span="3" >
      <a-col :span="24" class="stock-detail-title">
        行业分类
      </a-col>
      <a-col :span="24" class="stock-detail-value">
        {{extInfo.industry_name}}
      </a-col>
    </a-col>
    <a-col :span="3" >
      <a-col :span="24" class="stock-detail-title">
        市场分类
      </a-col>
      <a-col :span="24" class="stock-detail-value">
        {{extInfo.market}}
      </a-col>
    </a-col>
    <a-col :span="3" >
      <a-col :span="24" class="stock-detail-title">
        上市时间
      </a-col>
      <a-col :span="24" class="stock-detail-value">
        {{stock.list_date}}
      </a-col>
    </a-col>
    <a-col :span="3" >
      <a-col :span="24" class="stock-detail-title">
        上市区域
      </a-col>
      <a-col :span="24" class="stock-detail-value">
        {{stock.area}}
      </a-col>
    </a-col>
  </a-row>
</template>

<script>
import { getStockDetailById } from '@/api/stock-detail/stock-detail'
export default {
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
      getStockDetailById(this.$route.params.stockId)
        .then(res => {
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

<style lang="less">
@import "../../assets/default.less";
.stock-detail {
  width: 98%;
  margin: 1%;
}
.stock-detail-name {
  color: @highlight-color;
  padding: 2px;
  font-size: 22px;
}
.stock-detail-enname {
  color: @checked-color;
  padding: 2px;
  font-size: 12px;
}
.stock-detail-title {
  color: @highlight-color;
  padding: 3px;
  font-size: 16px;
}
.stock-detail-value {
  color: @checked-color;
  padding: 2px;
  font-size: 18px;
}
</style>
