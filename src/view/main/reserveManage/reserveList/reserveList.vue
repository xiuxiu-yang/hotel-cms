<template>
  <div class="reserveList">
    <search-content
      v-bind="tableConfig"
      @handlerDeleteClick="handlerDelete"
      @handlerUpdateClick="handlerUpdate"
      @handlerMoreDeleteClick="handlerMoreDelete"
    ></search-content>
    <el-dialog v-model="dialogVisible" title="请选择要预定的房间">
      <el-row :gutter="12">
        <template v-for="item of cardItem" :key="item.id">
          <el-col :span="6" class="card-col">
            <el-card class="active" @click="handlerCardClick(item)">
              <div>
                {{ item.number }}
              </div>
              <div>价格:{{ item.price }}</div>
            </el-card>
          </el-col>
        </template>
      </el-row>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog
    v-model="dialogVisible2"
    title="提示"
    width="30%"
  >
    <span>确定选择该房间吗？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取消</el-button>
        <el-button type="primary" @click="handlerUpdateOrder"
          >确定</el-button
        >
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
  components: {
    searchContent
  },
  setup() {
    const store = useStore()
    const id = inject('id')
    const dialogVisible = ref(false)
    const dialogVisible2 = ref(false)
    const payload = ref({})
    store.dispatch('main/getRoomOrderAction', { id: id.value, status: '0' })
    store.dispatch('main/getHotelInfoAction', { id: id.value })
    const cardItem = computed(() => {
      const hotelInfo = store.state.main.hotelInfo
      return hotelInfo.filter((item) => item.status === 0)
    })
    const handlerUpdate = (row) => {
      dialogVisible.value = true
      payload.value.id = row.id
    }
    const handlerDelete = (row) => {
      store.dispatch('main/deleteRoomOrderLogAction', {
        idList: [row.id],
        id: id.value
      })
    }
    const handlerMoreDelete = (row) => {
      console.log(row)
      store.dispatch('main/deleteRoomOrderLogAction', {
        idList: [ ...row ],
        id: id.value
      })
    }
    const handlerCardClick = (item) => {
      payload.value.roomId = item.id
      console.log(item)
      dialogVisible2.value = true
    }
    const handlerUpdateOrder = () => {
      store.dispatch('main/distributeRoomAction', { ...payload.value, pageId: id.value })
      dialogVisible.value = false
      dialogVisible2.value = false
    }
    return {
      dialogVisible,
      dialogVisible2,
      tableConfig,
      handlerUpdate,
      handlerDelete,
      handlerMoreDelete,
      handlerCardClick,
      handlerUpdateOrder,
      cardItem
    }
  }
}
</script>

<style lang="less" scoped>
.reserveList {
  .card-col {
    margin-bottom: 20px;
    .active {
      background-color: rgb(64, 158, 255);
      height: 100px;
      div {
        padding-bottom: 20px;
      }
    }
  }
}
</style>
