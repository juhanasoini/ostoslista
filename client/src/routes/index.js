import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

const Home = {
  template: '<div>Homespää</div>'
}

let router = new Router({  
	mode: 'history',
	routes: [
		{      
			path: '/',      
			name: 'Home',      
			component: Home
		}  
	]
});


export default router;