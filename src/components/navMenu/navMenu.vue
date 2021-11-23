<template>
  <div class="navMenu">
    <div class="logoContainer">
      <nav-header></nav-header>
    </div>
    <el-menu
      class="el-menu-vertical"
      background-color="#001529"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      :default-active="defaultActive + ''"
      :unique-opened="true"
    >
      <template v-for="item of userMenu" :key="item.id">
        <template v-if="item.children.length !== 0">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <span>{{ item.menuName }}</span>
            </template>
            <template v-for="i of item.children" :key="i.id">
              <el-menu-item :index="i.id + ''" @click="itemClick(i.path, i.id)">
                {{ i.menuName }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.id + ''" @click="itemClick(item.path, item.id)">
            <span>{{ item.menuName }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { computed, ref } from 'vue'

import { useRouter, useRoute } from 'vue-router'

import { useStore } from 'vuex'

import { getActiveIndex } from '@/utils/mapMenus.js'
import navHeader from '../navHeader/navHeader.vue'
export default {
  components: {
    navHeader
  },
  emits: ['handlerItemClick'],
  setup(props, { emit }) {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const currentPath = route.path
    const defaultActive = ref()
    const itemClick = (url, id) => {
      emit('handlerItemClick', id)
      router.push({
        path: url
      })
    }
    const userMenu = computed(() => store.state.login.roleMenu)
    defaultActive.value = getActiveIndex(currentPath, userMenu.value)
    emit('handlerItemClick', defaultActive.value)
    return {
      itemClick,
      userMenu,
      defaultActive
    }
  }
}
</script>

<style lang="less" scoped>
.navMenu {
  height: 100%;
  background-color: #001529;

  .el-menu-vertical {
    border-right: none;
  }

  .el-menu {
    border-right: none;
  }
  .el-sub-menu {
    background-color: #001529 !important;
    user-select: none;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
      user-select: none;
    }
  }
  :deep(.el-submenu__title) {
    background-color: #001529 !important;
  }
  .el-menu-item:hover {
    color: #fff !important; // 菜单
    background-color: #0a60bd !important;
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
