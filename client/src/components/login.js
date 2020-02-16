import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
import {loading, errors, sleep} from './helpers'

import router from '../routes'

export default Vue.component('Login', {
	data: function () {
		return {
			userName: 'Julle',
			password: 'passu',
			errors: [],
			loading: false
		}
	},
	methods:{
		validateForm: function( ) {
			this.errors = [];
			if( this.userName.trim() != '' && this.password.trim() != '' )
				return true;

			if( this.userName.trim() == '' )
				this.errors.push( { field: 'userName', message: 'Anna käyttäjänimi' } );

			if( this.password.trim() == '' )
				this.errors.push( { field: 'password', message: 'Anna salasana' } );

			return false;
		},
		async submitForm( e ){
			let __ = this;
			__.loading = true;
			if( this.validateForm() )
			{
				try {
					fetch('/api/user/login', {
			            method: 'POST',
			            body: JSON.stringify( {userName: this.userName, password: this.password }),
			            headers: {
			                'Content-Type': 'application/json'
			            }
			        })
			        .then(res => {
			            if( res.status === 200 )
			                router.push( { name: "index"} );
			            
			            return res;
			        })
			        .then(res => res.json() )
			        .then( ( data ) => {
			        	if( data.length && data[0].message != 'success' )
			        	{
				        	data.forEach( function( value, index ){
								Vue.set( __.errors, index, {message: value.message } );
				        	});			        		
			        	}
			        })
			        .catch( (err) => {
			        	console.error(err)
			        } );
				} catch( error ){
					console.error( error );
				}
			}
			__.loading = false;
		}
	},
	template: `
		<div class="d-flex align-items-center justify-content-center" style="height: 100vh">
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