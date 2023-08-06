<template>
  <div class="base-echart">
    <div class="echart" ref="echartRef" style="height: 300px"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import * as echarts from 'echarts'
import type { EchartsOption } from 'echarts'

import ChinaJSON from '../data/china.json'

// 注册地图
echarts.registerMap('china', ChinaJSON)

interface IProps {
  option: EchartsOption
}
const props = defineProps<IProps>()

const echartRef = ref<HTMLElement>()
onMounted(() => {
  const echartInstance = echarts.init(echartRef.value!, 'light', {
    renderer: 'canvas'
  })

  watchEffect(() => echartInstance.setOption(props.option))

  window.addEventListener('resize', echartInstance.resize)
})
</script>

<style lang="less" scoped></style>
