import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import './plugins/axios'
import './plugins/element'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
