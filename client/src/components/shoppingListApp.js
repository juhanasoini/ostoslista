import Vue from 'vue'

import { BootstrapVue } from 'bootstrap-vue'
import shoppinglist from './shoppinglist'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '../assets/stylesheets/theme.min.css'
import '../assets/stylesheets/styles.css'

Vue.use(BootstrapVue)

export default Vue.component('shoppinglistapp', {
    data: function() {
        return {
            user: {
                username: '',
                email: '',
                lists: []
            }
        }
    },
    created: function() {
        this.getUserData();
    },

    methods: {
        getUserData: async function() {
            let __ = this;
            await axios.get( '/api/user/currentuser' )
            .then( function ( response ) {
                __.user = response.data;
                Vue.set( __.user, 'lists', response.data.lists )
                console.log(__.user);
            })
            .catch( function( error ) {
                console.log(error);
            })
            // await fetch('/api/user/currentuser', {
            //     method: 'GET',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // })
            // .then(res => {
            //     if( res.status === 200 )                
            //         return res;
            // })
            // .then( res => res.json() )
            // .then( ( user ) => {
            //     this.user = user;
            //     console.log(this.user)
            // } );
        },
    },

	template: `
		<div class="container">
            <div class="row">
                <div class="col-sm-12">
                	<b-navbar class="mb-1 info-color" toggleable="lg" type="dark">
                      <b-navbar-brand href="#">Ostoslista<sup>TM</sup></b-navbar-brand>
                      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                      <b-collapse id="nav-collapse" is-nav>
                      	<b-navbar-nav class="ml-auto">
					      	<b-nav-item-dropdown right>
					      		<template  v-if="user" v-slot:button-content>
									<i class="fas fa-user"></i> {{user.username}}
								</template>	
								<b-dropdown-item href="#">My account</b-dropdown-item>
								<b-dropdown-item href="/logout">Kirjaudu ulos</b-dropdown-item>
					        </b-nav-item-dropdown>
				      	</b-navbar-nav>
                      </b-collapse>
                    </b-navbar>
                </div>
              </div>  
              
              <shoppinglist v-bind:lists="user.lists" />
                
            </div>
        </div>
	`
});