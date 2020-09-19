import request from '@/utils/request';

// 登录
export function requestLogin(data) {
	return request({
		url: 'sys/login',
		method: 'POST',
		data
	});
}

// 基本信息
export function fetchMerchBaseMsg(data) {
	return request({
		url: 'sh/business/detail',
		method: 'POST',
		data
	});
}

// 修改密码
export function handlePassword(data) {
	return request({
		url: 'sys/user/password',
		method: 'POST',
		data
	});
}
