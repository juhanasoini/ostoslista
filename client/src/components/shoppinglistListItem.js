import Vue from 'vue'

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
			this.$emit('remove-list-item', this.data)
		},
		toggleDone (event) {
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