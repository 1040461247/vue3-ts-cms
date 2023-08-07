<template>
  <div class="buttom-chart">
    <el-row :gutter="10">
      <el-col v-bind="responsive">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>分类商品的销量</span>
            </div>
          </template>
          <el-skeleton :rows="5" animated :loading="goodsCategorySale.length === 0">
            <LineEchart v-bind="mapGoodsCategorySale" />
          </el-skeleton>
        </el-card>
      </el-col>
      <el-col v-bind="responsive">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>分类商品的收藏</span>
            </div>
          </template>
          <el-skeleton :rows="5" animated :loading="goodsCategoryFavor.length === 0">
            <BarEchart v-bind="mapGoodsCateforyFavor" />
          </el-skeleton>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import useAnalysisStore from '@/store/analysis'
import { LineEchart, BarEchart } from '@/components/page-echarts'

const responsive = {
  xl: 12,
  lg: 12,
  md: 12,
  sm: 12,
  xs: 24
}

const analysisStore = useAnalysisStore()
const { goodsCategorySale, goodsCategoryFavor } = storeToRefs(analysisStore)

const mapGoodsCategorySale = computed(() => {
  const lineData: {
    axisData: string[]
    seriesData: any[]
  } = { axisData: [], seriesData: [] }

  goodsCategorySale.value.forEach((item) => {
    lineData.axisData.push(item.name)
    lineData.seriesData.push(item.goodsSale)
  })

  return lineData
})

const mapGoodsCateforyFavor = computed(() => {
  const barData: {
    axisData: string[]
    seriesData: any[]
  } = { axisData: [], seriesData: [] }

  goodsCategoryFavor.value.forEach((item) => {
    barData.axisData.push(item.name)
    barData.seriesData.push(item.goodsFavor)
  })

  return barData
})
</script>

<style lang="less" scoped>
.el-col {
  margin-bottom: 10px;
}
</style>
