<template>
  <div class="roomStatus">
    <div class="intro">
      <div class="info"></div>
      正在使用:
      <div class="active"></div>
      可预约:
      <div class="end"></div>
      未打扫:
      <div></div>
    </div>
    <ct-card
      :cardItem="cardItem"
      class="ctCard"
      @handlerCard="handlerDialog"
    ></ct-card>
    <el-dialog v-model="dialogVisible" title="提示" width="30%">
      <template v-if="card.status === 0">
        <span>确定要预定该房间吗？</span>
      </template>
      <template v-else-if="card.status === 1">
        <span>很抱歉，该房间已经预定。请选择其他房间，谢谢!</span>
      </template>
      <template v-else>
        <span>很抱歉，该房间暂时还无法预定。请选择其他房间，谢谢！</span>
      </template>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handlerCancle">取消</el-button>
          <el-button type="primary" @click="handlerAddRoom" v-if="card.status === 0">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { inject, computed, ref } from 'vue'

import { useRouter } from 'vue-router'

import { useStore } from 'vuex'

import ctCard from '@/baseui/card/card.vue'
export default {
  components: {
    ctCard
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const id = inject('id')
    const card = ref({
      status: 0
    })
    const handlerUpdateRoomId = inject('handlerUpdateRoomId')
    const dialogVisible = ref(false)
    store.dispatch('main/getHotelInfoAction', { id: id.value })
    const cardItem = computed(() => {
      return store.state.main.hotelInfo
    })

    const handlerDialog = (item) => {
      dialogVisible.value = true
      card.value = item
    }
    const handlerAddRoom = () => {
      if (!card.value.status) {
        router.push('/main/user/add/customer/room')
      } else {
        router.push('/main/user/check/out/customer/room')
      }
      handlerUpdateRoomId(card.value.id)
      dialogVisible.value = false
    }
    const handlerCancle = () => {
      card.value = { status: card.value.status }
      dialogVisible.value = false
      
    }
    return {
      card,
      cardItem,
      dialogVisible,
      handlerAddRoom,
      handlerDialog,
      handlerCancle
    }
  }
}
</script>

<style lang="less" scoped>
.roomStatus {
  .ctCard {
    padding-top: 50px;
  }
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
      background-color: rgb(251, 187, 69);
    }
  }
}
</style>
