<template>
  <div class="reserveLog">
    <search-content v-bind="tableConfig" @handlerDeleteClick="handlerDelete" @handlerMoreDeleteClick="handlerMoreDelete">
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
  </div>
</template>

<script>
import { inject, ref, computed } from 'vue'

import { useStore } from 'vuex'

import searchContent from '@/components/searchContent/searchContent.vue'

import tableConfig from './config/tableConfig'
export default {
  components: {
    searchContent
  },
  setup() {
    const store = useStore()
    const id = inject('id')
    const dialogRef = ref()
    const currentPage = ref(1)
    store.dispatch('main/getRoomOrderLogAction', { id: id.value })
    const handlerDelete = (row) => {
      store.dispatch('main/deleteRoomOrderLogAction', {
        idList: [row.id],
        id: id.value
      })
      currentPage.value = 1
    }
    const handlerMoreDelete = (row) => {
      console.log(row)
      store.dispatch('main/deleteRoomOrderLogAction', {
        idList: [ ...row ],
        id: id.value
      })
    }
    const total = computed(() => store.state.main.roomOrderLog.total)
    const handleSizeChange = (val) => {
      console.log(`${val} items per page`)
    }
    const handleCurrentChange = (val) => {
       store.dispatch('main/getRoomOrderLogAction', {
        id: id.value,
        pageIndex: val
      })
    }
    return {
      dialogRef,
      total,
      tableConfig,
      currentPage,
      handlerDelete,
      handlerMoreDelete,
      handleSizeChange,
      handleCurrentChange
    }
  }
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
