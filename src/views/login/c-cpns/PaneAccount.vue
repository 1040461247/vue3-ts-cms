<template>
  <div class="pane-account">
    <el-form :model="account" label-width="60px" :rules="accountRoles" status-icon ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

import useLoginStore from '@/store/login'
import useMainStore from '@/store/main'
import { localCache } from '@/utils/cache'
import { mapMenusToRoutes } from '@/utils/map-menus'

import type { FormRules, FormInstance } from 'element-plus'
import type { IAccount } from '@/types'

const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'

const account = reactive<IAccount>({
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PASSWORD) ?? ''
})

const accountRoles: FormRules = {
  name: [
    {
      required: true,
      message: '请输入帐号~',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z0-9]{3,20}$/,
      message: '请输入3-20位的字母或数字~',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码~',
      trigger: 'blur'
    }
  ]
}

defineExpose({
  loginAction
})

const loginStore = useLoginStore()
const mainStore = useMainStore()
const formRef = ref<FormInstance>()
const router = useRouter()

function loginAction(isRemPwd: boolean) {
  formRef.value?.validate(async (valid, fails) => {
    if (valid) {
      const { code, msg } = await loginStore.loginAccountAction(account)

      if (code === 1) {
        ElMessage.success('登陆成功~')

        // 动态注册路由
        const routes = mapMenusToRoutes(loginStore.userMenus)
        routes.forEach((route) => router.addRoute('main', route))

        // 请求全局数据
        mainStore.fetchEntireDataAction()

        // 跳转页面
        router.push({ name: 'main' })

        // 记住密码
        if (isRemPwd) {
          localCache.setCache(CACHE_NAME, account.name)
          localCache.setCache(CACHE_PASSWORD, account.password)
        } else {
          localCache.removeCache([CACHE_NAME, CACHE_PASSWORD])
        }
      } else if (code === 0) {
        ElMessage.error(msg)
      }
    } else {
      const firstFailKey = Object.keys(fails as object)[0]
      const firstFailMsg = fails![firstFailKey][0].message
      ElMessage.error(firstFailMsg)
    }
  })
}
</script>

<style lang="less" scoped></style>
