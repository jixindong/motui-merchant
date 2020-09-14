import axios from 'axios';
import {
	Message
} from 'element-ui';

const request = axios.create({
	baseURL: 'http://mtht.waszn.com:8001/',
	headers: {
		'Content-Type': 'application/json; charset=utf-8'
	},
	timeout: 5000
});

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

request.interceptors.response.use(
	response => {
		return response.data;
	},
	error => {
		return Promise.reject(error);
	}
);

export default request;
