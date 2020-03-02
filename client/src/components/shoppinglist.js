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
            newListName: '',
            newListLoading: false
		}
	},
	watch: {
	    lists(newValue, oldValue) {
	    	this.shoppingLists = newValue;
	    	if( this.shoppingList === null )
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

        	__.newListLoading = true;
        	await axios.post( '/api/list', {name: this.newListName} )
        	.then( list => {
        		__.shoppingLists.push( list.data );
        		__.toggleAddNewList();

        		__.chooseList( list.data._id );

        		__.newListLoading = false;
        	} )
        	.catch( err => {
        		console.error( err );
        		__.newListLoading = false;
        	} );
		},
		removeList: function( listID )
		{
			let __ = this;
			let index = -1;
			__.shoppingLists.forEach( function( e, i ){
				if( e._id == listID )
					index = i;
			});

			if( index != -1 )
			{
				__.shoppingLists.splice( index, 1 );
				if( __.shoppingLists.length > 0 )
					__.chooseList( __.shoppingLists[0]._id );
				else
					__.shoppingList = null;
			}
		}
        
    },
  	template: `
  		<div class="row">
  			<div class="col-sm-12 col-lg-6">
  				<shoppinglistList v-bind:list=shoppingList v-bind:lists=shoppingLists @add-item="handleItemAdd" @list-removed="removeList"  @change-list="chooseList" />
			</div>
			<div class="d-none d-lg-block col-sm-3">
				<div>
					<b-list-group class="shoppinglist-user-lists">
					  <b-list-group-item v-on:click="chooseList( list._id )" class="d-flex justify-content-between align-items-center" v-for="(list, index) in shoppingLists" v-bind:key="list.id" v-bind:class="{ 'bg-warning text-light': list._id==shoppingList._id }">
					    <a>{{list.name}}</a>
					    <b-badge v-if="list.items" class="ml-3" variant="primary" pill>{{ list.items.length }}</b-badge>
					  </b-list-group-item>
					</b-list-group>
					<div>
						<b-button v-if="!showNewListForm" class="float-right" size="sm" variant="success" v-on:click="toggleAddNewList" title="Lisää lista"><i class="fas fa-plus"></i></b-button>
						<b-input-group v-if="showNewListForm" class="mb-3" size="sm">
							<loading v-if="newListLoading" text="" v-bind:wrapper=true />
							<b-form-input placeholder="Listan nimi" v-model="newListName" v-on:keyup.enter="addNewList"></b-form-input>
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
