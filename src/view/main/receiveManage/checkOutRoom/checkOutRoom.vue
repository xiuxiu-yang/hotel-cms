<template>
  <div class="checkOutRoom">
    <div class="intro">
      <div class="info"></div>
      已预约:
      <div class="active"></div>
      可预约:
      <div class="end"></div>
      已结束:
      <div></div>
    </div>
    <ct-card
      :cardItem="cardItem"
      class="ctCard"
      @handlerCard="handlerDialog"
    ></ct-card>
    <el-dialog v-model="dialogVisible" title="提示" width="30%">
      <span>确定要退订该房间嘛？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handlerDeleteOrder">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { computed, ref, inject } from 'vue'
import { useStore } from 'vuex'

import ctCard from '@/baseui/card/card.vue'
export default {
  components: {
    ctCard
  },
  setup() {
    const store = useStore()
    const id = inject('id')
    const dialogVisible = ref(false)
    const card = ref()
    store.dispatch('main/getHotelInfoAction', { id: id.value })
    const cardItem = computed(() => {
      return store.state.main.hotelInfo.filter((item) => item.status === 1)
    })
    const handlerDialog = (item) => {
      card.value = item
      dialogVisible.value = true
    }
    const handlerDeleteOrder = () => {
      dialogVisible.value = false
      store.dispatch('main/deleteRoomOrderAction', { id: card.value.id, pageId: id.value })
      console.log(card.value)
    }
    return {
      cardItem,
      dialogVisible,
      handlerDialog,
      handlerDeleteOrder
    }
  }
}
</script>

<style lang="less" scoped>
.checkOutRoom {
  .intro {
    display: flex;
    margin-right: 20px;
    flex-direction: row-reverse;
    .info {
      height: 20px;
      width: 50px;
      background-color: rgb(166,169,173);
      margin-right: 10px;
    }
    .active {
      height: 20px;
      width: 50px;
      background-color: rgb(64,158,255);
    }
    .end {
      height: 20px;
      width: 50px;
      background-color: rgb(103, 194, 58);
    }
  }
}
</style>
