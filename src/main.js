import '@/assets/scss/main.scss'
import '@/axios-configuration'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/router'
import PrimeVue from 'primevue/config'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(PrimeVue, {
  unstyled: true
})

app.mount('#app')
