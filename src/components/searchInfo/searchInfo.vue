<template>
  <div class="searchInfo">
    <ct-form v-bind="formConfig" v-model="formData" ref="ctFormRef">
      <template #header>
        <h3>{{ formConfig.formTitle }}</h3>
        <template v-if="formConfig.showBtn">
          <el-button
            :icon="Close"
            circle
            class="closeBtn"
            size="mini"
            @click="handlerClose"
          ></el-button>
        </template>
      </template>
    </ct-form>
    <template v-if="showFooter">
        <div class="footer">
          <div class="footerLink">
            <slot name="link"></slot>
          </div>
          <el-button type="primary" @click="handlerFooterClick">{{
            formConfig.formFooter
          }}</el-button>
        </div>
      </template>
  </div>
</template>

<script>
import { ref } from 'vue'

import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import ctForm from '@/baseui/form/form.vue'

import { Close } from '@element-plus/icons'
export default {
  components: {
    ctForm
  },
  props: {
    formConfig: {
      type: Object,
      required: true
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const router = useRouter()
    const store = useStore()

    const ctFormRef = ref()
    const formDataOrigin = {}
    for (const item of props.formConfig.formItem) {
      formDataOrigin[item.field] = ''
    }
    const formData = ref(formDataOrigin)
    const handlerFooterClick = () => {
      if (ctFormRef.value.validator()) {
        if (props.formConfig.pageName === 'update') {
          console.log(formData.value)
          store.dispatch('login/updatePasswordAction', {
            ...formData.value,
            url: props.formConfig.formUrl
          })
          router.push('/login')
        } else {
          store.dispatch('login/registerUserAction', {
            ...formData.value
          })
        }
        router.push('/login')
      }
    }
    const handlerClose = () => {
      router.push('/login')
    }
    return {
      ctFormRef,
      formData,
      handlerFooterClick,
      handlerClose,
      Close
    }
  }
}
</script>

<style lang="less" scoped>
.searchInfo {
  position: relative;
  .closeBtn {
    position: absolute;
    top: 0px;
    right: 0px;
  }
  .footer {
    padding: 22px 0;
    position: relative;
    .footerLink {
      position: absolute;
      left: 20px;
    }
  }
}
</style>
