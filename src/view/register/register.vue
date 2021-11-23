<template>
  <div class="register">
    <div class="content">
      <search-info :formConfig="formConfig"></search-info>
    </div>
  </div>
</template>

<script>
import searchInfo from '@/components/searchInfo/searchInfo.vue'
import formConfig from './form.config'
export default {
  components: {
    searchInfo
  },
  setup() {
    return {
      formConfig
    }
  }
}
</script>

<style lang="less" scoped>
.register {
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
