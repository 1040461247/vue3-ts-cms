import { ref } from 'vue'
import type Content from '@/components/page/Content.vue'

function usePageContent() {
  const contentRef = ref<InstanceType<typeof Content>>()
  function onQueryClick(formData: any) {
    contentRef.value?.fetchPageList(formData)
  }
  function onResetClick() {
    contentRef.value?.fetchPageList()
  }

  return {
    contentRef,
    onQueryClick,
    onResetClick
  }
}

export default usePageContent
