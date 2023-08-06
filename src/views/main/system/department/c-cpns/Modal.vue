<template>
  <div class="modal">
    <el-dialog v-model="centerDialogVisible" :title="isCreateRef ? '新建部门' : '编辑部门'" width="30%" center>
      <div class="content">
        <el-form :model="formData" label-width="80px">
          <el-form-item label="部门名">
            <el-input v-model="formData.name" placeholder="请输入部门名" size="large" />
          </el-form-item>
          <el-form-item label="部门领导">
            <el-input v-model="formData.leader" placeholder="请输入部门领导" size="large" />
          </el-form-item>
          <el-form-item label="父级部门">
            <el-select v-model="formData.parentId" placeholder="请选择父级部门" size="large" style="width: 100%">
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
  leader: '',
  parentId: ''
})

const mainStore = useMainStore()
const { entireDepartments } = storeToRefs(mainStore)
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
    systemStore.createPageAction('department', formData)
  } else {
    systemStore.updatePageByIdAction('department', formData, userInfoRef.value?.id)
  }
}
</script>

<style lang="less" scoped>
.content {
  padding-right: 10px;
}
</style>
