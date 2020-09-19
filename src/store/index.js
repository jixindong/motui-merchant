import Vue from 'vue';
import Vuex from 'vuex';
import persistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		baseMsg:null
	},
	getters: {},
	mutations: {
		handleBaseMsg(state,e){
			state.baseMsg = e;
		}
	},
	actions: {},
	plugins: [persistedState({
		storage: window.sessionStorage
	})]
});

export default store;
