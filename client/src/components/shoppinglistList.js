import Vue from 'vue'
import {loading} from './helpers'
import shoppinglistListItem from './shoppinglistListItem'
import axios from 'axios'

export default  Vue.component('shoppinglistList', {
	props: ['list', 'number'],
	data: function () {
		return {
	  		message: '',
	  		edit: false,
	  		prevName: '',
	  		nameUpdated: false,
	  		allRemoveDisabled: true,
	  		existsID: null,
	  		newListName: ''
		}
	},
	created: function() {
		this.$emit('List-list created');
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
        	this.list.items.forEach( function( element, i ){

        	});
        	for (var i = this.list.items.length - 1; i >= 0; i--) 
        	{
			    if( this.list.items[i].done ) { 
			        this.list.items.splice( i, 1 );
			    }
			}

			await this.updateList()
			.then( res => console.log( res ) )
			.catch( err => {
        		console.error( err );
        	} );
        },
        toggleEdit: function( event ) {
			event.preventDefault();
			this.edit = !this.edit;
			if( this.edit  )
			{
				this.newListName = this.list.name.valueOf();
				this.prevName = this.list.name;
			}
			else
			{
				this.newListName = '';
				this.list.name = this.prevName;
			}
        },
        removeList: function( event ) {
			event.preventDefault();
			if( confirm( `Haluatko varmasti poistaa listan: ${this.list.name}` ) )
			{
				console.log(this.list);
			}
        },
        updateList: async function() {
        	let __ = this;

        	return await axios.put( '/api/list/items', __.list );
        },
        updateListName:  async function( event ) {
        	event.preventDefault();
        	if( this.newListName.trim() == '' )
        		return false;
        	await axios.put( '/api/list/name', {_id: this.list._id, name: this.newListName} )
        	.then( res => {
        		return res;
        	} )
        	.catch( err => {
        		console.error( err )
        	} );
        }
	},
  	template: `
  		<div>
		  	<div v-if="!edit" class="card bg-primary text-white">
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
				    <b-dropdown-item href="#">...</b-dropdown-item>
				  </b-dropdown>
		            </template>
		        </div>
		        <div class="card-body">
		    		<loading v-if="!list" text="Lataillaan" />
		            <ol class="shoppinglist-list" v-if="list">
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