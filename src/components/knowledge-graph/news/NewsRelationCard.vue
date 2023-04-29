<template>
  <a-card style="width: 100%; height: 420px;margin-bottom: 20px;border-radius: 10px">
    <div style="display: flex;flex-direction: column; flex:0 0 50%">
      <a-descriptions bordered size="small">
        <div slot="title" class="name">
          <div class="text">{{ info.companyA.companyName.toString() }}</div>
          <div>
            <a-tag color="#108ee9">{{ info.companyA.companyId }}</a-tag>
            <a-tag color="blue">{{ info.companyA.industryName }}</a-tag>
          </div>
        </div>
        <a-description-item v-for="(item,index) in descriptions" :key="index" :label="item.label">
          {{ info.companyA.basicInfo[item.content] }}
          <span v-if="item.suffix">{{ item.suffix }}</span>
        </a-description-item>
      </a-descriptions>
      <a-divider></a-divider>
      <a-descriptions bordered size="small">
        <div slot="title" class="name">
          <div class="text">{{ info.companyB.companyName.toString() }}</div>
          <div>
            <a-tag color="#108ee9">{{ info.companyB.companyId }}</a-tag>
            <a-tag color="blue">{{ info.companyB.industryName }}</a-tag>
          </div>
        </div>
        <a-description-item v-for="(item,index) in descriptions" :key="index" :label="item.label">
          {{ info.companyB.basicInfo[item.content] }}
          <span v-if="item.suffix">{{ item.suffix }}</span>
        </a-description-item>
      </a-descriptions>
    </div>
    <a-divider type="vertical"></a-divider>
    <div style="flex: 0 0 49%; height: 100%">
      <a-descriptions :title="'关联资讯共'+info.newsAmount+'条'">
        <a-description-item label="最新资讯"></a-description-item>
      </a-descriptions>
      <a-timeline mode="left">
        <a-timeline-item v-for="(node,index) in info.timeline.slice(0,5)" :key="index">
          <a-tag color="blue">{{ node.time }}</a-tag>
          <a-popover :content="node.news"><span class="news">{{ node.news }}</span></a-popover>
        </a-timeline-item>
      </a-timeline>
    </div>
  </a-card>
</template>

<script>
import { Descriptions } from 'ant-design-vue'

export default {
  name: 'NewsRelationCard',
  props: {
    info: {}
  },
  components: {
    ADescriptionItem: Descriptions.Item
  },
  data() {
    const descriptions = [
      {
        label: '开盘价',
        content: 'open'
      },
      {
        label: '收盘价',
        content: 'close'
      },
      {
        label: '最高价',
        content: 'high'
      },
      {
        label: '最低价',
        content: 'low'
      },
      {
        label: '涨跌额',
        content: 'change'
      },
      {
        label: '涨跌幅',
        content: 'pct_chg'
      }
    ]
    return {
      descriptions
      // companyA: {
      //   companyId: '000001.SZ',
      //   companyName: '中信证券',
      //   industryName: '行业',
      //   basicInfo: {
      //     open: 0,
      //     high: 0,
      //     low: 0,
      //     close: 0,
      //     change: 0,
      //     pct_chg: 0
      //   }
      // },
      // companyB: {
      //   companyId: '000002.SZ',
      //   companyName: '中信XXX证券',
      //   industryName: '行业',
      //   basicInfo: {
      //     open: 0,
      //     high: 0,
      //     low: 0,
      //     close: 0,
      //     change: 0,
      //     pct_chg: 0
      //   }
      // },
      // timeline: Array(5).fill({
      //   time: '2020-01-02',
      //   news: '资讯'
      // })
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/default.less";

/deep/ .ant-card-body {
  display: flex !important;
}

.name {
  display: flex;
  flex-direction: column;

  .text {
    font-weight: 500;
    margin-bottom: 5px;
  }
}

/deep/ .ant-timeline {
}

.news {
  .overflow-hidden-height(1)
}
</style>
