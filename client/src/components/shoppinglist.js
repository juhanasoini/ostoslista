function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

import Vue from 'vue'
import shoppinglistList from './shoppinglistList'

export default Vue.component('shoppinglist', {
	props: {
	    userid: {
	        type: Number,
	        required: true
	    }
	},
	data: function () {
		return {
			shoppingLists: [
			],
	  		shoppingList: null,
            itemList: [
                'Maito'
            ]
		}
	},
	getUserData: function() {

	},

	beforeCreate: function() {
	},
	created: function() {
		this.getUserLists( this.userid ).then( ( lists ) => {
			this.shoppingLists = lists;
			this.shoppingList = this.shoppingLists[0];
		});
		this.$emit('List created');
	},
	methods: {
        handleItemAdd: function( item ) {
            this.shoppingList.items.push( item );
            if( !this.itemList.includes( item.title ) )
                this.itemList.push( item.title );
        },
        handleItemRemove: function( id ) {
            let __ = this;
            __.shoppingList.items.some( function( item, index ) {
                if( item.id == id )
                {
                    __.shoppingList.items.splice( index, 1 );
                    return true;
                }
            });
        },
		getUserLists: async ( userID ) => {
			await sleep(2000);
			//Do some database fetching

			let shoppingLists = [
				{ 
					id: 78234620,
					name: 'Ostoslista 1',
					items: [
						{ id: 1234, title: 'Maito' }
					] 
				},
				{ 
					id: 78237520,
					name: 'Ostoslista 2',
					items: [
						{ id: 1233, title: 'Leipä' }
					] 
				}
			];
			return shoppingLists;
		},
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
  		<div class="d-flex flex-row">
  			<div class="mr-auto">
  				<shoppinglistList v-bind:list=shoppingList @add-item="handleItemAdd" @remove-list-item="handleItemRemove"  />
			</div>
			<div class="">
				<b-list-group class="shoppinglist-user-lists">
				  <b-list-group-item class="d-flex justify-content-between align-items-center" v-for="(list, index) in shoppingLists" v-bind:key="list.id">
				    <a v-on:click="chooseList( list.id )">{{list.name}}</a>
				    <b-badge class="ml-3" variant="primary" pill>{{ list.items.length }}</b-badge>
				  </b-list-group-item>
				</b-list-group>
			</div>
  		</div>`
});
