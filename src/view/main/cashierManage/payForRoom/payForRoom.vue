<template>
  <div class="payForRoom">
    <search-content
      v-bind="tableConfig"
      @handlerUpdateClick="handlerUpdate"
    ></search-content>
    <el-dialog v-model="dialogFormVisible" title="提示" width="30%" center>
      <el-form :model="form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="押金">
              <el-input
                v-model="form.deposity"
                placeholder="请输入押金"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handlerDeposity">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { inject, ref } from 'vue'

import { useStore } from 'vuex'

import searchContent from '@/components/searchContent/searchContent.vue'

import tableConfig from './config/tableConfig'
export default {
  setup() {
    const id = inject('id')
    const dialogFormVisible = ref(false)
    const form = ref({ deposity: '' })
    const store = useStore()
    const payload = ref({})
    store.dispatch('main/getPayRoomOrderAction', { id: id.value })
    const handlerUpdate = (row) => {
      console.log(row)
      payload.value.roomOrderId = row.id
      dialogFormVisible.value = true
    }
    const handlerDeposity = () => {
      dialogFormVisible.value = false
      payload.value.deposit = form.value.deposity
      console.log(payload.value)
      store.dispatch('main/createUserDepositAction', { ...payload.value, pageId: id.value })
    }
    return {
      tableConfig,
      dialogFormVisible,
      form,
      handlerUpdate,
      handlerDeposity
    }
  },
  components: { searchContent }
}
</script>

<style lang="less" scoped>
.payForRoom {
  .el-row {
    justify-content: center;
  }
}
</style>
