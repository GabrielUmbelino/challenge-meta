import App from './App.vue'
// import axios from 'axios'
import router from './router'
import store from './store'
import Vue from 'vue'
import Vuelidate from "vuelidate"
import VueSwal2 from 'vue-sweetalert2'
import Vuetify from 'vuetify'
import VueTheMask from "vue-the-mask"
 

import "vuetify/dist/vuetify.min.css"
import './plugins/vuetify'
// Vue.use(axios)
Vue.use(Vuelidate)
Vue.use(Vuetify)
Vue.use(VueTheMask)
Vue.use(VueSwal2)


Vue.config.productionTip = false
// Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// condition to add padStart function
if (!String.prototype.padStart) {
  String.prototype.padStart = function padStart(targetLength, padString) {
    targetLength = targetLength >> 0; //truncate if number or convert non-number to 0;
    padString = String(typeof padString !== "undefined" ? padString : " ");
    if (this.length > targetLength) {
      return String(this);
    }
    targetLength = targetLength - this.length;
    if (targetLength > padString.length) {
      padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
    }
    return padString.slice(0, targetLength) + String(this);

  };
}