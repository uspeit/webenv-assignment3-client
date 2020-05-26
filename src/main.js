import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Axios from 'axios'
import vuetify from "./plugins/vuetify";

import './core/filters';
import './assets/css/style.css';

// Inject HTTP client
Vue.prototype.$http = Axios;
// Inject token
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}
// Create App
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
