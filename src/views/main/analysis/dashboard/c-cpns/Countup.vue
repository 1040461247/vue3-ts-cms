<template>
  <span class="countup" ref="showNumRef">
    {{ showNum }}
  </span>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { CountUp } from 'countup.js'

interface IProps {
  showNum: number
}
const props = defineProps<IProps>()

const showNumRef = ref<HTMLElement>()
onMounted(() => {
  let countIns = new CountUp(showNumRef.value, props.showNum)
  if (!countIns.error) {
    countIns.start()
  } else {
    console.error(countIns.error)
  }
})
</script>

<style lang="less" scoped></style>
