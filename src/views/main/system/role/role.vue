<template>
  <div class="role">
    <RoleSearch :search-config="searchConfig" @query-click="onQueryClick" @reset-click="onResetClick" />
    <RoleContent
      :content-config="contentConfig"
      @create-click="onCreateClick"
      @edit-click="onEditClick"
      ref="contentRef"
    />
    <RoleModal ref="modalRef" :modal-config="modalConfig" :other-info="otherInfo">
      <template #menus>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="onCheck"
        />
      </template>
    </RoleModal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import type { ElTree } from 'Element-plus/lib'

import RoleSearch from '@/components/page/Search.vue'
import RoleContent from '@/components/page/Content.vue'
import RoleModal from '@/components/page/Modal.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
import useMainStore from '@/store/main'
import { mapMenuListToIds } from '@/utils/map-menus'
import { nextTick } from 'vue'

const { onQueryClick, onResetClick, contentRef } = usePageContent()
const { onCreateClick, onEditClick, modalRef } = usePageModal(editCallback, createCallback)

const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)

const otherInfo = ref({})
function onCheck(_: any, data: any) {
  const menuList = [...data.checkedKeys, ...data.halfCheckedKeys]
  otherInfo.value = { menuList }
}

// 编辑时，树形菜单回显逻辑
const treeRef = ref<InstanceType<typeof ElTree>>()
function editCallback(originData: any) {
  const ids = mapMenuListToIds(originData.menuList)
  nextTick(() => {
    treeRef.value?.setCheckedKeys(ids)
  })
}

// 新建时，清除树形菜单的缓存数据
function createCallback() {
  treeRef.value?.setCheckedKeys([])
}
</script>

<style scoped></style>
