<template>
  <div class="goods">
    <Search :search-config="searchConfig" @query-click="onQueryClick" @reset-click="onResetClick" />
    <Content :content-config="contentConfig" ref="contentRef" @create-click="onCreateClick" @edit-click="onEditClick">
      <template #img="{ row }">
        <img :src="row.imgUrl" class="goodsImg" />
      </template>
    </Content>
    <Modal :modal-config="modalConfig" ref="modalRef">
      <template #img>
        <el-upload
          class="avatar-uploader"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </template>
    </Modal>
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

<style scoped>
.goodsImg {
  width: 100%;
}
</style>
