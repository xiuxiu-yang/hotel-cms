<template>
  <div class="searchDialog">
    <el-dialog
      v-model="dialogTableVisible"
      width="30%"
      :title="dialogConfig.pageTitle"
      destroy-on-close
    >
      <ct-form :formItem="dialogConfig.formItem" v-model="formData"> </ct-form>
      <slot name="tree"></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handlerCancel">取消</el-button>
          <el-button type="primary" @click="handlerConfirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import ctForm from '@/baseui/form/form.vue'
export default {
  components: {
    ctForm
  },
  props: {
    dialogConfig: {
      type: Object,
      required: true
    },
    request: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const store = useStore()
    const dialogTableVisible = ref(false)
    const formData = ref({})
    const handlerCancel = () => {
      dialogTableVisible.value = false
    }
    const handlerConfirm = () => {
      dialogTableVisible.value = false
      if (props.request.row) {
        store.dispatch(props.request.url, {
          ...formData.value,
          id: props.request.row.id,
          pageId: props.request.pageId
        })
      } else {
        store.dispatch(props.request.url, { ...formData.value, pageId: props.request.pageId })
      }
    }
    return {
      dialogTableVisible,
      formData,
      handlerCancel,
      handlerConfirm
    }
  }
}
</script>

<style lang="less" scoped></style>
