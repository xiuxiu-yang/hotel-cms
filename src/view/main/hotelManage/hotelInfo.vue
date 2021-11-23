<template>
  <div class="hotelInfo">
    <el-avatar :size="200" :src="controllInfo.headerPicture"></el-avatar>
    <ct-form v-model="controllInfo" v-bind="formConfigUpdate"></ct-form>
    <div class="permission">
      <el-button type="primary" v-if="isEdit" @click="handlerUpdate"
        >编辑</el-button
      >
      <el-button type="primary" v-if="isEdit" @click="handlerSetting"
        >确定</el-button
      >
    </div>
  </div>
  <el-dialog
    v-model="dialogVisible"
    title="杨咻咻提示"
    width="30%"
    :close-on-click-modal="false"
  >
    <span>确定修改酒店信息吗</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handlerUpdateClick">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { computed, inject, ref, watch } from 'vue'

import { useStore } from 'vuex'

import ctForm from '@/baseui/form/form.vue'
import formConfig from './config/form.config'
export default {
  components: {
    ctForm
  },
  setup() {
    const store = useStore()
    const id = inject('id')
    store.dispatch('main/getControllInfoAction', id.value)
    const controllInfo = ref({})
    watch(
      () => store.state.main.controllInfo,
      (newValue) => {
        for (const i in newValue) {
          controllInfo.value[i] = newValue[i]
        }
      }
    )
    const isEdit = computed(() => {
      const permission = store.state.main.controllInfo.buttonList
      if (permission) {
        for (const item of permission) {
          if (item === 'update') {
            return true
          }
        }
      }
      return true
    })
    const formConfigUpdate = ref(formConfig)
    const handlerUpdate = () => {
      for (const item of formConfigUpdate.value.formItem) {
        item.disabled = false
      }
    }
    const handlerSetting = () => {
      dialogVisible.value = true
      for (const item of formConfigUpdate.value.formItem) {
        item.disabled = true
      }
    }
    const handlerUpdateClick = () => {
      dialogVisible.value = false
      store.dispatch('main/updateHotelInfoAction', controllInfo.value)
    }
    const dialogVisible = ref(false)
    return {
      controllInfo,
      formConfigUpdate,
      isEdit,
      handlerUpdate,
      handlerSetting,
      dialogVisible,
      handlerUpdateClick
    }
  }
}
</script>

<style lang="less" scoped>
.hotelInfo {
  width: 360px;
  margin: 0 auto;
  .permission {
    margin-top: 20px;
  }
}
</style>
