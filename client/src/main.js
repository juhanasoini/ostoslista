import Vue from 'vue'
// import App from './App.vue'
import shoppinglist from './components/shoppinglist'
import { BootstrapVue } from 'bootstrap-vue'
// https://blog.jscrambler.com/build-a-task-management-app-using-vue-js-and-a-node-js-backend/
import router from './routes'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/stylesheets/theme.min.css'
import './assets/stylesheets/styles.css'
import './registerServiceWorker'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
	router,
  	render: h => h(shoppinglist, {props: {userid: 2} }),
}).$mount('#shoppinglist-app')
