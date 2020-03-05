import Vue from 'vue'

//Single list item

export default  Vue.component('shoppinglistListItem', {
	props: ['data', 'existsID'],
	data: function () {
		return {
	  		isHidden: false,
	  		informExists: false
		}
	},
	created: function() {
		this.$emit('created');
	},
	computed: {
		//Insert classes to current item based on it's data
		insertClasses: function() {
			return {
				'done': this.data.done,
				'hidden': this.isHidden,
				'list-item': true,
				'exists': this.informExists
			}
		}
	},
	watch: {
		existsID: function( newbie, oldie )
		{
			//If user tries to add a new item that already exists
			//this signals the user that HEY I'M HERE ALREADY
			this.informExists = this.data._id == newbie;
			if( this.informExists )
			{
				var __ = this;
	            setTimeout(function(){
	                __.informExists = false;
					__.$emit('reset-existingID' );
	            }, 3000);
			}
		}
	},
	methods: {
		removeItem (event) {
			//Sends a signal up the component tree to remove this item from the list
			this.$emit('remove-list-item', this.data)
		},
		toggleDone (event) {
			//Sets current item as done and sends a signal up the ladder to update item status
			this.data.done = !this.data.done;

			this.$emit('item-done' );
			this.$emit('update-list' );
		}
	},
  	template: `<li :class="insertClasses">{{data.title}}
  					<span class="tools">
  						<button v-if="!this.data.done" v-on:click="toggleDone" class="list-item-done-toggle" title="Merkitse valmiiksi"><i class="fas fa-check"></i></button>
  						<button v-else v-on:click="toggleDone" class="list-item-done-toggle" title="Merkitse puuttuvaksi"><i class="fas fa-undo"></i></button>
  						<button v-on:click="removeItem" class="text-warning" title="Poista"><i class="far fa-trash-alt"></i></button>
  					</span>
				</li>`
});