import Vue from 'vue'
export const loading = Vue.component('loading', {
	props: ['text'],
	template: `<div><!--<i class="fas fa-spinner fa-spin fa-3x fa-fw"></i>--><i class="fas fa-fan fa-spin fa-3x fa-fw"></i> {{text}}</div>`
});

export default loading;