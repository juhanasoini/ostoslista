import Vue from 'vue'
import {loading} from './helpers'
import shoppinglistListItem from './shoppinglistListItem'
import axios from 'axios'

export default  Vue.component('shoppinglistList', {
	props: ['list', 'lists', 'shared_lists', 'newListLoading'],
	data: function () {
		return {
	  		message: '',
	  		edit: false,
	  		prevName: '',
	  		nameUpdated: false,
	  		allRemoveDisabled: true,
	  		existsID: null,
	  		loading: false,
	  		newName: '',
	  		newListName: '',
	  		shareEmail: ''

		}
	},
	watch: {
	    list(newValue, oldValue) {
	    	let __ = this;
	    	__.toggleRemoveAllDone();
	    }
	},
	methods: {
		add: function( event ) {
			//Adds a new item to the list
			//Checks first if the new item already exists on the list
			//If it exists, this returns false
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
			//Removes a single item from the list array
			//and from the database
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
        shareList: function()
        {
        	//Shares a list
        	//Calls for a method that updates the lists shared attribute in the database
        	let __ = this;

        	if( __.shareEmail.trim() == '' )
        		return false;

    		this.updateShared( __.shareEmail )
    		.then( res => {    			
    			Vue.set( __.list, 'shared_with', res.data.shared_with );
			})
			.catch( err => {
        		console.error( err );
        	} );
        	

        	__.shareEmail = '';
        },
        updateShared: async function( email )
        {
        	let __ = this;

        	return await axios.put( '/api/list/shared', {email: email, list: __.list._id } );

        },
        toggleRemoveAllDone: function(){
        	//Toggles activity for the button that is used to remove items that are marked done
			this.allRemoveDisabled = true;
        	const assertOneDone = ( element ) => element.done === true;
			if( this.list.items.some( assertOneDone ) )
				this.allRemoveDisabled = false;
        },
        removeDone: async function() {
        	//Remove items that are marked as done from the list array and from the database
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
				__.toggleRemoveAllDone()
			})
			.catch( err => {
        		console.error( err );
        	} );
        },
        toggleEdit: function( event ) {
        	//Toggles between list items view and list edit view
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
        	//Removes a list from the database
        	//Emits an event to the parent component
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

	        		console.error( err );
	        		__.loading = false;
	        	} );
			}
        },
        updateList: async function() {
        	//Helper method to do the actual list update to the database
        	let __ = this;
        	return await axios.put( '/api/list/items', __.list );
        },
        updateListName:  async function( event ) {
        	//Updates list's name locally and to the database
        	event.preventDefault();
        	let __ = this;
        	if( __.newListName.trim() == '' )
        		return false;
        	await axios.put( '/api/list/name', {_id: __.list._id, name: __.newListName} )
        	.then( res => {
        		Vue.set( __.list, 'name', res.data.name );
        		Vue.set( __, 'prevName', res.data.name );
        	} )
        	.catch( err => {
        		if( err.response.status == 401 )
        			return this.$router.push( { name: "login"} );
        		console.error( err );
        	} );
        },
		newList: async function( event ) {
			//This calls the parent component to create a new list with the name 
			event.preventDefault();
			let __ = this;
			this.$emit( 'add-list', event );
			__.newName = '';
		}
	},
  	template: `
  		<div>
		  	<div v-if="!edit && list" class="card bg-primary text-white">
		        <div class="card-header">
		            <template v-if="list">
		            {{list.name}}
		            <b-button v-if="!list.is_shared" class="ml-2 btn-sm btn-success float-right d-none d-lg-block" v-on:click="toggleEdit" title="Muokkaa listaa"><i class="fas fa-edit"></i></b-button>
		        	<b-dropdown class="float-right d-lg-none" variant="primary" size="sm" no-caret right>
				    <template v-slot:button-content>
				      <i class="fas fa-ellipsis-v"></i>
				    </template>
				    <b-dropdown-item-button v-if="!list.is_shared" variant="success" class="text-center" v-on:click="toggleEdit" title="Muokkaa listaa" size="sm"><i class="fas fa-edit"></i></b-dropdown-item-button>
				    <b-dropdown-divider></b-dropdown-divider>
				    <b-dropdown-item v-for="(lista, index) in lists" v-bind:key="lista.id" @click="$emit('change-list', lista._id)" v-bind:class="{ 'bg-warning text-light': lista._id==list._id }">
				    	<span>{{lista.name}}</span>
			    		<span class="float-right">
					    	<b-badge v-if="lista.shared_with.length > 0" class="ml-3" variant="alert" pill title="Olet jakanut tämän listan"><i class="fas fa-share-square"></i></b-badge><b-badge v-if="lista.items" variant="primary" pill>{{ lista.items.length }}</b-badge>
					    </span>
				    </b-dropdown-item>
				    <b-dropdown-item v-for="(shared, index) in shared_lists" v-bind:key="shared.id" @click="$emit('change-list', shared._id)" v-bind:class="{ 'bg-warning text-light': shared._id==list._id }">
				    	<span>{{shared.name}}</span>
			    		<span class="float-right">
					    	<b-badge class="ml-3" variant="alert" pill title="Tämä lista on jaettu kanssasi"><i class="fas fa-share-square fa-flip-horizontal"></i></b-badge><b-badge v-if="shared.items" variant="primary" pill>{{ shared.items.length }}</b-badge>
					    </span>
				    </b-dropdown-item>
				    <b-dropdown-divider></b-dropdown-divider>
				    <b-dropdown-form v-bind:style="{width: '200px'}">
				    	<b-input-group size="sm">
				    		<loading v-if="newListLoading" text="" v-bind:wrapper=true />
							<b-form-input placeholder="Uusi lista" v-bind:value="newName" v-on:input="$emit('alter-newlistname', $event)" v-on:keyup.enter="newList"></b-form-input>
							<b-input-group-append>
								<b-button size="sm" variant="success" v-on:click="newList" title="Tallenna"><i class="fas fa-check"></i></b-button>
							</b-input-group-append>
						</b-input-group>
					</b-dropdown-form>
				  </b-dropdown>
		            </template>
		        </div>
		        <div class="card-body">
		    		<loading v-if="!list" text="Lataillaan" v-bind:wrapper=true />
		            <ol class="shoppinglist-list" v-if="list.items && list.items.length > 0">
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
		        	TODO: Jakotoiminnallisuus on kesken
		        	<h4>Jaa lista</h4>
		        	<small class="text-info mb-2 d-block">Voit jakaa listan sellaisen henkilön kanssa joka on myös rekisteröitynyt tähän palveluun</small>
		        	<form class="form-inline mb-3">
		        		<input class="form-control form-control-sm shoppinglist-input-auto" v-model="shareEmail" type="email" placeholder="Anna sähköpostiosoite">
		            	<b-button class="ml-2 btn-sm" variant="success" title="Jaa lista" v-on:click="shareList" ><i class="fas fa-share-square" ></i></b-button>
		            </form>
		            <div v-if="list.shared_with.length > 0">
			            <p class="mb-1"><b>Lista jaettu seuraavien käyttäjien kanssa:</b></p>
			            <ul class="pl-3">
			            	<li v-for="(shared, index) in list.shared_with">{{shared.email}}</li>
			            </ul>
			            
		            </div>
		        </div>
		        <div class="card-footer text-right">
		        	<b-button class="ml-2 btn-sm" variant="warning" v-on:click="toggleEdit" title="Sulje muokkaus"><i class="fas fa-undo"></i></b-button>
		        </div>
		    </div>
	    </div>
    `
});