<template>
  <div class="middle-chart">
    <el-row :gutter="10">
      <el-col v-bind="responsive">
        <el-card class="box-card">
          <el-skeleton :rows="5" animated :loading="goodsCategoryCount.length === 0">
            <template #header>
              <div class="card-header">
                <span>分类商品数量（饼图）</span>
              </div>
            </template>
            <PieEchart :data="mapGoodsCategoryCount" />
          </el-skeleton>
        </el-card>
      </el-col>
      <el-col v-bind="responsive">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>不同城市商品销量</span>
            </div>
          </template>
          <el-skeleton :rows="5" animated :loading="goodsCategorySale.length === 0">
            <MapEchart :map-data="mapGoodsAddressSale" />
          </el-skeleton>
        </el-card>
      </el-col>
      <el-col v-bind="responsive">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>分类商品数量（玫瑰图）</span>
            </div>
          </template>
          <el-skeleton :rows="5" animated :loading="goodsCategorySale.length === 0">
            <RoseEchart :rose-data="mapGoodsCategorySale" />
          </el-skeleton>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { PieEchart, LineEchart, RoseEchart, MapEchart } from '@/components/page-echarts'
import useAnalysisStore from '@/store/analysis'

const responsive = {
  xl: 8,
  lg: 8,
  md: 12,
  sm: 12,
  xs: 24
}

const analysisStore = useAnalysisStore()
const { goodsCategoryCount, goodsCategorySale, goodsAddressSale } = storeToRefs(analysisStore)

const mapGoodsCategoryCount = computed(() => {
  const res = goodsCategoryCount.value.map((item) => {
    return { name: item.name, value: item.goodsCount }
  })
  return res
})

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
.el-col {
  margin-bottom: 10px;
}
</style>
