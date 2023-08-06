<template>
  <div class="dashboard">
    <TotalStatistics />
    <MiddleChart />
  </div>
</template>

<script lang="ts" setup>
import TotalStatistics from './c-cpns/TotalStatistics.vue'
import MiddleChart from './c-cpns/MiddleChart.vue'
import useAnalysisStore from '@/store/analysis'

const analysisStore = useAnalysisStore()
analysisStore.fetchGetAmountListAction()
</script>

<style scoped>
.base-echart {
  height: 300px;
}
</style>
