import Vue from 'vue'
import { Button, Upload, Message, Tabs, TabPane, Input, Loading } from 'element-ui'

Vue.use(Button)
Vue.use(Upload)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Input)
Vue.use(Loading.directive)

Vue.prototype.$message = Message
