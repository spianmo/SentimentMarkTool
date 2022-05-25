import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import api from './apis'
import { VuePlugin } from "vuera";

Vue.use(VuePlugin);

Vue.config.productionTip = false
Vue.prototype.$http = api

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
