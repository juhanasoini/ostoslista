import Vue from "vue"
import Router from "vue-router"
import Login from '../components/login'
import shoppinglistapp from '../components/shoppingListApp'
import registrationForm from '../components/registrationForm'
import userService from '../user.service.js'

Vue.use(Router)

let router = new Router({  
	mode: 'history',
	routes: [
		{      
			path: '/login',      
			name: 'login',      
			component: Login
		},
		{      
			path: '/register',      
			name: 'register',      
			component: registrationForm
		},
		{      
			path: '/',
			name: 'index',      
			component: shoppinglistapp,
			beforeEnter: async (to, from, next) => {
				let result = await userService.isLoggedIn();
				if( result )
				{
					next();
				}
				else
					next({ path: '/login' });
			}
		}  
	]
});


export default router;