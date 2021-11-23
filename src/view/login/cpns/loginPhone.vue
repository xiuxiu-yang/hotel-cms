<template>
  <div class="loginPhone">
    <el-form ref="elFormRef" :model="phone" :rules="rules" label-width="80px">
      <el-form-item label="手机号" prop="phoneNumber">
        <el-input
          v-model="phone.phoneNumber"
          type="text"
          placeholder="手机号码"
        ></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="checkCode">
        <div class="getCode">
          <el-input
            v-model="phone.checkCode"
            type="text"
            placeholder="验证码"
          ></el-input>
          <el-button
            type="primary"
            size="small"
            @click="getCodeFn"
            :disabled="disabled"
            >{{ btnText }}</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ref } from 'vue'

import getCode from '@/utils/getCode'
export default {
  setup() {
    const phone = ref({
      phoneNumber: '',
      checkCode: ''
    })
    const rules = {
      phoneNumber: [
        {
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        },
        {
          pattern: /^[0-9]{11}$/,
          message: '请输入合格的手机号',
          trigger: 'blur'
        }
      ],
      checkCode: [
        {
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        }
      ]
    }

    const elFormRef = ref('')
    const btnText = ref('获取验证码')
    const disabled = ref(false)
    const getCodeFn = () => getCode(disabled, btnText)
    const validator = () => {
      let isValided = null
      elFormRef.value.validate((isValid) => {
        isValided = isValid
      })
      return isValided
    }
    return {
      elFormRef,
      phone,
      rules,
      btnText,
      disabled,
      getCodeFn,
      validator
    }
  }
}
</script>

<style lang="less" scoped>
.loginPhone {
  .getCode {
    display: flex;
    button {
      margin-left: 10px;
      min-width: 90px;
    }
  }
}
</style>
