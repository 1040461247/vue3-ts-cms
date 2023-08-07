<template>
  <div class="total-statistics">
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item.title">
        <el-col v-bind="responsive">
          <el-card class="box-card">
            <el-skeleton :rows="5" animated :loading="!item.title">
              <div class="top">
                <div class="head">
                  <span class="title">{{ item.title }}</span>
                  <el-tooltip class="box-item" effect="light" :content="item.tip" placement="top-start">
                    <el-icon size="14"><Warning /></el-icon>
                  </el-tooltip>
                </div>
                <AniNum :show-num="item.number1" class="content" />
              </div>
              <div class="bottom">
                <span>{{ item.title }}</span>
                <AniNum :show-num="item.number2" class="content" />
              </div>
            </el-skeleton>
          </el-card>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import useAnalysisStore from '@/store/analysis'
import AniNum from './Countup.vue'

const analysisStore = useAnalysisStore()
analysisStore.fetchGetAmountListAction()
const { amountList } = storeToRefs(analysisStore)

const responsive = {
  xl: 6,
  lg: 6,
  md: 12,
  sm: 12,
  xs: 24
}
</script>

<style lang="less" scoped>
.el-col {
  margin-bottom: 10px;
}

hr {
  color: rgba(0, 0, 0, 0.1);
}

.total-statistics {
  color: #303133;
}

.top {
  .head {
    display: flex;
    justify-content: space-between;
    color: #92969a;

    .title {
      font-size: 14px;
      margin-bottom: 8px;
    }
    .el-icon {
      cursor: pointer;
    }
  }

  .content {
    line-height: 35px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    font-size: 26px;
  }
}

.bottom {
  font-size: 14px;
  line-height: 38px;
}
</style>
