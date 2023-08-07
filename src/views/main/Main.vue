<template>
  <div class="main">
    <el-container class="main-container">
      <el-aside :width="isFold ? '60px' : '200px'" class="aside" v-if="!hidAside">
        <Aside :isFold="isFold" />
      </el-aside>
      <el-drawer
        v-model="showDrawer"
        direction="ltr"
        size="200px"
        :with-header="false"
        @close="isFold = true"
        @open="isFold = false"
        v-else
      >
        <Aside :isFold="isFold" />
      </el-drawer>
      <el-container class="content-container">
        <el-header class="header">
          <Header @menu-fold-change="menuFoldChange" :isFold="isFold" />
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

const isFold = ref(window.innerWidth <= 992 ? true : false)
function menuFoldChange() {
  isFold.value = !isFold.value

  if (hidAside.value) {
    showDrawer.value = true
  }
}

// 当屏幕宽度小于992px时，aside以抽屉展示
const showDrawer = ref(false)
const hidAside = ref(window.innerWidth <= 992 ? true : false)
window.addEventListener('resize', (event) => {
  if (window.innerWidth <= 992) {
    hidAside.value = true
    isFold.value = true
  } else {
    hidAside.value = false
    isFold.value = false
  }
})
</script>

<style lang="less" scoped>
.el-drawer {
  .aside {
    margin: -20px;
  }
}

.main-container {
  height: 100vh;

  .aside {
    overflow: hidden;
    transition: width 0.5s;
  }
  .el-main {
    background-color: #f5f5f5;
  }
}
</style>
