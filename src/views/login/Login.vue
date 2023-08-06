<template>
  <div class="login">
    <Panel />
  </div>
</template>

<script setup lang="ts">
import Panel from './c-cpns/Panel.vue'
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  background: url('@/assets/img/login-bg.svg');
}
</style>
