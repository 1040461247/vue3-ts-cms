<template>
  <div class="panel">
    <div class="panel">
      <h1 class="title">后台管理系统</h1>

      <div class="tabs">
        <el-tabs type="border-card" stretch v-model="actTabName">
          <el-tab-pane name="account">
            <template #label>
              <el-icon class="label-icon"><UserFilled /></el-icon>
              <span>帐号登录</span>
            </template>
            <PaneAccount ref="paneAccountRef" />
          </el-tab-pane>

          <el-tab-pane name="phone">
            <template #label>
              <el-icon class="label-icon"><Iphone /></el-icon>
              <span>手机登录</span>
            </template>
            <PanePhone />
          </el-tab-pane>
        </el-tabs>
      </div>

      <div class="controlls">
        <el-checkbox v-model="isRemPwd" label="记住密码" />
        <el-link type="primary">忘记密码</el-link>
      </div>

      <el-button type="primary" size="large" class="login-btn" @click="onLoginHandle">立即登录</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import PaneAccount from './PaneAccount.vue'
import PanePhone from './PanePhone.vue'
import { localCache } from '@/utils/cache'

const isRemPwd = ref(localCache.getCache('isRemPwd') ?? false)
const actTabName = ref('account')
const paneAccountRef = ref<InstanceType<typeof PaneAccount>>()

watch(isRemPwd, (newVal) => {
  localCache.setCache('isRemPwd', newVal)
})

function onLoginHandle() {
  if (actTabName.value === 'account') {
    paneAccountRef.value?.loginAction(isRemPwd.value)
  } else if (actTabName.value === 'phone') {
    console.log('aaa')
  }
}
</script>

<style lang="less" scoped>
.panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 330px;
}

.title {
  margin-bottom: 20px;
}

.controlls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 8px 0;
}

.login-btn,
.tabs {
  width: 100%;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);

  .label-icon {
    margin-right: 5px;
  }
}
</style>
