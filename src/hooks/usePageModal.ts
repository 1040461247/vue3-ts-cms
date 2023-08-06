import { ref } from 'vue'
import type Modal from '@/components/page/Modal.vue'

type EditCB = (originData: any) => void
type createCB = () => void

function usePageModal(editCallback?: EditCB, createCallback?: createCB) {
  const modalRef = ref<InstanceType<typeof Modal>>()
  function onCreateClick() {
    modalRef.value?.setDialogVisible()

    if (createCallback) createCallback()
  }
  function onEditClick(originData: any) {
    modalRef.value?.setDialogVisible(originData, false)

    if (editCallback) editCallback(originData)
  }

  return {
    modalRef,
    onCreateClick,
    onEditClick
  }
}

export default usePageModal
