function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

import Vue from 'vue'
import shoppinglistList from './shoppinglistList'
import axios from 'axios'

export default Vue.component('shoppinglist', {
	props: {
	    lists: Array

	},
	data: function () {
		return {
			shoppingLists: [
			],
	  		shoppingList: null,
            itemList: [
            ]
		}
	},
	watch: {
	    lists(newValue, oldValue) {
	    	this.shoppingLists = newValue;
			this.shoppingList = this.shoppingLists[0];
	    }
	},
	created: function() {
		this.$emit('List created');
	},
	methods: {
        handleItemAdd: function( item ) {
            if( this.itemList.includes( item.title ) )
            	return false;

            this.itemList.push( item.title );
            // this.shoppingList.items.push( item );

            // this.updateList();
        },
        // updateList: async function() {
        // 	let __ = this;

        // 	await axios.put( '/api/list/items', __.shoppingList );
        // },
		// getUserLists: async ( userID ) => {
		// 	await sleep(2000);
		// 	//Do some database fetching

		// 	let shoppingLists = [
		// 		{ 
		// 			id: 78234620,
		// 			name: 'Ostoslista 1',
		// 			items: [
		// 				{ id: 1234, title: 'Maito' }
		// 			] 
		// 		},
		// 		{ 
		// 			id: 78237520,
		// 			name: 'Ostoslista 2',
		// 			items: [
		// 				{ id: 1233, title: 'Leipä' }
		// 			] 
		// 		}
		// 	];
		// 	return shoppingLists;
		// },
		chooseList: function( listid ) {
            let __ = this;
			__.shoppingLists.some( function( item, index ) {
                if( item.id == listid )
                {
                    __.shoppingList = __.shoppingLists[index];
                    return true;
                }
            });
		}
        
    },
  	template: `
  		<div class="row">
  			<div class="col-sm-12 col-lg-6">
  				<shoppinglistList v-bind:list=shoppingList @add-item="handleItemAdd"  />
			</div>
			<div class="d-none d-lg-block col-sm-3">
				<b-list-group class="shoppinglist-user-lists">
				  <b-list-group-item class="d-flex justify-content-between align-items-center" v-for="(list, index) in shoppingLists" v-bind:key="list.id">
				    <a v-on:click="chooseList( list.id )">{{list.name}}</a>
				    <b-badge class="ml-3" variant="primary" pill>{{ list.items.length }}</b-badge>
				  </b-list-group-item>
				</b-list-group>
			</div>
		</div>`
});
