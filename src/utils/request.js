import axios from 'axios';
import router from '@/router/index';
import ElementUI from 'element-ui';

const request = axios.create({
	// baseURL: 'http://192.168.1.177:8001/',
	baseURL: 'http://api.motui.com.cn:8001/',
	headers: {
		'Content-Type': 'application/json; charset=utf-8'
	},
	timeout: 5000
});

// 请求拦截
request.interceptors.request.use(
	config => {
		let token = localStorage.getItem('token');
		if (token) {
			config.headers['token'] = token;
		}
		return config;
	},
	error => {
		ElementUI.Message({
			message: error.message,
			type: 'error'
		});
		return Promise.reject(error);
	}
);

// 响应拦截
request.interceptors.response.use(
	response => {
		if (response.data.code === 401) {
			ElementUI.Message({
				message: '登录信息已过期，请重新登录',
				type: 'warning'
			});
			localStorage.removeItem('token');
			router.replace({
				path: '/login'
			});
		} else {
			return response.data;
		}
	},
	error => {
		return Promise.reject(error);
	}
);

export default request;
