<template>
  <div class="userManage">
    <search-content
      v-bind="tableConfig"
      @handlerDeleteClick="handlerDelete"
      @handlerUpdateClick="handlerUpdate"
      @handlerMoreDeleteClick="handlerMoreDelete"
    ></search-content>
    <search-dialog ref="dialogRef" :dialogConfig="dialogConfig" :request="request" :pageId="id"></search-dialog>
  </div>
</template>

<script>
import { inject, ref, computed } from 'vue'

import { useStore } from 'vuex'

import searchContent from '@/components/searchContent/searchContent.vue'
import searchDialog from '@/components/searchDialog/searchDialog.vue'

import tableConfig from './config/tableConfig'
import dialogConfig from './config/dialogConfig'
export default {
  components: {
    searchContent,
    searchDialog
  },
  setup() {
    const id = inject('id')
    const store = useStore()
    const dialogRef = ref()
    const request = ref({})
    store.dispatch('main/getUserListAction', { id: id.value })
    store.dispatch('main/getAllRoleAction')
    const allRole = computed(() => store.state.main.allRoleInfo)
    const handlerUpdate = (row) => {
      dialogRef.value.dialogTableVisible = true
      for (const i of dialogConfig.formItem) {
        if (i.field === 'roleId') {
          i.options = allRole.value.map((item) => ({ label: item.roleName, value: item.id }))
        }
        dialogRef.value.formData[i.field] = row[i.field]
      }
      request.value.url = 'main/updateUserRoleAction'
      request.value.row = row
      request.value.pageId = id.value
      request.value.refreshUrl = 'main/getUserListAction'
    }
    const handlerDelete = (row) => {
      store.dispatch('main/deleteUserAction', { userIdList: [ row.id ] })
    }
    const handlerMoreDelete = (row) => {
      store.dispatch('main/deleteUserAction', { userIdList: [ ...row ] })
    }
    return {
      tableConfig,
      dialogConfig,
      dialogRef,
      handlerUpdate,
      handlerDelete,
      handlerMoreDelete,
      request,
      id
    }
  }
}
</script>

<style lang="scss" scoped></style>
