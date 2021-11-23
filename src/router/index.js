import { createRouter, createWebHashHistory } from "vue-router";

import LocalCache from '@/utils/LocalCache'

import { firstMenu } from "@/utils/mapMenus";
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../view/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../view/main/main.vue'),
    children: [
      {
        path: 'roomManage/roomInfo',
        component: () => import('../view/main/roomManage/roomInfo/roomInfo.vue')
      }
    ]
  },
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/register',
    component: () => import('../view/register/register.vue')
  },
  {
    path: '/update',
    component: () => import('../view/update/update.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach((to) => {
  if (to.path.startsWith('/main')) {
    const token = LocalCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
  if (to.path === '/main') {
    return firstMenu
  }
})
export default router