<template>
  <a-auto-complete
    backfill
    placeholder="请输入股票代码/名称"
    @select="jumpToStock"
    @search="searchStock"
    :dataSource="dataSource"
  >
    <template slot="dataSource">
        <a-select-option v-for="item in dataSource" :key="item.id+'-'+item.tsCode" :title="item.name">
          {{item.tsCode}} {{item.name}}
        </a-select-option>
      </template>
  </a-auto-complete>

</template>

<script>
import { search } from '@/api/stock'
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
      console.log('value', value)
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
    }
  }
}
</script>

<style scoped>

</style>
