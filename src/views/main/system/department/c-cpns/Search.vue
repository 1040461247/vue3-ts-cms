<template>
  <div class="search">
    <el-form label-width="70px" size="large" :model="formData" ref="formRef">
      <el-row :gutter="30">
        <el-col :span="8">
          <el-form-item label="id" prop="id">
            <el-input placeholder="请输入部门id" v-model="formData.id" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门名称" prop="name">
            <el-input placeholder="请输入部门名称" v-model="formData.name" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              size="large"
              v-model="formData.createAt"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="footer" justify="end">
        <el-form-item>
          <el-button size="large" icon="refresh" @click="onResetForm">重置</el-button>
          <el-button size="large" type="primary" icon="search" @click="onQuery">搜索</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'

const emit = defineEmits(['queryClick', 'resetClick'])

const formData = reactive({
  id: '',
  name: '',
  createAt: ''
})

const formRef = ref<FormInstance>()
function onResetForm() {
  formRef.value?.resetFields()
  emit('resetClick')
}
function onQuery() {
  emit('queryClick', formData)
}
</script>

<style lang="less" scoped>
.search {
  margin-bottom: 20px;
  padding: 20px;
  background: #fff;
  border-radius: 3px;
  .el-form {
    padding: 10px 10px 0 0;
  }
}

.el-select {
  width: 100%;
}

.footer {
  height: 50px;
}
</style>
