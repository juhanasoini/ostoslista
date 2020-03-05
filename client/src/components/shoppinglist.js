function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

import Vue from 'vue'
import shoppinglistList from './shoppinglistList'
import axios from 'axios'
import {loading} from './helpers'

export default Vue.component('shoppinglist', {
	props: {
	    lists: Array,
	    shared_lists: Array
	},
	data: function () {
		return {
			shoppingLists: [],
			sharedShoppingLists: [],
	  		shoppingList: null,
            itemList: [],
            showNewListForm: false,
            newListName: '',
            newListLoading: false,
            listType: 'normal'
		}
	},
	watch: {
	    lists(newValue, oldValue) {
	    	this.shoppingLists = newValue;
	    	if( this.shoppingList === null )
				this.shoppingList = this.shoppingLists[0];
			else
				this.chooseList( this.shoppingList._id );
	    },
	    shared_lists(newValue, oldValue) {
	    	this.sharedShoppingLists = newValue;
	    	if( this.shoppingList === null )
				this.shoppingList = this.sharedShoppingLists[0];
			else
				this.chooseList( this.shoppingList._id );
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
            let listFound = false;
			__.shoppingLists.some( function( item, index ) {
                if( item._id == listid )
                {
                    Vue.set( __, 'shoppingList', __.shoppingLists[index] );
                    listFound = true;
                    __.listType = 'normal'
                    return true;
                }
            });

			if( listFound )
				return true;

            __.sharedShoppingLists.some( function( item, index ) {
                if( item._id == listid )
                {
                    Vue.set( __, 'shoppingList', __.sharedShoppingLists[index] );
                    listFound = true;
                    __.listType = 'shared'
                    return true;
                }
            });
		},
		toggleAddNewList: function() {
			this.showNewListForm = !this.showNewListForm;
			if( !this.showNewListForm )
				this.newListName = '';
		},
		alterNewListName: function( newName )
		{
			//This is stupid
			let __ = this;
			__.newListName = newName;
		},
		addNewList: async function( event ) {
			event.preventDefault();
			let __ = this;
        	if( __.newListName.trim() == '' )
        		return false;

        	__.newListLoading = true;
        	await axios.post( '/api/list', {name: __.newListName} )
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
  				<shoppinglistList 
  					v-bind:list=shoppingList 
  					v-bind:lists=shoppingLists 
  					v-bind:newListLoading=newListLoading 
  					@alter-newlistname="alterNewListName"
  					@add-list="addNewList" 
  					@add-item="handleItemAdd" 
  					@list-removed="removeList" 
  					@change-list="chooseList" />
			</div>
			<div class="d-none d-lg-block col-sm-3">
				<div>
					<b-list-group class="shoppinglist-user-lists">
					  <b-list-group-item v-on:click="chooseList( list._id )" class="d-flex justify-content-between align-items-center" v-for="(list, index) in shoppingLists" v-bind:key="list.id" v-bind:class="{ 'bg-warning text-light': list._id==shoppingList._id }">
					    <a>{{list.name}}</a>
					    <b-badge v-if="list.items" class="ml-3" variant="primary" pill>{{ list.items.length }}</b-badge>
					  </b-list-group-item>
					  <b-list-group-item v-on:click="chooseList( list._id )" class="d-flex justify-content-between align-items-center" v-for="(list, index) in sharedShoppingLists" v-bind:key="list.id" v-bind:class="{ 'bg-warning text-light': list._id==shoppingList._id }">
					    <a>{{list.name}}</a>
					    <span>
					    <b-badge class="ml-3" variant="alert" pill title="Jaettu sinun kanssasi"><i class="fas fa-share-square fa-flip-horizontal"></i></b-badge><b-badge v-if="list.items" variant="primary" pill>{{ list.items.length }}</b-badge>
					    </span>
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
