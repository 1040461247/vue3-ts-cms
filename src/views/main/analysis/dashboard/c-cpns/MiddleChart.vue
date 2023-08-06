<template>
  <div class="middle-chart">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>分类图数据</span>
        </div>
      </template>
      <PieEchart />
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>分类图数据</span>
        </div>
      </template>
      <MapEchart :map-data="mapGoodsAddressSale" />
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>分类图数据</span>
        </div>
      </template>
      <RoseEchart :rose-data="mapGoodsCategorySale" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { PieEchart, LineEchart, RoseEchart, MapEchart } from '@/components/page-echarts'
import useAnalysisStore from '@/store/analysis'

const analysisStore = useAnalysisStore()
const { goodsCategorySale, goodsAddressSale } = storeToRefs(analysisStore)

const mapGoodsCategorySale = computed(() => {
  const res = goodsCategorySale.value.map((item) => {
    return { name: item.name, value: item.goodsSale }
  })
  return res
})

const mapGoodsAddressSale = computed(() => {
  const res = goodsAddressSale.value.map((item) => {
    return { name: item.address, value: item.count }
  })
  return res
})
</script>

<style lang="less" scoped>
.middle-chart {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;

  .el-card {
    width: 32.4%;
  }
}
</style>
