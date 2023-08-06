import { createApp } from 'vue'
import 'normalize.css'
import 'element-plus/theme-chalk/el-message.css'

import router from './router'
import App from './App.vue'
import '@/assets/css/index.less'
import store from './store'
import icons from '@/global/register-icons'

const app = createApp(App)
app.use(icons)
app.use(store)
app.use(router)

app.mount('#app')
