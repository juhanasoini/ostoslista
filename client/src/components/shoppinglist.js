function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

import Vue from 'vue'
import shoppinglistList from './shoppinglistList'
import axios from 'axios'
import {loading} from './helpers'

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
            ],
            showNewListForm: false,
            newListName: ''
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
        },
		chooseList: function( listid ) {
            let __ = this;
			__.shoppingLists.some( function( item, index ) {
                if( item._id == listid )
                {
                    __.shoppingList = __.shoppingLists[index];
                    return true;
                }
            });
		},
		toggleAddNewList: function() {
			this.showNewListForm = !this.showNewListForm;
			if( !this.showNewListForm )
				this.newListName = '';
		},
		addNewList: async function( event ) {
			event.preventDefault();
			let __ = this;
        	if( __.newListName.trim() == '' )
        		return false;

        	await axios.post( '/api/list', {name: this.newListName} )
        	.then( list => {
        		__.shoppingLists.push( list.data );
        	} )
        	.catch( err => {
        		console.error( err )
        	} );

		}
        
    },
  	template: `
  		<div class="row">
  			<div class="col-sm-12 col-lg-6">
  				<shoppinglistList v-bind:list=shoppingList @add-item="handleItemAdd"  />
			</div>
			<div class="d-none d-lg-block col-sm-3">
				<div>
					<b-list-group class="shoppinglist-user-lists">
					  <b-list-group-item v-on:click="chooseList( list._id )" class="d-flex justify-content-between align-items-center" v-for="(list, index) in shoppingLists" v-bind:key="list.id">
					    <a>{{list.name}}</a>
					    <b-badge v-if="list.items" class="ml-3" variant="primary" pill>{{ list.items.length }}</b-badge>
					  </b-list-group-item>
					</b-list-group>
					<div>
						<b-button v-if="!showNewListForm" class="float-right" size="sm" variant="success" v-on:click="toggleAddNewList" title="Lisää lista"><i class="fas fa-plus"></i></b-button>
						<b-input-group v-if="showNewListForm" class="mb-3" size="sm">
							<b-form-input placeholder="Listan nimi" v-model="newListName"></b-form-input>
							<b-input-group-append>
								<b-button size="sm" variant="success" v-on:click="addNewList" title="Tallenna"><i class="fas fa-check"></i></b-button>
								<b-button size="sm" variant="warning" v-on:click="toggleAddNewList" title="Peruuta"><i class="fas fa-undo"></i></b-button>
							</b-input-group-append>
						</b-input-group>
					</div>
					
				</div>
			</div>
		</div>`
});
