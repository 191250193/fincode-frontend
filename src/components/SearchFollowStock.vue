<template>
  <a-auto-complete
    backfill
    placeholder="添加请输入股票代码/名称"
    @select="doFollowStock"
    @search="searchStock"
    :dataSource="dataSource"
  >
    <template slot="dataSource">
      <a-select-option
        v-for="item in dataSource"
        :key="item.id + '-' + item.tsCode"
        :title="item.name"
      >
        {{ item.tsCode }} {{ item.name }}
      </a-select-option>
    </template>
  </a-auto-complete>
</template>

<script>
import { followStock, search } from '@/api/stock'
import { Select } from 'ant-design-vue'
export default {
  name: 'SearchInput',
  components: {
    ASelectOption: Select.Option
  },
  data() {
    return {
      dataSource: []
    }
  },
  methods: {
    jumpToStock(value) {
      const info = value.split('-')
      this.$router.push({
        path: '/stock',
        query: {
          id: info[0],
          tsCode: info[1]
        }
      })
    },
    searchStock(value) {
      search(value).then(res => {
        if (res.code === 0) {
          this.dataSource = res.data.slice(0, 10).map(stock => {
            return {
              id: stock.id.toString(),
              name: stock.name,
              tsCode: stock.tsCode
            }
          })
        }
      })
    },
    doFollowStock(value) {
      const info = value.split('-')
      followStock(info[0])
        .then(res => {
          console.log(res)
          this.$parent.loadFollowedStocks()
        })
        .catch(e => {})
    }
  }
}
</script>

<style scoped></style>
