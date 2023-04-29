<template>
  <div>
    <div class="search-input-wrapper">
      <template>
        <span class="hint">持股数：</span>
        <a-input-number :min="0" v-model="holderNumMinQuery" @pressEnter="search" />
        <span class="split">-</span>
        <a-input-number :min="0"
                        v-model="holderNumMaxQuery"
                        :formatter="(value)=>{return value==='' ? '不限':value}"
                        @pressEnter="search"
        />
      </template>
      <template>
        <span class="hint" style="margin-left: 20px">被持股数：</span>
        <a-input-number :min="0" v-model="holdeeNumMinQuery" @pressEnter="search" />
        <span class="split">-</span>
        <a-input-number :min="0"
                        v-model="holdeeNumMaxQuery"
                        :formatter="(value)=>{return value===''? '不限':value.toString()}"
                        @pressEnter="search"
        />
      </template>
      <a-button style="margin-left: 20px" type="primary" icon="search" @click="search">搜索</a-button>
    </div>
    <div class="search-result-wrapper" v-if="showResult">
      <HolderRelation :request="request"></HolderRelation>
    </div>
  </div>
</template>

<script>
import { message } from 'ant-design-vue'
import EventBus from '@/views/KnowledgeGraph/event-bus'
import HolderRelation from '@/components/knowledge-graph/holder/HolderRelation'

export default {
  name: 'HolderMode',
  components: {
    HolderRelation
  },
  data() {
    return {
      showResult: false,
      holderNumMinQuery: 0, // 持有的数量
      holderNumMaxQuery: '',
      holdeeNumMinQuery: 0, // 被持有的数量
      holdeeNumMaxQuery: '',
      request: {}
    }
  },
  methods: {
    search() {
      console.log(Number(this.holderNumMaxQuery))
      const inValid = (this.holderNumMaxQuery !== '' && this.holderNumMinQuery > Number(this.holderNumMaxQuery)) ||
        (this.holdeeNumMaxQuery !== '' && this.holdeeNumMinQuery > Number(this.holdeeNumMaxQuery))
      if (inValid) {
        message.warning('请输入有效的范围')
      } else {
        const request = {
          holderNumMinQuery: this.holderNumMinQuery,
          holdeeNumMinQuery: this.holdeeNumMinQuery
        }
        if (this.holderNumMaxQuery !== '') {
          request.holderNumMaxQuery = this.holderNumMaxQuery
        }
        if (this.holdeeNumMaxQuery !== '') {
          request.holdeeNumMaxQuery = this.holdeeNumMaxQuery
        }
        this.showResult = true
        this.request = request
        EventBus.$emit('search', false)
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/default.less";

.hint {
  font-weight: 500;
}

.split {
  display: inline-block;
  width: 15px;
  line-height: 32px;
  text-align: center
}
</style>
