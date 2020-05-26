import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import  './assets/css/style.css'

Vue.config.productionTip = false;

Vue.filter("timeString", function(value) {
  if (!value || value < 5) return "A few Minutes";
  if (value >= 60) {
    if (value >= 120) return "More than " + parseInt(value / 60) + " hours";
    return "More than an hour";
  }
  return parseInt(value / 5) * 5 + " minutes";
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
