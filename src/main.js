import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store';
import '@/store/axios.js'


createApp(App)
  .use(store)
  .use(router)
  .mount('#app')

import 'bootstrap/dist/js/bootstrap.bundle.min.js';