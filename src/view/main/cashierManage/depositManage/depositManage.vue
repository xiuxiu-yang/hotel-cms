<template>
  <div class="depositManage">
    <search-content v-bind="tableConfig" @handlerUpdateClick="handlerUpdate">
      <template #searchFooter>
        <div class="searchFooter">
          <el-pagination
            v-model:currentPage="currentPage"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </template>
    </search-content>
    <el-dialog v-model="dialogVisible" title="提示" width="30%">
      <span>确定返还押金嘛</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handlerConfirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { inject, ref, computed } from 'vue'
import { useStore } from 'vuex'

import searchContent from '@/components/searchContent/searchContent.vue'

import tableConfig from './config/tableConfig'
export default {
  setup() {
    const id = inject('id')
    const dialogVisible = ref(false)
    const store = useStore()
    const payload = ref({})
    const currentPage = ref(1)
    store.dispatch('main/getReturnDepositAction', { id: id.value })
    const handlerUpdate = (row) => {
      payload.value.depositId = row.depositId
      payload.value.id = id.value
      dialogVisible.value = true
    }
    const handlerConfirm = () => {
      dialogVisible.value = false
      store.dispatch('main/returnDepositAction', payload.value)
    }
    const total = computed(() => store.state.main.returnDeposit.total)
    const handleSizeChange = (val) => {
      console.log(`${val} items per page`)
    }
    const handleCurrentChange = (val) => {
      console.log(`current page: ${val}`)
      store.dispatch('main/getReturnDepositAction', {
        id: id.value,
        pageIndex: val
      })
    }
    return {
      total,
      currentPage,
      tableConfig,
      dialogVisible,
      handlerUpdate,
      handlerConfirm,
      handleSizeChange,
      handleCurrentChange
    }
  },
  components: { searchContent }
}
</script>

<style lang="less" scoped>
.searchFooter {
  .el-pagination {
    padding-top: 22px;
    text-align: right;
  }
}
</style>
