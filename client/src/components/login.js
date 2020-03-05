import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
import {loading, errors, sleep} from './helpers'
import axios from 'axios'

import router from '../routes'

export default Vue.component('Login', {
	data: function () {
		return {
			userName: '',
			password: '',
			errors: [],
			loading: false
		}
	},
	methods:{
		validateForm: function( ) {
			//Checks that input fields have input
			//Returns false when input is not OK else true
			let __ = this;
			this.errors = [];
			if( this.userName.trim() != '' && this.password.trim() != '' )
				return true;

			if( this.userName.trim() == '' )
				this.errors.push( { field: 'userName', message: 'Anna käyttäjänimi' } );

			if( this.password.trim() == '' )
				this.errors.push( { field: 'password', message: 'Anna salasana' } );
			__.loading = false;	

			return false;
		},
		async submitForm( e ){
			//Submits user credentials to the backend if form is validated
			//Shows errors if there are any
			let __ = this;
			__.loading = true;
			if( this.validateForm() )
			{
				try {
					await axios({
						url: '/api/user/login',
						method: 'post',
						withCredentials: true,
						data: { 
							userName: __.userName, 
			            	password: __.password 
						}
					})
			        .then( ( data ) => {
			        	if( data.length && data[0].message != 'success' )
			        	{
				        	data.forEach( function( value, index ){
								Vue.set( __.errors, index, {message: value.message } );
				        	});
							__.loading = false;	
			        	}
			        })
			        .then(res => {
			            router.push( { name: "index", params: { success: true } } );		                
			        })
			        .catch( (err) => {
			        	console.log(err)
						__.loading = false;	
			        } );
				} catch( error ){
					console.error( error );
					__.loading = false;	
				}
			}
		}
	},
	template: `
		<div class="d-flex align-items-center justify-content-center flex-column" style="height: 100vh">
			<img src="img/icons/android-icon-144x144.png" />
        	<div className="flex-row">
        		<b-card header="Kirjaudu sisään" header-tag="h3" class="mx-3">
        			<errors v-bind:error=errors />
        			<loading v-if="loading" text="Kirjaudutaan sisään" v-bind:wrapper=true />
				    <b-form inline v-on:submit.prevent="submitForm">
					    <b-input class="mb-2 mr-sm-2 mb-sm-0" placeholder="Käyttäjänimi" v-model="userName"></b-input>					    
					    <b-input placeholder="Salasana" type="password" class="mb-2 mb-sm-0 mr-sm-2" v-model="password"></b-input>
					    <b-button variant="primary" type="submit" class="ml-auto">Kirjaudu</b-button>
				  	</b-form>
				  	<template v-slot:footer>
				        Eikö sinulla ole vielä tiliä? Rekisteröidy <router-link :to="{ name: 'register'}">tästä</router-link>
		      		</template>
		  		</b-card>
        	</div>
    	</div>
	`
});