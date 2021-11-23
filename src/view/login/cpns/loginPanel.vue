<template>
  <div class="loginPanle">
    <h2 class="title">酒店后台管理系统</h2>
    <el-tabs type="border-card" stretch v-model="loginActive">
      <el-tab-pane label="账号登入" name="loginAccount">
        <template #label>
          <span>
            <el-icon><user></user></el-icon> 账号登入
          </span>
        </template>
        <login-user ref="loginUserRef" @keydown.enter="throttleFn"></login-user>
      </el-tab-pane>
      <el-tab-pane label="手机登入" name="phone">
        <template #label>
          <span>
            <el-icon><cellphone></cellphone></el-icon>手机登入
          </span>
        </template>
        <login-phone
          ref="loginPhoneRef"
          @keydown.enter="throttleFn"
        ></login-phone>
      </el-tab-pane>
    </el-tabs>
    <div class="loginSetting">
      <el-link type="primary" @click="handlerUpdate">忘记密码?</el-link>
      <el-link type="primary" @click="handlerRegister">立即注册</el-link>
    </div>
    <div class="login">
      <el-button type="primary" @click="throttleFn">登入</el-button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

import { useRouter } from 'vue-router'
import { User, Cellphone } from '@element-plus/icons'

import loginUser from './loginUser.vue'
import loginPhone from './loginPhone.vue'

import throttle from '@/utils/throttle.js'
export default {
  components: {
    User,
    Cellphone,
    loginUser,
    loginPhone
  },
  setup() {
    const router = useRouter()
    const loginUserRef = ref('')
    const loginPhoneRef = ref('')
    const loginActive = ref('loginAccount')
    const login = () => {
      let isValid = null
      if (loginActive.value === 'loginAccount') {
        loginUserRef.value.loginAction()
      } else {
        isValid = loginPhoneRef.value.validator()
      }
      if (isValid) {
        console.log(11)
      }
    }
    const throttleFn = throttle(login, 1000)
    const handlerRegister = () => {
      router.push('/register')
    }
    const handlerUpdate = () => {
      router.push('/update')
    }
    return {
      loginActive,
      loginPhoneRef,
      loginUserRef,
      throttleFn,
      handlerRegister,
      handlerUpdate
    }
  }
}
</script>

<style lang="less" scoped>
.loginPanle {
  width: 360px;
  height: 420px;
  .title {
    text-align: center;
    margin-bottom: 10px;
  }
  .loginSetting {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  .login {
    margin-top: 10px;
    & button {
      width: 100%;
    }
  }
}
</style>
