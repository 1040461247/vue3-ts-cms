<template>
  <div class="user">
    <UserSearch @query-click="onQuery" @reset-click="onReset" class="user-pane" :search-config="searchConfig" />
    <UserContent class="user-pane" ref="contentRef" @create-user="onCreateUser" @edit-user="onEditUser" />
    <UserModal ref="modalRef" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// import UserSearch from './c-cpns/Search.vue'
import UserSearch from '@/components/page/Search.vue'
import UserContent from './c-cpns/Content.vue'
import UserModal from './c-cpns/Modal.vue'
import searchConfig from './config/search.config'

const contentRef = ref<InstanceType<typeof UserContent>>()
function onQuery(formData: any) {
  contentRef.value?.fetchUserList(formData)
}
function onReset() {
  contentRef.value?.fetchUserList()
}

const modalRef = ref<InstanceType<typeof UserModal>>()
function onCreateUser() {
  modalRef.value?.setDialogVisible()
}
function onEditUser(row: any) {
  modalRef.value?.setDialogVisible(row, false)
}
</script>

<style scoped lang="less"></style>
