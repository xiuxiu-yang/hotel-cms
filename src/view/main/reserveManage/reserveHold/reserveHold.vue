<template>
  <div class="reserveHold">
    <search-content
      v-bind="tableConfig"
      @handlerDeleteClick="handlerDelete"
      @handlerUpdateClick="handlerUpdate"
    ></search-content>
    <search-dialog ref="dialogRef" :dialogConfig="dialogConfig"></search-dialog>
  </div>
</template>

<script>
import { inject, ref } from 'vue'

import { useStore } from 'vuex'

import searchContent from '@/components/searchContent/searchContent.vue'
import searchDialog from '@/components/searchDialog/searchDialog.vue'

import dialogHooks from '@/hooks/dialogHooks'
import tableConfig from './config/tableConfig'
import dialogConfig from './config/dialogConfig'
export default {
  components: {
    searchContent,
    searchDialog
  },
  setup() {
    const store = useStore()
    const id = inject('id')
    const dialogRef = ref()
    store.dispatch('main/getRoomOrderAction', { id: id.value, status: '1' })
    const [handlerUpdate, handlerDelete] = dialogHooks(
      dialogRef,
      dialogConfig
    )
    return {
      dialogRef,
      tableConfig,
      dialogConfig,
      handlerDelete,
      handlerUpdate
    }
  }
}
</script>

<style lang="scss" scoped></style>
