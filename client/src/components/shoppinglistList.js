import Vue from 'vue'
import {loading} from './helpers'
import shoppinglistListItem from './shoppinglistListItem'
import axios from 'axios'

export default  Vue.component('shoppinglistList', {
	props: ['list', 'number', 'lists'],
	data: function () {
		return {
	  		message: '',
	  		edit: false,
	  		prevName: '',
	  		nameUpdated: false,
	  		allRemoveDisabled: true,
	  		existsID: null,
	  		newListName: '',
	  		newListLoading: false,
	  		loading: false
		}
	},
	created: function() {
		this.$emit('List-list created');
	},
	watch: {
	    list(newValue, oldValue) {
	    	let __ = this;
	    	__.edit = false;
	    	__.newListName = '';
	    	__.prevName = '';
	    }
	},
	methods: {
		add: function( event ) {
			event.preventDefault();

			let itemTitle = this.message.trim();
			if( itemTitle == '' )
			    return false;

			const exists = ( element ) => { if( element.title.toLowerCase() == itemTitle.toLowerCase() ){ this.existsID = element._id; return true;}};
			if( this.list.items.some( exists ) )
			{
				this.message = '';
				return false;
			}

			let uniqid = (new Date().getTime()).toString(16);
			let item = { 
				id: uniqid, 
				title: itemTitle, 
				done: false 
			};
			this.message = '';
			this.list.items.push( item );

			this.updateList();

			this.$emit('add-item', item );
		},
		removeItem: async function( item ) {
            let key = 'id';
            let index = -1;
            if( typeof item._id != 'undefined' ) 
            	key = '_id';

            this.list.items.some( function( element, i ){
            	if( element[key] == item[key] )
            	{
            		index = i;
            		return true;
            	}
            } );
            if( index != -1 )
            {
            	this.list.items.splice( index, 1 );

				await this.updateList()
				.then( res => console.log( res ) )
				.catch( err => {
	        		console.error( err );
	        	} );
				
            	return true;
            }

            return false;
        },
        toggleRemoveAllDone: function(){
			this.allRemoveDisabled = true;
        	const assertOneDone = ( element ) => element.done === true;
			if( this.list.items.some( assertOneDone ) )
				this.allRemoveDisabled = false;
        },
        removeDone: async function() {
        	let __ = this;
        	this.list.items.forEach( function( element, i ){

        	});
        	for (var i = this.list.items.length - 1; i >= 0; i--) 
        	{
			    if( this.list.items[i].done ) { 
			        this.list.items.splice( i, 1 );
			    }
			}

			await this.updateList()
			.then( res => {
				console.log( res ) 
				__.toggleRemoveAllDone()
			})
			.catch( err => {
        		console.error( err );
        	} );
        },
        toggleEdit: function( event ) {
			event.preventDefault();
			let __ = this;
			__.edit = !__.edit;
			if( __.edit  )
			{
				__.newListName = __.list.name.valueOf();
				__.prevName = __.list.name;
			}
			else
			{
				__.newListName = '';
				__.list.name = __.prevName;
			}
        },
        removeList: async function( event ) {
			event.preventDefault();
			let __ = this;
			let listID = __.list._id;
			let listName = __.list.name;
			if( confirm( `Haluatko varmasti poistaa listan: ${listName}` ) )
			{
				__.loading = true;
	        	await axios.delete( '/api/list/'+listID )
	        	.then( res => {

					__.$emit('list-removed', listID );
					__.loading = false;
	        	} )
	        	.catch( err => {
	        		if( err.response.status == 401 )
	        			return this.$router.push( { name: "login"} );

        		console.log( err.response );
	        		console.error( err );
	        		__.loading = false;
	        	} );
			}
        },
        updateList: async function() {
        	let __ = this;

        	return await axios.put( '/api/list/items', __.list );
        },
        updateListName:  async function( event ) {
        	let __ = this;
        	event.preventDefault();
        	if( __.newListName.trim() == '' )
        		return false;
        	await axios.put( '/api/list/name', {_id: __.list._id, name: __.newListName} )
        	.then( res => {
        		Vue.set( __.list, 'name', res.data.name );
        	} )
        	.catch( err => {
        		if( err.response.status == 401 )
        			return this.$router.push( { name: "login"} );
        		console.error( err );
        	} );
        },
		addNewList: async function( event ) {
			event.preventDefault();
			let __ = this;
        	if( __.newListName.trim() == '' )
        		return false;

        	__.newListLoading = true;
        	await axios.post( '/api/list', {name: this.newListName} )
        	.then( list => {
        		__.newListName = '';
        		// __.shoppingLists.push( list.data );

        		// __.chooseList( list.data._id );

        		__.newListLoading = false;
        	} )
        	.catch( err => {
        		console.error( err );
        		__.newListLoading = false;
        	} );
		}
	},
  	template: `
  		<div>
		  	<div v-if="!edit && list" class="card bg-primary text-white">
		        <div class="card-header">
		            <template v-if="list">
		            {{list.name}}
		            <b-button class="ml-2 btn-sm btn-success float-right d-none d-lg-block" v-on:click="toggleEdit" title="Muokkaa listaa"><i class="fas fa-edit"></i></b-button>
		        	<b-dropdown class="float-right d-lg-none" variant="primary" size="sm" no-caret right>
				    <template v-slot:button-content>
				      <i class="fas fa-ellipsis-v"></i>
				    </template>
				    <b-dropdown-item-button variant="success" class="text-center" v-on:click="toggleEdit" title="Muokkaa listaa" size="sm"><i class="fas fa-edit"></i></b-dropdown-item-button>
				    <b-dropdown-divider></b-dropdown-divider>
				    <b-dropdown-item v-for="(lista, index) in lists" v-bind:key="lista.id" @click="$emit('change-list', lista._id)" v-bind:class="{ 'bg-warning text-light': lista._id==list._id }"><span class="d-block position-relative">{{lista.name}}<b-badge v-if="list.items" class="ml-3 position-absolute" v-bind:style="{right: '0', top: '4px'}"variant="primary" pill>{{ lista.items.length }}</b-badge></span></b-dropdown-item>
				    <b-dropdown-divider></b-dropdown-divider>
				    <b-dropdown-form v-bind:style="{width: '200px'}">
				    	<b-input-group size="sm">
				    		<loading v-if="newListLoading" text="" v-bind:wrapper=true />
							<b-form-input placeholder="Listan nimi" v-model="newListName" v-on:keyup.enter="addNewList"></b-form-input>
							<b-input-group-append>
								<b-button size="sm" variant="success" v-on:click="addNewList" title="Tallenna"><i class="fas fa-check"></i></b-button>
							</b-input-group-append>
						</b-input-group>
					</b-dropdown-form>
				  </b-dropdown>
		            </template>
		        </div>
		        <div class="card-body">
		    		<loading v-if="!list" text="Lataillaan" v-bind:wrapper=true />
		            <ol class="shoppinglist-list" v-if="list.items.length > 0">
		                <shoppinglistListItem 
		                	v-for="item in list.items" 
		                	v-bind:key=item.uniqid 
		                	v-bind:data=item 
		                	v-bind:existsID=existsID
		                	@remove-list-item="removeItem" 
		                	@item-done="toggleRemoveAllDone" 
		                	@update-list="updateList"
		                	@reset-existingID="existsID = null"
		                	v-on="$listeners" />
		            </ol>
		            <div v-else class="alert alert-secondary" role="alert">
						Listalla ei ole vielä kohteita.
					</div>
		            <button v-on:click="removeDone" class="btn btn-warning btn-sm float-right" v-bind:disabled="allRemoveDisabled" title="Poista valmiit"><i class="fas fa-trash-alt"></i></button>
		        </div>
		        <div class="card-footer">
		        	<form class="form-inline" v-on:submit.prevent>
		            	<input class="form-control shoppinglist-input-auto" type="text" v-model="message" v-on:keyup.enter="add" placeholder="Lisää listalle" autofocus /><b-button class="ml-2" variant="primary" v-on:click="add"><i class="fas fa-plus-circle"></i></b-button>
		        	</form>
		        </div>
		    </div>
		    <div v-if="edit" class="card bg-primary text-white">
		        <div class="card-header form-inline">
		            <input class="form-control form-control-sm shoppinglist-input-auto" type="text" v-model="newListName">
		            <b-button class="ml-2 btn-sm" variant="success" title="Tallenna nimi" v-on:click="updateListName" v-bind:disabled="newListName == list.name"><i class="fas fa-check"></i></b-button>
		        </div>
		        <div class="card-body">
		        	<loading v-if="loading" text="" v-bind:wrapper=true />
		        	<b-button class="ml-2 btn-sm" variant="danger" v-on:click="removeList" title="Sulje muokkaus"><i class="fas fa-trash-alt"></i> Poista lista</b-button>
		        	<hr>
		        	<h4>Jaa lista</h4>
		        	<small class="text-info mb-2 d-block">Voit jakaa listan sellaisen henkilön kanssa joka on myös rekisteröitynyt tähän palveluun</small>
		        	<form class="form-inline">
		        		<input class="form-control form-control-sm shoppinglist-input-auto" type="email" placeholder="Anna sähköpostiosoite">
		            	<b-button class="ml-2 btn-sm" variant="success" title="Jaa lista"><i class="fas fa-share-square" ></i></b-button>
		            </form>
		        </div>
		        <div class="card-footer text-right">
		        	<b-button class="ml-2 btn-sm" variant="warning" v-on:click="toggleEdit" title="Sulje muokkaus"><i class="fas fa-undo"></i></b-button>
		        </div>
		    </div>
	    </div>
    `
});