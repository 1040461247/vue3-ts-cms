<template>
  <div class="modal">
    <el-dialog
      v-model="centerDialogVisible"
      :title="isCreateRef ? modalConfig.title.newTitle : modalConfig.title.editTitle"
      width="30%"
      center
    >
      <div class="content">
        <el-form :model="formData" label-width="80px">
          <template v-for="item in modalConfig.formItems" :key="item.prop">
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
                <el-select :placeholder="item.placeholder" v-model="formData[item.prop]" style="width: 100%">
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>

              <template v-else-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
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

interface IProps {
  modalConfig: {
    pageName: string
    title: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
  otherInfo?: any
}
const props = defineProps<IProps>()
defineExpose({ setDialogVisible })

const initialFormData: any = {}
for (const formItem of props.modalConfig.formItems) {
  initialFormData[formItem.prop] = ''
}
const formData = reactive<any>(initialFormData)

const systemStore = useSystemStore()

const centerDialogVisible = ref(false)

const originDataRef = ref<any>(null)
const isCreateRef = ref(true)
function setDialogVisible(originData?: any, isCreate: boolean = true) {
  centerDialogVisible.value = true
  isCreateRef.value = isCreate

  if (isCreate) {
    originDataRef.value = null
    for (const key in formData) {
      formData[key] = ''
    }
  } else {
    originDataRef.value = originData
    for (const key in formData) {
      formData[key] = originData[key]
    }
  }
}

async function onConfirm() {
  centerDialogVisible.value = false
  const { pageName } = props.modalConfig

  const finalData = { ...props.otherInfo, ...formData }

  if (isCreateRef.value) {
    systemStore.createPageAction(pageName, finalData)
  } else {
    systemStore.updatePageByIdAction(pageName, finalData, originDataRef.value?.id)
  }
}
</script>

<style lang="less" scoped>
.content {
  padding-right: 10px;
}
</style>
