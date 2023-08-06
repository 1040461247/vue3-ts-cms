<template>
  <div class="main">
    <el-container class="main-container">
      <el-aside :width="isFold ? '60px' : '200px'" class="aside">
        <Aside :isFold="isFold" />
      </el-aside>
      <el-container class="content-container">
        <el-header class="header">
          <Header @menu-fold-change="menuFoldChange" />
        </el-header>
        <el-main class="content">
          <Content />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Aside from './c-cpns/Aside.vue'
import Header from './c-cpns/Header.vue'
import Content from './c-cpns/Content.vue'

const isFold = ref(false)
function menuFoldChange(foldStatus: boolean) {
  isFold.value = foldStatus
}
</script>

<style lang="less" scoped>
.main-container {
  height: 100vh;
}

.aside {
  transition: width 0.5s;
}

.el-main {
  background-color: #f5f5f5;
}
</style>
