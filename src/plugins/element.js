import Vue from 'vue'
import { Loading, Button, Upload, Message, Tabs, TabPane, Input, Dialog, Form, FormItem } from 'element-ui'

Vue.use(Button)
Vue.use(Upload)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Input)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Loading.directive)

Vue.prototype.$message = Message
