import Vue from 'vue'
///https://github.hubspot.com/offline/
import { BootstrapVue } from 'bootstrap-vue'
import shoppinglist from './shoppinglist'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '../assets/stylesheets/theme.min.css'
import '../assets/stylesheets/styles.css'
import '../assets/stylesheets/offline-theme-default.css'

Vue.use(BootstrapVue); 

export default Vue.component('shoppinglistapp', {
    data: function() {
        return {
            user: {
                username: '',
                email: '',
                lists: [],
                timer: null
            }
        }
    },
    created: function() {
        //Get current user data and set a timer to update it periodically
        this.getUserData();
        this.timer = setInterval(this.getUserData, 10000);
    },

    methods: {
        //Fetches user data from the backend
        getUserData: async function() {
            let __ = this;
            await axios.get( '/api/user/currentuser' )
            .then( function ( response ) {
                __.user = response.data;
                Vue.set( __.user, 'lists', response.data.lists );
                Vue.set( __.user, 'shared_lists', response.data.shared_lists );
            })
            .catch( function( error ) {
                console.log(error);
            })
        },
    },
    beforeDestroy () {
        //Clear timer
        clearInterval(this.timer)
    },

	template: `
		<div class="container">
            <div class="row">
                <div class="col-sm-12">
                	<b-navbar class="mb-1 info-color" type="dark">
                      <b-navbar-brand href="#">ListaAPP<sup>TM</sup></b-navbar-brand>
                      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
                      <b-collapse id="nav-collapse" is-nav>
                      	<b-navbar-nav class="ml-auto">
					      	<b-nav-item-dropdown right>
					      		<template  v-if="user" v-slot:button-content>
									<i class="fas fa-user"></i> {{user.username}}
								</template>
								<b-dropdown-item href="/logout">Kirjaudu ulos</b-dropdown-item>
					        </b-nav-item-dropdown>
				      	</b-navbar-nav>
                      </b-collapse>
                    </b-navbar>
                </div>
              </div>  
              
              <shoppinglist v-bind:lists="user.lists" v-bind:shared_lists="user.shared_lists" />
                
            </div>
        </div>
	`
});