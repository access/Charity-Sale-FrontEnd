import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store';
import '@/store/axios.js'
import "bootstrap";
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import "bootstrap/dist/css/bootstrap.min.css";
import Notifications from '@kyvg/vue3-notification'

createApp(App)
  .use(store)
  .use(router)
  .use(Notifications)
  .mount('#app')