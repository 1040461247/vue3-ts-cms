<template>
  <div class="total-statistics">
    <template v-for="item in amountList" :key="item.title">
      <el-card class="box-card">
        <div class="top">
          <div class="head">
            <span>{{ item.title }}</span>
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
      </el-card>
    </template>
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
</script>

<style lang="less" scoped>
hr {
  color: rgba(0, 0, 0, 0.1);
}
.total-statistics {
  display: flex;
  justify-content: space-between;
  color: #303133;

  .el-card {
    width: 24%;
  }
}

.top {
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #92969a;

    span {
      font-size: 14px;
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
