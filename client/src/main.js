import Vue from 'vue'
// import App from './App.vue'
// import shoppinglistapp from './components/shoppingListApp'
import App from './components/App'
// https://blog.jscrambler.com/build-a-task-management-app-using-vue-js-and-a-node-js-backend/
import router from './routes'

import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
	router,
  	render: h => h(App),
}).$mount('#shoppinglist-app')
