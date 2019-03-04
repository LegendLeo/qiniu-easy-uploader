import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueClipboard from 'vue-clipboard2'
import './registerServiceWorker'
import './plugins/axios'
import './plugins/element'

Vue.config.productionTip = false
Vue.use(VueClipboard) // 剪贴板

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
