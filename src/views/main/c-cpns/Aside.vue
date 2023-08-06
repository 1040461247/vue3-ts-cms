<template>
  <div class="aside">
    <div class="logo">
      <img src="@/assets/img/logo.svg" alt="logo" />
      <h2 v-show="!isFold">RX-CMS</h2>
    </div>

    <el-menu
      text-color="#b7bdc3"
      active-text-color="#fff"
      background-color="#001529"
      :default-active="defaultActive"
      :collapse="isFold"
      :collapse-transition="false"
    >
      <el-sub-menu v-for="item in userMenus" :key="item.id" :index="String(item.id)">
        <template #title>
          <el-icon>
            <component :is="item.icon.replace('el-icon-', '')"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </template>

        <el-menu-item
          v-for="subitem in item.children"
          :key="subitem.id"
          :index="String(subitem.id)"
          @click="onRouteJump(subitem.url)"
        >
          <template #title>
            {{ subitem.name }}
          </template>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useLoginStore from '@/store/login'
import { mapPathToMenu } from '@/utils/map-menus'

defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

const loginStore = useLoginStore()
const userMenus = loginStore.userMenus
const router = useRouter()

// 默认选中菜单
const route = useRoute()
const defaultActive = computed(() => {
  const activeMenu = mapPathToMenu(route.path, userMenus)
  return activeMenu.id + ''
})

function onRouteJump(url: string) {
  router.push(url)
}
</script>

<style lang="less" scoped>
.aside {
  height: 100%;
  background-color: var(--primary-color);
  color: #fff;
}

.logo {
  display: flex;
  align-items: center;
  height: 48px;
  padding-left: 18px;

  img {
    width: 30px;
    height: 30px;
  }

  h2 {
    font-size: 20px;
    white-space: nowrap;
    margin-left: 10px;
  }
}

.el-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: var(--second-color);
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: var(--act-color);
  }
}
</style>
