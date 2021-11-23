<template>
  <div class="login">
    <login-panel></login-panel>
  </div>
</template>

<script>
import loginPanel from './cpns/loginPanel.vue'

export default {
  components: {
    loginPanel
  },
  setup() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.login {
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
}
</style>
