<template>
  <div class="personal-center">
    <div class="personal-center-left fl">
      <div class="user-avatar">
        <img src="../assets/user-image.png" alt="" />
      </div>
      <div class="user-name">User_ABC</div>
      <div class="user-divider"></div>
      <ul class="personal-center-side-list">
        <li>
          <img
            class="personal-center-icon"
            src="../assets/personal-center.png"
            alt=""
          />
          <div style="color:#1890ff">个人中心</div>
        </li>
        <li>
          <img class="stock-pool-icon" src="../assets/stock-pool.png" alt="" />
          <div>股票池</div>
        </li>
      </ul>
    </div>
    <div class="personal-center-right fr">
      <SearchFollowStock class="search"></SearchFollowStock>
      <div class="follow-stock">
        <a-table
          :row-key="d => 'sr' + d.id"
          :data-source="stockData"
          :loading="stockDataLoading"
          :pagination="false"
        >
          <a-table-column align="center" title="股票代码">
            <template slot-scope="text, record">
              <a-button type="link" @click="toStock(record.id, record.code)">{{
                record.code
              }}</a-button>
            </template>
          </a-table-column>
          <a-table-column align="center" title="股票名称">
            <template slot-scope="text, record">
              <a-button type="link" @click="toStock(record.id, record.code)">{{
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
        </a-table>
      </div>
      <div class="follow-stock-footer">
        <a-pagination
          v-model="pageNum"
          :page-size="pageSize"
          :total="totalPages * pageSize"
          @change="onPageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SearchFollowStock from '@/components/SearchFollowStock'

export default {
  components: {
    SearchFollowStock
  },
  data() {
    return {
      stockData: [],
      stockDataLoading: false,
      pageNum: 1,
      pageSize: 8,
      totalPages: 10
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
  width: 156px;
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
  width: 1280px;
  min-height: 1000px;
}
.stock-rank {
  margin-bottom: 1rem;
  table {
    border: 1px solid #e8e8e8;
  }
}
.follow-stock{
  margin-top: 15px;
}
.follow-stock-footer{
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
