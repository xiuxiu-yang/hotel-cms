import { createStore } from "vuex"

import login from './login'
import main from './main'
const store = createStore({
  state() {
    return {

    }
  },
  mutations: {

  },
  modules: {
    login,
    main
  }
})

export function setupLocal() {
  store.dispatch('login/lodingLocalLogin')
}
export default store