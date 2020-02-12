import Vue from 'vue'

export const loading = Vue.component('loading', {
	props: ['text', 'wrapper'],
	template: `<div class="loader-container" v-bind:class="{ curtain: wrapper }"><div class="loader-content"><i class="fas fa-fan fa-spin fa-3x fa-fw"></i> <span>{{text}}</span></div></div>`
});

export const errors = Vue.component('errors', {
	props: ['error'],
	template: `<div v-if="error.length" class="error-list alert alert-warning" role="alert"><ul><li v-for="item in error">{{item.message}}</li></ul></div>`
});

export const success = Vue.component('success', {
	template: `<div class="alert alert-success" role="success"><slot name="heading"></slot><slot name="message"></slot><slot name="link"></slot></div>`
});

export const sleep = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default loading;