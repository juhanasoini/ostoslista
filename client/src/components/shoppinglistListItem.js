import Vue from 'vue'

export default  Vue.component('shoppinglistListItem', {
	props: ['data'],
	data: function () {
		return {
	  		count: 0,
	  		isDone: false,
	  		isHidden: false
		}
	},
	created: function() {
		this.$emit('created');
	},
	computed: {
		insertClasses: function() {
			return {
				'done': this.isDone,
				'hidden': this.isHidden,
				'list-item': true
			}
		}
	},
	methods: {
		onRemoveButton (event) {
			this.$emit('remove-list-item', this.data.id)
		},
		onDoneButton (event) {
			this.isDone = !this.isDone;
		}
	},
  	template: `<li :class="insertClasses">{{data.title}}
  					<span class="tools">
  						<button v-if="!isDone" v-on:click="onDoneButton" class="list-item-done-toggle"><i class="fas fa-check"></i></button>
  						<button v-else v-on:click="onDoneButton" class="list-item-done-toggle"><i class="fas fa-undo"></i></button>
  						<button v-on:click="onRemoveButton" class="text-warning"><i class="far fa-trash-alt"></i></button>
  					</span>
				</li>`
});