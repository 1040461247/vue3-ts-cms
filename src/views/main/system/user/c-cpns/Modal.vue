<template>
  <div class="modal">
    <el-dialog v-model="centerDialogVisible" title="新建用户" width="30%" center>
      <div class="content">
        <el-form :model="formData" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="formData.name" placeholder="请输入用户名" size="large" />
          </el-form-item>
          <el-form-item label="真实姓名">
            <el-input v-model="formData.realname" placeholder="请输入真实姓名" size="large" />
          </el-form-item>
          <el-form-item label="密码" v-if="isCreateRef">
            <el-input v-model="formData.password" placeholder="请输入密码" show-password size="large" />
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="formData.cellphone" placeholder="请输入手机号码" size="large" />
          </el-form-item>
          <el-form-item label="选择角色">
            <el-select v-model="formData.roleId" placeholder="请选择角色" size="large" style="width: 100%">
              <el-option v-for="item in entireRoles" :key="item.id" :value="item.id">{{ item.name }}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门">
            <el-select v-model="formData.departmentId" placeholder="请选择部门" size="large" style="width: 100%">
              <el-option v-for="item in entireDepartments" :key="item.id" :value="item.id">{{ item.name }}</el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="onConfirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import useMainStore from '@/store/main'
import useSystemStore from '@/store/system'

const formData = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})

const mainStore = useMainStore()
const { entireRoles, entireDepartments } = storeToRefs(mainStore)
const systemStore = useSystemStore()

const centerDialogVisible = ref(false)

defineExpose({ setDialogVisible })

const userInfoRef = ref<any>(null)
const isCreateRef = ref(true)
function setDialogVisible(userInfo?: any, isCreate: boolean = true) {
  centerDialogVisible.value = true
  isCreateRef.value = isCreate

  if (isCreate) {
    userInfoRef.value = null
  } else {
    userInfoRef.value = userInfo
    for (const key in formData) {
      formData[key] = userInfo[key]
    }
  }
}

async function onConfirm() {
  centerDialogVisible.value = false

  if (isCreateRef.value) {
    systemStore.createUserAction(formData)
  } else {
    systemStore.updateUserByIdAction(formData, userInfoRef.value?.id)
  }
}
</script>

<style lang="less" scoped>
.content {
  padding-right: 10px;
}
</style>
