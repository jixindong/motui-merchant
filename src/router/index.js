import Vue from "vue";
import VueRouter from "vue-router";

const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return routerPush.call(this, location).catch(error => error);
};
Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	routes: [
		// 首页
		{
			path: '/',
			redirect: '/console',
			name: 'index',
			component: () => import('@/views/index'),
			children: [
				// 控制台
				{
					path: 'console',
					name: 'console',
					component: () => import('@/views/Console'),
					meta: {
						title: '控制台'
					}
				},
				// 宝贝管理
				{
					path: 'commodity-manage',
					name: 'commodityManage',
					component: () => import('@/views/CommodityManage'),
					meta: {
						title: '宝贝管理'
					}
				},
				// 拍摄视频/任务管理
				{
					path: 'shootVideo/mission-manage',
					name: 'svMissionManage',
					component: () => import('@/views/shootVideo/MissionManage'),
					meta: {
						title: '拍摄视频 - 任务管理'
					}
				},
				// 视频推广/任务管理
				{
					path: 'videoPromote/mission-manage',
					name: 'vmMissionManage',
					component: () => import('@/views/videoPromote/MissionManage'),
					meta: {
						title: '视频推广 - 任务管理'
					}
				},
				// 视频推广/推广列表
				{
					path: 'videoPromote/promote-list',
					name: 'vpPromoteList',
					component: () => import('@/views/videoPromote/PromoteList'),
					meta: {
						title: '视频推广 - 推广列表'
					}
				},
				// 数据中心/订单列表
				{
					path: 'dataCenter/order-list',
					name: 'dcOrderList',
					component: () => import('@/views/dataCenter/OrderList'),
					meta: {
						title: '数据中心 - 订单列表'
					}
				},
				// 套餐充值/套餐开通
				{
					path: 'setmealCharge/setmeal-open',
					name: 'scSetmealOpen',
					component: () => import('@/views/setmealCharge/SetmealOpen'),
					meta: {
						title: '套餐充值 - 套餐开通'
					}
				},
				// 套餐充值/开通记录
				{
					path: 'setmealCharge/open-record',
					name: 'scOpenRecord',
					component: () => import('@/views/setmealCharge/OpenRecord'),
					meta: {
						title: '套餐充值 - 开通记录'
					}
				},
				// 消息中心
				{
					path: 'message-center',
					name: 'messageCenter',
					component: () => import('@/views/MessageCenter'),
					meta: {
						title: '消息中心'
					}
				},
				// 账户设置
				{
					path: 'account-setting',
					name: 'accountSetting',
					component: () => import('@/views/AccountSetting'),
					meta: {
						title: '账户设置'
					}
				}
			]
		},
		// 用户登录
		{
			path: '/login',
			name: 'login',
			component: () => import('@/views/Login'),
			meta: {
				title: '用户登录'
			}
		},
		// 404
		{
			path: '*',
			name: '404',
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

	if (to.name !== 'login' && !token) {
		next({
			name: 'login'
		});
	} else {
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
