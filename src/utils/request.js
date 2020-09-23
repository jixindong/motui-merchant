import axios from 'axios';
import router from '@/router/index';
import {
	Message
} from 'element-ui';

const request = axios.create({
	baseURL: 'http://mtht.waszn.com:8001/',
	// baseURL: 'http://192.168.1.45:8001/',
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
		Message({
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
			Message({
				message: '登录信息已过期，请重新登录',
				type: 'warning'
			});
			localStorage.removeItem('token');
			router.replace({
				pathname: 'login'
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
