import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'

//This is the root of all (evil?) the grand parent component
//Implements a router so that we can use different main components for example
// main view
// login view 
// and registration view 
export default Vue.component('App', {
	template: `
		<router-view></router-view>
	`
});