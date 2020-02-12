import Vue from 'vue'

import { BootstrapVue } from 'bootstrap-vue'
import {loading, errors, success} from './helpers'
import router from '../routes'

export default Vue.component('registrationForm', {
	data: function() {
		return {
			username: '',
			password: '',
			passwordConf: '',
			email: '',
			errors: [],
			errorFields: [],
			loading: false,
			phase: 'register'
		};
	},
	methods:{
		validateForm: function( ) {
			this.errors = [];
			this.errorFields = [];
			
			let username = this.username.trim();
			let password = this.password.trim();
			let passwordconf = this.passwordConf.trim();
			let email = this.email.trim();

			if( username == '' )
			{
				this.errors.push( { message: 'Anna käyttäjänimi' } );
				this.errorFields.push( 'username' );
			}

			if( email == '' )
			{
				this.errors.push( { message: 'Anna Sähköpostiosoite' } );
				this.errorFields.push( 'email' );
			}

			if( password == '' )
			{
				this.errors.push( {  message: 'Anna salasana' } );
				this.errorFields.push( 'password' );
			}

			if( passwordconf == '' )
			{
				this.errors.push( { message: 'Anna salasana uudelleen' } );
				this.errorFields.push( 'passwordConf' );
			}
			else
			{
				if( password != passwordconf )
				{
					this.errors.push( { message: 'Salasanat eivät täsmää' } );
					this.errorFields.push( 'password' );
					this.errorFields.push( 'passwordConf' );
				}
			}

			return this.errors.length == 0;
		},
		async submitForm( e ){
			let __ = this;
			__.loading = true;
			if( this.validateForm() )
			{
				try {
					let response = await fetch('/api/user/register', {
			            method: 'POST',
			            body: JSON.stringify( {
			            	username: this.username, 
			            	password: this.password, 
			            	email: this.email 
			            }),
			            headers: {
			                'Content-Type': 'application/json'
			            }
			        });
			        if( response.status == 400 )
			        {
			        	let data = await response.json();
			        	__.errorFields = Object.keys( data );
			        	let values = Object.values(data)
			        	values.forEach( function( value, index ){
							Vue.set( __.errors, index, {message: value.message } );
			        	});
			        }
			        else
			        	this.phase = 'success';

				} catch( error ){
					console.error( error );
				}
			}
			
			__.loading = false;
		}
	},
	template: `
		<div class="d-flex align-items-center justify-content-center" style="height: 100vh">
        	<div class="flex-row w-50">
        		<b-card header="Rekisteröidy" header-tag="h3" class="mx-3">
        			<errors v-bind:error=errors />
        			<loading v-if="loading" text="Lataa" v-bind:wrapper=true />
				    <b-form v-if="phase === 'register'" v-on:submit.prevent="submitForm">
				    	<b-form-row class="mb-sm-3"> 
				    		<div class="col-sm-6">
					    		<b-input class="mb-2 mr-sm-2 mb-sm-0" v-bind:class="{ 'is-invalid': errorFields.indexOf( 'username' ) != -1}" placeholder="Käyttäjänimi*" v-model="username" ></b-input>
				    		</div>
				    		<div class="col-sm-6">
					    		<b-input class="mb-2 mr-sm-2 mb-sm-0" v-bind:class="{ 'is-invalid': errorFields.indexOf( 'email' ) != -1}" placeholder="Sähköpostiosoite*" v-model="email" type="email" ></b-input>
				    		</div>
					    </b-form-row> 
					    <b-form-row class="mb-3">
				    		<div class="col-sm-6">
					    		<b-input class="mb-2 mr-sm-2 mb-sm-0" v-bind:class="{ 'is-invalid': errorFields.indexOf( 'password' ) != -1}" placeholder="Salasana*" type="password" v-model="password" ></b-input>
				    		</div>
				    		<div class="col-sm-6">
				    			<b-input class="mb-2 mr-sm-2 mb-sm-0" v-bind:class="{ 'is-invalid': errorFields.indexOf( 'passwordConf' ) != -1}" placeholder="Salasana uudelleen*" type="password" v-model="passwordConf" ></b-input>
			    			</div>
					    </b-form-row> 
					    <b-form-row>
				    		<div class="col">
					    		<b-button class="float-right" variant="primary" type="submit">Rekisteröidy</b-button>
					    	</div>
				    	</b-form-row>
				  	</b-form>
				  	<success v-if="phase === 'success'">
				  		<template v-slot:message>
					    	<h3>Tili luotu</h3><p>Voit nyt kirjautua.</p>
					  	</template>
				  		<template v-slot:link>
				  			<b-button href="#" :to="{ name: 'login'}" variant="info">Kirjautumiseen</b-button>
					  	</template>
				  	</success>
		  		</b-card>
        	</div>
    	</div>
	`

});