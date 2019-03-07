import Vue from 'vue'
import App from './App.vue'
import VueClipboard from 'vue-clipboard2'
import './registerServiceWorker'
import './plugins/axios'
import './plugins/element'

Vue.config.productionTip = false
Vue.use(VueClipboard) // 剪贴板

new Vue({
  render: h => h(App)
}).$mount('#app')
