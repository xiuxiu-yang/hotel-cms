<template>
  <div class="searchContent">
    <ct-table :tableItem="tableItem" :tableData="tableData" ref="ctTableRef">
      <template #header>
        <div class="tableTitle">
          <h4>{{ pageTitle }}列表</h4>
          <div class="delete">
            <el-button
              type="primary"
              size="mini"
              @click="handlerMoreDelete"
              v-if="isDelete"
              ><el-icon><delete /></el-icon>批量删除</el-button
            >
          </div>
          <el-button
            type="text"
            size="mini"
            @click="handlerCreate"
            v-if="isCreate"
            ><el-icon><plus /></el-icon>新建{{ pageTitle }}</el-button
          >
        </div>
      </template>
      <template #gender="scope">
        {{ scope.row.gender ? '男' : '女' }}
      </template>
      <template #status="scope">
        <el-button
          :type="
            scope.row.status === 0 || scope.row.status === '0'
              ? 'primary'
              : scope.row.status === 1 || scope.row.status === '1'
              ? 'info'
              : 'success'
          "
          size="mini"
        >
          {{
            scope.row.status === 0 || scope.row.status === '0'
              ? '可预约'
              : scope.row.status === 1 || scope.row.status === '1'
              ? '正在使用'
              : '未打扫'
          }}
        </el-button>
      </template>
      <template #edit="scope">
        <el-button
          type="text"
          size="mini"
          v-if="isUpdate"
          @click="handlerUpdate(scope)"
          ><el-icon><edit /></el-icon>{{ editText }}</el-button
        >
        <el-button
          type="text"
          size="mini"
          v-if="isDelete"
          @click="handlerDelete(scope)"
          ><el-icon><delete /></el-icon>删除</el-button
        >
      </template>
    </ct-table>
    <slot name="searchFooter"></slot>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

import { Edit, Delete, Plus } from '@element-plus/icons'
import ctTable from '@/baseui/table/table.vue'
export default {
  components: {
    ctTable,
    Edit,
    Delete,
    Plus
  },
  props: {
    tableItem: {
      type: Array,
      required: true
    },
    pageName: {
      type: String,
      required: true
    },
    pageTitle: {
      type: String,
      required: true
    },
    showNewItem: {
      type: Boolean,
      default: true
    },
    editText: {
      type: String,
      default: '编辑'
    }
  },
  emits: ['handlerDeleteClick', 'handlerUpdateClick', 'handlerCreateClick', 'handlerMoreDeleteClick'],
  setup(props, { emit }) {
    const ctTableRef = ref()
    const store = useStore()
    const tableData = computed(() => store.state.main[`${props.pageName}Info`])
    const isUpdate = computed(() => {
      const permissionList = store.state.main[`${props.pageName}Permission`]
      if (permissionList) {
        for (const item of permissionList) {
          if (item === 'update') {
            return true
          }
        }
      }
      return false
    })
    const isDelete = computed(() => {
      const permissionList = store.state.main[`${props.pageName}Permission`]
      if (permissionList) {
        for (const item of permissionList) {
          if (item === 'delete') {
            return true
          }
        }
      }
      return false
    })
    const isCreate = computed(() => {
      const permissionList = store.state.main[`${props.pageName}Permission`]
      if (permissionList) {
        for (const item of permissionList) {
          if (item === 'add') {
            return true
          }
        }
      }
      return false
    })
    const handlerUpdate = (scope) => {
      emit('handlerUpdateClick', scope.row)
    }
    const handlerDelete = (scope) => {
      emit('handlerDeleteClick', scope.row)
    }
    const handlerCreate = () => {
      emit('handlerCreateClick')
    }
    const handlerMoreDelete = () => {
      emit('handlerMoreDeleteClick', ctTableRef.value.checkIdList)
      console.log(ctTableRef.value.checkIdList)
    }
    return {
      ctTableRef,
      tableData,
      isUpdate,
      isDelete,
      isCreate,
      handlerUpdate,
      handlerDelete,
      handlerCreate,
      handlerMoreDelete
    }
  }
}
</script>

<style lang="less" scoped>
.searchContent {
  .tableTitle {
    display: flex;
    h4 {
      text-align: left;
    }
    .delete {
      padding-left: 20px;
      flex-grow: 1;
      text-align: left;
    }
  }
}
</style>
