<template>
  <div class="menu">
    <MenuContent :content-config="contentConfig" />
  </div>
</template>

<script lang="ts" setup>
import MenuContent from '@/components/page/Content.vue'
import contentConfig from './config/content.config'
</script>

<style scoped></style>
