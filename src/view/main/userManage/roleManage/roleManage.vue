<template>
  <div class="roleManage">
    <search-content
      v-bind="tableConfig"
      @handlerCreateClick="handlerCreate"
      @handlerUpdateClick="handlerUpdate"
      @handlerDeleteClick="handlerDelete"
      @handlerMoreDeleteClick="handlerMoreDelete"
    ></search-content>
    <search-dialog
      ref="dialogRef"
      :dialogConfig="dialogConfig"
      :request="request"
    ></search-dialog>

    <el-dialog
      v-model="dialogVisible"
      title="修改权限"
      width="30%"
      destroy-on-close
    >
      <el-tree
        ref="elTreeRef"
        :props="props"
        :data="treeData"
        show-checkbox
        @check="handleCheckChange"
        node-key="id"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handlerUpdateRole">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { computed, ref, inject, nextTick } from 'vue'
import { useStore } from 'vuex'

import searchDialog from '@/components/searchDialog/searchDialog.vue'
import searchContent from '@/components/searchContent/searchContent.vue'

import tableConfig from './config/tableConfig'
import dialogConfig from './config/dialogConfig'
export default {
  setup() {
    const store = useStore()
    const props = ref({
      label: 'permissionName',
      children: 'child'
    })
    const id = inject('id')
    const dialogVisible = ref(false)
    const otherInfo = ref({})
    const dialogRef = ref()
    const elTreeRef = ref()
    const request = ref({})

    store.dispatch('main/getAllRoleAction')
    store.dispatch('main/getPermissionTreeAction')
    store.dispatch('main/getReceiveButtonAction', { id: id.value })
    const treeData = computed(() => store.state.main.permissionTree)
    const handlerCreate = () => {
      dialogRef.value.formData = {}
      dialogRef.value.dialogTableVisible = true
      request.value.url = 'main/addUserRoleAction'
      request.value.pageId = id.value
    }
    const handlerUpdate = (row) => {
      dialogVisible.value = true
      otherInfo.value.roleId = [row.id]
      nextTick(() => {
        elTreeRef.value.setCheckedKeys(row.ownAuthIdList, false)
      })
    }
    const handleCheckChange = (check, checkItem) => {
      const checkKeys = checkItem.checkedKeys
      const halfCheckKeys = checkItem.halfCheckedKeys
      const authIdList = [...checkKeys, ...halfCheckKeys]
      otherInfo.value.authIdList = authIdList
    }
    const handlerUpdateRole = () => {
      dialogVisible.value = false
      store.dispatch('main/updateRoleAction', otherInfo.value)
    }
    const handlerDelete = (row) => {
      store.dispatch('main/deleteRoleAction', { roleIdList: [row.id] })
    }
    const handlerMoreDelete = (row) => {
      store.dispatch('main/deleteRoleAction', { roleIdList: [ ...row ] })
    }
    return {
      dialogRef,
      elTreeRef,
      props,
      treeData,
      tableConfig,
      dialogConfig,
      handlerCreate,
      handlerUpdate,
      handleCheckChange,
      handlerUpdateRole,
      handlerDelete,
      handlerMoreDelete,
      request,
      otherInfo,
      dialogVisible
    }
  },
  components: { searchContent, searchDialog }
}
</script>

<style lang="less" scoped>
.el-tree {
  margin-left: 100px;
}
</style>
