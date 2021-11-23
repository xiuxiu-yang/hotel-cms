import { createApp } from 'vue'
import App from './App.vue'

import '@/static/css/index.less'

import router from './router'
import store from './store'
import { setupLocal } from './store'

const app = createApp(App)
app.use(store)
setupLocal()
app.use(router)
app.mount('#app')
