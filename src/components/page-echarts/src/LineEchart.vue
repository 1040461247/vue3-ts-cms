<template>
  <div class="line-echart">
    <BaseEchart :option="option" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseEchart from './BaseEchart.vue'

interface IProps {
  axisData: string[]
  seriesData: any[]
}
const props = defineProps<IProps>()

const option = computed(() => ({
  legend: {
    data: ['分别销量']
  },
  tooltip: {
    show: true,
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  toolbox: {
    feature: {
      saveAsImage: { show: true }
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: props.axisData
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '分别销量',
      data: props.seriesData,
      type: 'line',
      areaStyle: {}
    }
  ]
}))
</script>

<style lang="less" scoped></style>
