<template>
  <div>
    <div class="search-input-wrapper">
      <a-select
        class="search-input"
        size="large"
        placeholder="请选择行业"
        @change="confirmSearch"
      >
        <a-select-option v-for="(ind,index) in dataSource" :key="index" :value="ind">{{
            allIndustry[ind]
          }}
        </a-select-option>
      </a-select>

    </div>
    <div class="search-result-wrapper" v-if="showResult">
      <!--      <div style="flex: 0 0 42%">-->
      <IndustryNewsRelation :industry-id="Number(selectIndustryId)"
                            :industry-name="selectIndustryName"
      ></IndustryNewsRelation>
      <!--      </div>-->
      <!--      <div style="flex: 0 0 55%;margin-left: 3%">-->
      <!--        <IndustryNewsGraph :industry-id="Number(selectIndustryId)"></IndustryNewsGraph>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
import EventBus from '@/views/KnowledgeGraph/event-bus'
import IndustryNewsRelation from '@/components/knowledge-graph/industry/IndustryNewsRelation'
import IndustryNewsGraph from '@/components/knowledge-graph/industry/IndustryNewsGraph'
import { Select } from 'ant-design-vue'
import { getAllIndustry } from '@/api/knowledge-graph'

export default {
  name: 'IndustryMode',
  components: {
    IndustryNewsRelation,
    // IndustryNewsGraph,
    ASelectOption: Select.Option
  },
  data() {
    return {
      showResult: false,
      selectIndustryId: '',
      selectIndustryName: '',
      dataSource: [],
      allIndustry: {}
    }
  },
  mounted() {
    getAllIndustry().then(res => {
      const allIndustryId = []
      const industryDict = {}
      res.data.forEach(ind => {
        allIndustryId.push(ind.industryId.toString())
        industryDict[ind.industryId] = ind.industryName
      })
      this.dataSource = allIndustryId
      this.allIndustry = industryDict
    })
  },
  methods: {
    confirmSearch(value) {
      console.log(value)
      this.selectIndustryId = value // 选中的行业id
      this.selectIndustryName = this.allIndustry[value]
      this.showResult = true
      EventBus.$emit('search', false)
    }
  }

}
</script>

<style scoped lang="less">
@import "../../../assets/default.less";
</style>
