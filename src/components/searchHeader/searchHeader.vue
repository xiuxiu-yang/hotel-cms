<template>
  <div class="searchHeader">
    <div class="collapase" @click="handlerCollapse">
      <template v-if="!isCollapse">
        <el-icon size="25"><expand /></el-icon>
      </template>
      <template v-else>
        <el-icon size="25"><fold /></el-icon>
      </template>
    </div>
    <div class="breakCrumbs">
      <el-breadcrumb separator="/">
        <template v-for="item of breakCrumbs" :key="item">
          <el-breadcrumb-item>{{ item }}</el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue"

import { useRoute } from "vue-router"
import { useStore } from "vuex"

import { Expand, Fold } from "@element-plus/icons"

import { getBreakCrumbs } from "@/utils/mapMenus"

export default {
  components: {
    Expand,
    Fold
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const isCollapse = ref(false)
    const handlerCollapse = () => {
      isCollapse.value = !isCollapse.value
    }
    const breakCrumbs = computed(() => {
      const breakCrumbs = []
      const currentPath = route.path
      const roleMenu = store.state.login.roleMenu
      const item = getBreakCrumbs(currentPath, roleMenu)
      if ( item.pid ) {
        for (const i of roleMenu) {
          if (i.id === item.pid) {
            breakCrumbs.push(i.menuName)
          }
        }
      }
      breakCrumbs.push(item.menuName)
      return breakCrumbs
    })
    return {
      isCollapse,
      handlerCollapse,
      breakCrumbs
    }
  }
}
</script>

<style lang="less" scoped>
.searchHeader {
  display: flex;
  align-items: center;
  height: 100%;
  .collapase {
    padding-right: 20px;
  }
}
</style>
