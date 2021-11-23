<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside width="200px">
        <nav-menu @handlerItemClick="handlerItem"></nav-menu>
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <search-header></search-header>
        </el-header>
        <el-main class="page-content">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { ref, provide } from 'vue'
import navMenu from '@/components/navMenu/navMenu.vue'

import searchHeader from '@/components/searchHeader/searchHeader.vue'
export default {
  components: {
    navMenu,
    searchHeader
  },
  setup() {
    const itemId = ref(0)
    const roomId = ref(0)
    const handlerItem = (id) => {
      itemId.value = id
    }
    const handlerUpdateRoomId = ( id ) => {
      roomId.value = id
    }
    provide('roomId', roomId)
    provide('id', itemId)
    provide('handlerUpdateRoomId', handlerUpdateRoomId)
    return {
      handlerItem,
      itemId
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
}
.main-content {
  height: 100%;
}
.page {
  height: 100%;
  .page-header {
    background-color: #b3c0d1;
    height: 48px;
  }
  .page-content {
    height: calc(100% - 48px);
    .page-info {
      background-color: #fff;
      border-radius: 5px;
    }
  }
}
.el-main {
  color: #333;
  text-align: center;
}
.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
