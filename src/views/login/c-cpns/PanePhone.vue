<template>
  <div class="pane-phone">
    <el-form :model="phone" label-width="70px" :rules="phoneRules" status-icon ref="formRef">
      <el-form-item label="手机号" prop="phoneNum">
        <el-input v-model="phone.phoneNum" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="phone.code" class="code-input" />
        <el-button type="primary" class="code-btn">获取验证码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

import type { FormRules } from 'element-plus'
import type { IPhone } from '@/types/login'

const phone = reactive<IPhone>({
  phoneNum: '',
  code: ''
})

const phoneRules: FormRules = {
  phoneNum: [
    {
      required: true,
      message: '请输入手机号~',
      trigger: 'blur'
    },
    {
      pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
      message: '请输入正确的手机号~',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      message: '请输入验证码~',
      trigger: 'blur'
    }
  ]
}
</script>

<style lang="less" scoped>
.code-input {
  flex: 2;
  margin-right: 10px;
}

.code-btn {
  flex: 1;
}
</style>
