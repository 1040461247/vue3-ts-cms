<template>
  <div class="header">
    <div class="fold" @click="onFoldIcon">
      <el-icon size="25">
        <Fold v-show="!isFold" />
        <Expand v-show="isFold" />
      </el-icon>
    </div>

    <div class="crumb">
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.name" :to="item.path">{{
          item.name
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="control">
      <div class="notice ctl-item">
        <el-icon><Bell /></el-icon>
      </div>
      <div class="message ctl-item">
        <el-icon><ChatDotRound /></el-icon>
      </div>
      <div class="postcard ctl-item">
        <el-icon><Postcard /></el-icon>
      </div>
      <div class="profile ctl-item">
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="30" />
            <span class="name">{{ username }}</span>
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="onExit">
                <el-icon><CircleClose /></el-icon>
                <span>退出系统</span>
              </el-dropdown-item>
              <el-dropdown-item divided>
                <el-icon><InfoFilled /></el-icon>
                <span>个人信息</span>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-icon><Unlock /></el-icon>
                <span>修改密码</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { localCache } from '@/utils/cache'
import { mapPathToBreadcrumbs } from '@/utils/map-menus'
import { TOKEN, USER_INFO, USER_MENUS } from '@/global/constants'

const props = defineProps<{ isFold: boolean }>()

const emit = defineEmits(['menuFoldChange'])
const router = useRouter()
const route = useRoute()

function onFoldIcon() {
  emit('menuFoldChange')
}

function onExit() {
  localCache.removeCache([TOKEN, USER_INFO, USER_MENUS])
  router.push('/login')
}

const breadcrumbs = computed(() => {
  const userMenus = localCache.getCache(USER_MENUS)
  return mapPathToBreadcrumbs(route.path, userMenus)
})

const username = computed(() => {
  return localCache.getCache(USER_INFO).name
})
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  height: 48px;
}

.fold {
  margin: 5px 10px 0 0;
  cursor: pointer;
}

.crumb {
  flex: 1;
}

.control {
  display: flex;
  align-items: center;

  .ctl-item {
    margin-right: 12px;
    cursor: pointer;
  }

  .profile .el-dropdown-link {
    display: flex;
    align-items: center;
    outline: none;

    .el-avatar {
      margin-right: 3px;
    }
  }
}
</style>
