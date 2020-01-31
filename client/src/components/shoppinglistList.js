import Vue from 'vue'
import {loading} from './helpers'
import shoppinglistListItem from './shoppinglistListItem'

export default  Vue.component('shoppinglistList', {
	props: ['list', 'number'],
	data: function () {
		return {
	  		message: ''
		}
	},
	created: function() {
		this.$emit('List-list created');
	},
	methods: {
		add: function( event ) {
			event.preventDefault();

			let itemTitle = this.message.trim();
			if( itemTitle == ''  )
			    return false;

			let uniqid = (new Date().getTime()).toString(16);
			let item = { id: uniqid, title: this.message };
			this.message = '';

			this.$emit('add-item', item );
		},
		handleRemove( value ) {
            console.log('Child has been removed.', value);
        }
	},
  	template: `<div class="card bg-primary text-white">
        <div class="card-header">
            <template v-if="list">{{list.name}}</template>
        </div>
        <div class="card-body">
        	<template v-if="!list">
        	<loading text="Lataillaan" />
        	</template>
        	<template v-else>
                <ol class="shoppinglist-list">
                    <shoppinglistListItem v-for="item in list.items" v-bind:key=item.uniqid v-bind:data=item @removed="handleRemove" v-on="$listeners" />
                </ol>
            </template>
        </div>
        <div class="card-footer">
        	<form class="form-inline" v-on:submit.prevent>
            	<input class="form-control" type="text" v-model="message" v-on:keyup.enter="add" placeholder="Lisää listalle" autofocus /><b-button class="ml-2" variant="primary" v-on:click="add"><i class="fas fa-plus-circle"></i></b-button>
        	</form>
        </div>
    </div>`
});