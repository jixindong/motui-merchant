import request from '@/utils/request';

// 商家登录
export function requestLogin(data) {
	return request({
		url: 'sys/login',
		method: 'POST',
		data
	});
}
