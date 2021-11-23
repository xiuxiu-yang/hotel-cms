<template>
  <div class="ctForm">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth" :model="modelValue" ref="elFormRef">
      <el-row>
        <template v-for="item in formItem" :key="item.field">
          <el-col :span="spanStyle">
            <el-form-item
              :prop="item.field"
              :rules="item.rules"
              :label="item.label"
              :style="itemStyle"
              :class="item.field === 'checkCode' ? 'checkCode' : ''"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <template v-if="item.field === 'checkCode'">
                  <div class="checkCode">
                    <el-input
                      :type="item.type"
                      :placeholder="item.placeholder"
                      :label="item.label"
                      :span="item.span"
                      :disabled="item.disabled"
                      :model-value="modelValue[item.field]"
                      @update:modelValue="handlerChange($event, item.field)"
                    ></el-input>
                    <el-button
                      type="primary"
                      :disabled="disabled"
                      @click="getCodeFn"
                      >{{ btnText }}</el-button
                    >
                  </div>
                </template>
                <template v-else>
                  <el-input
                    :type="item.type"
                    :placeholder="item.placeholder"
                    :label="item.label"
                    :disabled="item.disabled"
                    :show-password="item.type !== 'input' ? true : false"
                    :model-value="modelValue[item.field]"
                    @update:modelValue="handlerChange($event, item.field)"
                  ></el-input>
                </template>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  :model-value="modelValue[item.field]"
                  style="width: 100%"
                  :span="item.span"
                  @update:modelValue="handlerChange($event, item.field)"
                >
                  <el-option
                    v-for="i in item.options"
                    :key="i.value"
                    :label="i.label"
                    :value="i.value"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { ref } from 'vue'
import getCode from '@/utils/getCode'
import store from '../../store'
export default {
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItem: {
      type: Array,
      required: true
    },
    spanStyle: {
      type: Number,
      default: 24
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 20px', margin: '0px' })
    },
    labelWidth: {
      type: String,
      default: '80px'
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const elFormRef = ref()
    const handlerChange = (value, field) => {
      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }
    const btnText = ref('获取验证码')
    const disabled = ref(false)
    const getCodeFn = () => {
      getCode(disabled, btnText)
      store.dispatch('login/getCodeAction', { phoneNumber: props.modelValue['phoneNumber'] })
    }

    const validator = () => {
      let isValided = null
      elFormRef.value.validate((isValid) => {
        isValided = isValid
      })
      return isValided
    }
    const checkPassword = (rule, value, callback) => {
      const passwordData = props.modelValue['newPassword']
      if (passwordData === value || !passwordData) {
        callback()
      } else if (!value) {
        callback(new Error('请再次输入您的密码'))
      } else if (passwordData !== value) {
        callback(new Error('两次输入的密码不一致'))
      }
    }
    const confirmPasswordItem = props.formItem.find(
      (item) => item.field === 'confirmPassword'
    )
    if (confirmPasswordItem) {
      confirmPasswordItem.rules.push({
        validator: checkPassword,
        trigger: 'blur'
      })
    }
    return {
      elFormRef,
      handlerChange,
      getCodeFn,
      disabled,
      btnText,
      validator
    }
  }
}
</script>

<style lang="less" scoped>
.ctForm {
  padding-top: 22px;
  .footer {
    padding: 22px 0;
    text-align: center;
  }
}
.checkCode {
  display: flex;
  button {
    margin-left: 10px;
    min-width: 100px;
  }
}
</style>
