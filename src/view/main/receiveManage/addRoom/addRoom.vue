<template>
  <div class="addRoom">
    <el-row :gutter="12">
      <div class="title">
        <h5>主单</h5>
      </div>
      <el-col :span="24">
        <el-card shadow="always">
          <div class="card">
            <search-info
              :formConfig="formConfig"
              :showFooter="false"
              ref="searchInfoF"
            ></search-info>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="50" class="row">
      <div class="title2">
        <h5>住宿信息</h5>
      </div>
      <el-col :span="16">
        <el-card shadow="always">
          <el-form style="padding-top: 22px;">
            <el-row>
              <el-col :span="12">
                <el-form-item label="开始时间">
                  <el-date-picker
                    v-model="beginDate"
                    type="datetime"
                    placeholder="请选择开始时间"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="结束时间">
                  <el-date-picker
                    v-model="endDate"
                    type="datetime"
                    placeholder="请选择结束时间"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div style="height: 48px;"></div>
        </el-card>
      </el-col>
      <el-col :span="8" class="titleF">
        <div class="title3">
          <h5>金额</h5>
        </div>
        <el-card shadow="always">
          <search-info
            :formConfig="formConfigBR"
            :showFooter="false"
            ref="searchInfoT"
          ></search-info>
        </el-card>
      </el-col>
    </el-row>
    <div class="footer">
      <el-button type="info" @click="handlerReset">重置</el-button>
      <el-button type="primary" @click="handlerSubmit">提交</el-button>
      <el-button type="info">取消</el-button>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { ref, inject, onBeforeUnmount } from 'vue'

import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import searchInfo from '@/components/searchInfo/searchInfo.vue'

import formConfig from './config/form.config'
import formConfigBR from './config/form.configBR'
export default {
  components: {
    searchInfo
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const searchInfoF = ref()
    const searchInfoT = ref()
    const beginDate = ref()
    const endDate = ref()
    const roomId = inject('roomId')
    const handlerUpdateRoomId = inject('handlerUpdateRoomId')
    const checked = ref(['团体'])
    if(!roomId.value) {
      router.push('/main/user/get/room/status')
    }
    const handlerChange = () => {
      if (checked.value.length === 2) {
        checked.value.shift()
      }
    }
    const handlerSubmit = () => {
      const orderData = {
        ...searchInfoF.value.formData,
        beginDate: dayjs(beginDate.value).format('YYYY-MM-DD HH:mm:ss'),
        endDate: dayjs(endDate.value).format('YYYY-MM-DD HH:mm:ss'),
        ...searchInfoT.value.formData,
        roomId: roomId.value
      }
      store.dispatch('main/generateRoomOrderAction', orderData)
      alert('提交成功')
      searchInfoF.value.formData = {}
      searchInfoT.value.formData = {}
      beginDate.value = ''
      endDate.value = ''
      handlerUpdateRoomId(0)
      console.log(orderData)
    }
    const handlerReset = () => {
      searchInfoF.value.formData = {}
      searchInfoT.value.formData = {}
      beginDate.value = ''
      endDate.value = ''
    }
    onBeforeUnmount(() => {
      handlerUpdateRoomId(0)
    })
    return {
      searchInfoF,
      searchInfoT,
      formConfig,
      formConfigBR,
      checked,
      handlerChange,
      handlerSubmit,
      handlerReset,
      beginDate,
      endDate
    }
  }
}
</script>

<style lang="less" scoped>
.addRoom {
  .title {
    position: absolute;
    left: 20px;
    top: -8px;
  }
  .title2 {
    position: absolute;
    left: 50px;
    top: -8px;
  }
  .titleF {
    position: relative;
    .title3 {
      position: absolute;
      left: 50px;
      top: -8px;
    }
  }

  .card {
    display: flex;
    .el-card {
      width: 40%;
      .el-checkbox {
        margin-right: 50px;
      }
    }
  }
  .row {
    margin-top: 20px;
  }
  .footer {
    margin-top: 30px;
  }
}
</style>
