import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js'; // 路由配置
import store from './store/index.js'; // Vuex
import ElementUI from 'element-ui'; // ElementUI
import 'element-ui/lib/theme-chalk/index.css';
import './style/common.scss'; // 公共样式

Vue.config.productionTip = false; // 关闭生产提示
Vue.use(ElementUI);

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
