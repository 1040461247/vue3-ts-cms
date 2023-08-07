<template>
  <div class="bar-echart">
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
  xAxis: {
    type: 'category',
    data: props.axisData
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: props.seriesData,
      type: 'bar'
    }
  ]
}))
</script>

<style lang="less" scoped></style>
