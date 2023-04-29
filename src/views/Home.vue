<template>
  <div class="home">
    <!-- <stock-rank /> -->
    <personal-center />

  </div>
</template>

<script>
import StockRank from '@/components/invest-recommend/StockRank.vue'
import PersonalCenter from '@/views/PersonalCenter.vue'
export default {
  name: 'Home',
  components: {
    // StockRank,
    PersonalCenter
  },
  methods: {}
}
</script>
