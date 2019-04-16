import Vue from 'vue'
import './plugins/vuetify'
import router from './routers/router'

import App from './App.vue'
import TreeView from "vue-json-tree-view"

Vue.config.productionTip = false

Vue.use(TreeView)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
