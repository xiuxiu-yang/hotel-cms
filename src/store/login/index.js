import { loginAccountRequest, loginPhoneRequest, getCodeRequest, updatePasswordRequest, updatePhoneRequest, registerUserRequest } from "../../service/login/login"
import { getRoleMenuRequest } from '@/service/main/main.js'

import router from '@/router'

import LocalCache from "@/utils/LocalCache.js"
import mapMenus from "@/utils/mapMenus.js"
const login = {
  namespaced: true,
  state() {
    return {
      token: '',
      roleMenu: []
    }
  },
  mutations: {
    changeToken(state, payload) {
      state.token = payload
    },
    changeRoleMenu(state, payload) {
      state.roleMenu = payload
      const routes = mapMenus(payload)
      routes.forEach((route) => {
        router.addRoute('main',route)
      })
    }
  },
  actions: {
    async loginAccountAction({ commit }, payload) {
      const loginResult = await loginAccountRequest(payload)
      const { token } = loginResult.data
      LocalCache.setCache('token', token)
      commit('changeToken', token)
      const roleMenuResult = await getRoleMenuRequest()
      const roleMenu = roleMenuResult.data
      const userMenu = []
      roleMenu.forEach((item) => {
        if (item.pid === null) {
          item.children = []
          userMenu.push(item)
        } else {
          for (const i of userMenu) {
            if (i.id === item.pid) {
              i.children.push(item)
            }
          }
        }
        item.path = '/main' + item.path
      })
      LocalCache.setCache('roleMenu', userMenu)
      commit('changeRoleMenu', userMenu)
      router.push('/main')
    },
    async loginPhoneAction({ commit }, payload) {
      const loginResult = await loginPhoneRequest(payload)
      const { token } = loginResult.data
      LocalCache.setCache('token', token)
      commit('changeToken', token)
      router.push('/main')
    },
    async getCodeAction(_, payload) {
      const getResult = await getCodeRequest(payload)
      console.log(getResult)
    },
    async updatePasswordAction(_, payload) {
      let res = null
      const url = payload.url
      delete payload.url
      if (payload.confirmPassword) {
        delete payload.confirmPassword
      }
      switch (url) {
        case 'password':
          res = await updatePasswordRequest(payload)
          break;
        case 'phone':
          res = await updatePhoneRequest(payload)
          break;
      }
      console.log(res.data, 111)
    },
    async registerUserAction(_, payload) {
      await registerUserRequest(payload)
    },
    lodingLocalLogin({ commit }) {
      const token = LocalCache.getCache('token')
      const roleMenu = LocalCache.getCache('roleMenu')
      if (token) {
        if (roleMenu) {
          commit('changeToken', token)
          commit('changeRoleMenu', roleMenu)
        } else {
          router.push('/login')
        }
      }
    }
  }
}

export default login