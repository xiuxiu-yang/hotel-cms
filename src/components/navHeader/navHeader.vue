<template>
  <div class="navHeader">
    <el-avatar :size="50" :src="userInfo.headerPicture"></el-avatar>
    <el-dropdown trigger="click" class="loginLogo">
      <span class="el-dropdown-link"><p>{{userInfo.name}}</p><p>{{userInfo.roleName }}</p></span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handlerExit">退出登入</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import { computed } from 'vue'

import { useStore } from 'vuex'

import { useRouter } from 'vue-router'
export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const getDataList = () => {
      store.dispatch('main/getUserInfoAction')
    }
    getDataList()
    const userInfo = computed(() => store.state.main.userInfo)
    const handlerExit = () => {
      router.push('/login')
    }
    return {
      userInfo,
      handlerExit
    }
  }
}
</script>

<style lang="less" scoped>
.navHeader {
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .loginLogo {
    padding-top: 10px;
    text-align: center;
    p {
      padding-bottom: 5px;
    }
  }
}
</style>
