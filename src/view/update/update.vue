<template>
  <div class="update">
    <div class="content">
      <search-info :formConfig="formConfig">
        <template #link>
          <el-button type="text" size="large" @click="handlerPhoneClick"
            >{{ formConfig.footerName }}修改</el-button
          >
        </template>
      </search-info>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import searchInfo from '@/components/searchInfo/searchInfo.vue'

import formPhoneConfig from './formPhone.config'
import formAccountConfig from './form.config'
export default {
  components: {
    searchInfo
  },
  setup() {
    const formConfig = ref()
    formConfig.value = formAccountConfig
    let toggle = true
    const handlerPhoneClick = () => {
      if (toggle) {
        formConfig.value = formPhoneConfig
        toggle = false
      } else {
        formConfig.value = formAccountConfig
        toggle = true
      }
    }
    return {
      formConfig,
      handlerPhoneClick
    }
  }
}
</script>

<style lang="less" scoped>
.update {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 420px;
  background-image: linear-gradient(
      rgba(255, 235, 235, 0.75),
      rgba(255, 235, 235, 0.25)
    ),
    url('../../static/image/login.png');
  background-color: rgba(255, 255, 255, 0.1);
  background-size: 100%;
  background-attachment: fixed;
  .content {
    width: 360px;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.3);
  }
}
</style>
