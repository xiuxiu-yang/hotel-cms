<template>
  <div class="loginUser">
    <el-form ref="elFormRef" :model="account" :rules="rules" label-width="80px">
      <el-form-item label="账号" prop="loginAccount">
        <el-input
          v-model="account.loginAccount"
          type="text"
          placeholder="个人账号"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="account.password"
          type="password"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="identifyCode">
        <div class="getIdentifyCode">
          <el-input
            type="text"
            v-model="account.identifyCode"
            placeholder="验证码"
          ></el-input>
          <div class="identifyCode" @click="refreshCodeFn">
            <identify-code :identifyCode="identifyCode"></identify-code>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ref } from 'vue'

import { useStore } from 'vuex'
import identifyCode from '@/baseui/identifyCode/identifyCode.vue'

import identifyCodeFn from '@/baseui/identifyCode/identifyCode.js'

import throttle from '@/utils/throttle.js'
export default {
  components: {
    identifyCode
  },
  setup() {
    const store = useStore()
    const elFormRef = ref('')
    const account = ref({
      loginAccount: '',
      password: '',
      identifyCode: ''
    })

    const rules = {
      loginAccount: [
        {
          required: true,
          message: '请输入账号',
          trigger: 'blur'
        },
        {
          pattern: /^[a-z0-9]{5,10}$/,
          message: '请输入正确账号',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        },
        {
          pattern: /^[a-z0-9]{5,10}$/,
          message: '请输入正确密码',
          trigger: 'blur'
        }
      ],
      identifyCode: [
        {
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        }
      ]
    }

    const [identifyCode, refreshCode] = identifyCodeFn()
    refreshCode()

    const validator = () => {
      let isValided = null
      rules.identifyCode.push({
        validator: (value, item, cb) => {
          if (identifyCode.value.toLowerCase() === item.toLowerCase()) {
            return cb()
          } else if (item === '') {
            refreshCode()
            return cb(new Error('请输入验证码'))
          } else {
            refreshCode()
            return cb(new Error('请输入正确验证码'))
          }
        },
        trigger: 'blur'
      })
      elFormRef.value.validate((isValid) => {
        isValided = isValid
      })
      rules.identifyCode.pop()
      return isValided
    }

    const loginAction = () => {
      const isValid = validator()
      if (isValid) {
        store.dispatch('login/loginAccountAction', {
          loginAccount: account.value.loginAccount,
          password: account.value.password
        })
      }
    }
    const refreshCodeFn = throttle(refreshCode, 1000)
    return {
      elFormRef,
      rules,
      account,
      identifyCode,
      refreshCodeFn,
      validator,
      loginAction
    }
  }
}
</script>

<style lang="less" scoped>
.getIdentifyCode {
  display: flex;
  .identifyCode {
    margin-left: 10px;
  }
}
</style>
