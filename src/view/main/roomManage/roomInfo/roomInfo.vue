<template>
  <div class="roomInfo">
    <search-content
      v-bind="tableConfig"
      @handlerDeleteClick="handlerDelete"
      @handlerUpdateClick="handlerUpdate"
      @handlerCreateClick="handlerCreate"
      @handlerMoreDeleteClick="handlerMoreDelete"
    ></search-content>
    <search-dialog ref="dialogRef" :dialogConfig="dialogConfig" :request="request"></search-dialog>
  </div>
</template>

<script>
import { ref, inject, computed } from 'vue'

import { useStore } from 'vuex'

import SearchContent from '@/components/searchContent/searchContent.vue'
import SearchDialog from '@/components/searchDialog/searchDialog.vue'

import tableConfig from './config/tableConfig'
import dialogConfig from './config/dialogConfig'
export default {
  setup() {
    const store = useStore()
    const dialogRef = ref()
    const request = ref({})
    const id = inject('id')
    store.dispatch('main/getHotelInfoAction', { id: id.value })
    store.dispatch('main/getHotelTypeAction')
    const hotelType = computed(() => {
      const type = store.state.main.hotelType
      if (type) {
        return type.map((item) => ({ label: item.name, value: item.id }))
      }
      return []
    })
    const handlerUpdate = (row) => {
      dialogRef.value.dialogTableVisible = true
      for (const i of dialogConfig.formItem) {
        if (i.field === 'typeId') {
          i.options = hotelType.value
        }
      }
      for (const i of dialogConfig.formItem) {
        dialogRef.value.formData[i.field] = row[i.field]
      }
      request.value = { url: 'main/updateRoomInfoAction', row, pageId: id.value }
    }
    const handlerDelete = (row) => {
      store.dispatch('main/deleteRoomInfoAction', { idList: [ row.id ], id: id.value })
    }
    const handlerMoreDelete = (row) => {
      store.dispatch('main/deleteRoomInfoAction', { idList: [ ...row ], id: id.value })
    }
    const handlerCreate = () => {
      dialogRef.value.dialogTableVisible = true
      for (const i of dialogConfig.formItem) {
        if (i.type === 'select') {
          i.options = hotelType.value
        }
      }
      for (const i of dialogConfig.formItem) {
        dialogRef.value.formData[i.field] = ''
      }
      request.value = { url: 'main/insertRoomInfoAction', pageId: id.value }
    }
    return {
      handlerUpdate,
      handlerDelete,
      tableConfig,
      dialogConfig,
      dialogRef,
      handlerCreate,
      handlerMoreDelete,
      request
    }
  },
  components: { SearchContent, SearchDialog }
}
</script>

<style lang="scss" scoped></style>
