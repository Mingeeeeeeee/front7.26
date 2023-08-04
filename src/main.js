import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import moment from 'moment'
import './plugins/http'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.filter('dateformat', function (indate, outdate) {
  return moment(indate).format(outdate)
})
new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
