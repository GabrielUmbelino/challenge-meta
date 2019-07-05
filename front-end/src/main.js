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

Vue.use(Vuelidate)
Vue.use(Vuetify)
Vue.use(VueTheMask)
Vue.use(VueSwal2)


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')