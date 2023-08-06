<template>
  <div class="department">
    <DepartmentSearch @query-click="onQueryClick" @reset-click="onResetClick" :search-config="searchConfig" />
    <DepartmentContent
      @create-click="onCreateClick"
      @edit-click="onEditClick"
      ref="contentRef"
      :content-config="contentConfig"
    />
    <DepartmentModal ref="modalRef" :modal-config="modalConfigRef" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import useMainStore from '@/store/main'
import DepartmentSearch from '@/components/page/Search.vue'
import DepartmentContent from '@/components/page/Content.vue'
import DepartmentModal from '@/components/page/Modal.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'

import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

const { onQueryClick, onResetClick, contentRef } = usePageContent()
const { onCreateClick, onEditClick, modalRef } = usePageModal()

// 处理modalConfig
const mainStore = useMainStore()
const modalConfigRef = computed(() => {
  const options = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })

  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options?.push(...options)
    }
  })

  return modalConfig
})
</script>

<style scoped lang="less"></style>
