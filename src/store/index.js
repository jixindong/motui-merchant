import Vue from 'vue';
import Vuex from 'vuex';
import persistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		// 商家基本信息
		baseMsg:null,
		// 商品分类
		commodityClassify:null
	},
	getters: {},
	mutations: {
		handleBaseMsg(state,e){
			state.baseMsg = e;
		},
		handleCommodityClassify(state,e){
			state.commodityClassify = e;
		}
	},
	actions: {},
	plugins: [persistedState({
		storage: window.sessionStorage
	})]
});

export default store;
