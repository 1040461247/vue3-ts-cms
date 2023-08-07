<template>
  <div class="category">
    <Search :search-config="searchConfig" @query-click="onQueryClick" @reset-click="onResetClick" />
    <Content :content-config="contentConfig" ref="contentRef" @create-click="onCreateClick" @edit-click="onEditClick" />
    <Modal :modal-config="modalConfig" ref="modalRef" />
  </div>
</template>

<script lang="ts" setup>
import Search from '@/components/page/Search.vue'
import Content from '@/components/page/Content.vue'
import Modal from '@/components/page/Modal.vue'

import searchConfig from './config/search.config.ts'
import contentConfig from './config/content.config.ts'
import modalConfig from './config/modal.config.ts'

import usePageContent from '@/hooks/usePageContent.ts'
import usePageModal from '@/hooks/usePageModal.ts'

const { contentRef, onQueryClick, onResetClick } = usePageContent()
const { modalRef, onCreateClick, onEditClick } = usePageModal()
</script>

<style scoped></style>
