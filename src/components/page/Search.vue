<template>
  <div class="search" v-if="isQuery">
    <el-form label-width="70px" size="large" :model="formData" ref="formRef">
      <el-row :gutter="30">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col v-bind="responsive">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input :placeholder="item.placeholder" v-model="formData[item.prop]" />
              </template>
              <template v-else-if="item.type === 'date-picker'">
                <el-date-picker
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  size="large"
                  v-model="formData[item.prop]"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select :placeholder="item.placeholder" v-model="formData[item.prop]">
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
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
import isPermission from '@/utils/isPermission'
import type { FormInstance } from 'element-plus'

const responsive = {
  xl: 8,
  lg: 8,
  md: 12,
  sm: 24,
  xs: 24
}

interface IProps {
  searchConfig: {
    pageName: string
    formItems: any[]
  }
}
const props = defineProps<IProps>()
const emit = defineEmits(['queryClick', 'resetClick'])

// 获取权限
const isQuery = isPermission(`${props.searchConfig.pageName}:query`)

// 表单数据
const initialFormData: any = {}
for (const item of props.searchConfig.formItems) {
  initialFormData[item.prop] = item.initialVal ?? ''
}
const formData = reactive(initialFormData)

// 按钮事件监听
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
