<template>
  <div>
    <div class="search-input-wrapper">
      <a-auto-complete
        class="search-input"
        size="large"
        backfill
        placeholder="请输入股票代码/名称"
        @select="confirmSearch"
        @search="searchStock"
        :dataSource="dataSource"
      >
        <template slot="dataSource">
          <a-select-option v-for="item in dataSource" :key="item.id+'-'+item.tsCode+'-'+item.name" :title="item.name">
            {{ item.tsCode }} {{ item.name }}
          </a-select-option>
        </template>
        <a-input>
          <a-button
            slot="suffix"
            style="margin-right: -12px"
            class="search-btn"
            size="large"
            type="primary"
          >
            <a-icon type="search" />
          </a-button>
        </a-input>
      </a-auto-complete>
    </div>
    <div class="search-result-wrapper" v-if="showResult">
      <div style="display: flex;flex-direction: column;flex: 0 0 57%;">
        <StockBasicInfo :company-id="selectStockId"
                        :company-name="selectStockName"
        ></StockBasicInfo>
      </div>
      <div style="flex: 0 0 40%;margin-left: 3%">
        <StockNewsRelation :company-id="selectStockId"
        ></StockNewsRelation>
      </div>

    </div>
  </div>
</template>

<script>
import { search } from '@/api/stock'
import StockBasicInfo from '@/components/knowledge-graph/stock/StockBasicInfo'
import StockHolderRelation from '@/components/knowledge-graph/stock/StockHolderRelation'
import StockNewsRelation from '@/components/knowledge-graph/stock/StockNewsRelation'
import EventBus from '@/views/KnowledgeGraph/event-bus'
import { Select } from 'ant-design-vue'

export default {
  name: 'StockMode',
  components: {
    ASelectOption: Select.Option,
    StockBasicInfo,
    StockNewsRelation
  },
  data() {
    return {
      showResult: false,
      selectStockId: '',
      selectStockName: '',
      dataSource: []
    }
  },
  methods: {
    confirmSearch(value) {
      this.selectStockId = value.split('-')[1]
      this.selectStockName = value.split('-')[2]
      this.showResult = true
      EventBus.$emit('search', false)
    },
    searchStock(value) {
      search(value).then(res => {
        if (res.code === 0 && res.data !== null) {
          this.dataSource = res.data.slice(0, 10).map(stock => {
            return {
              id: stock.id.toString(),
              name: stock.name,
              tsCode: stock.tsCode
            }
          })
        } else {
          this.dataSource = null
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/default.less";
</style>
