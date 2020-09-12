import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	routes: [{
			path: '/',
			name:'index',
			component: () => import('@/views/index')
		},
		// 用户登录
		{
			path:'/login',
			name:'login',
			component:() => import('@/views/Login'),
			meta:{
				title:'用户登录'
			}
		},
		// 404
		{
			path: '*',
			name:'404',
			component: () => import('@/views/Error'),
			meta: {
				title: '404',
				favicon: require('@/assets/images/404.png')
			}
		}
	]
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
	let token = localStorage.getItem('token');
	
	if(to.name !== 'login' && !token){
		next({name:'login'});
	}else{
		// 设置 title
		if (to.meta.title) {
			document.title = to.meta.title;
		} else {
			document.title = '魔推商家后台';
		}
		// 设置 favicon
		let favicon = document.querySelector('link[rel="icon"]');
		if (to.meta.favicon) {
			favicon.href = to.meta.favicon;
		} else {
			favicon.href = './favicon.ico';
		}
		next();
	}
});

// 全局后置钩子
router.afterEach(() => {
	window.scrollTo(0, 0);
});

// 抛出 router 实例
export default router;
