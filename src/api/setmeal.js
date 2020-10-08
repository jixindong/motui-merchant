import request from '@/utils/request';

// 套餐列表
export function fetchSetmealList(data) {
	return request({
		url: 'setmeallinformation/listTwo',
		method: 'POST',
		data
	});
}

// 当前套餐余量
export function fetchSetmealResidue(data) {
	return request({
		url: 'businessserve/list',
		method: 'POST',
		params: data
	});
}

// 套餐开通记录
export function fetchSetmealRecord(data) {
	return request({
		url: 'businessrecord/listBySh',
		method: 'POST',
		params: data
	});
}

// 开通套餐
export function openSeatmeal(data) {
	return request({
		url: 'setmeallinformation/pay',
		method: 'POST',
		params: data
	});
}

// 是否支付成功
export function fetchPaymentSuccess(data) {
	return request({
		url: 'setmeallinformation/payStatus',
		method: 'POST',
		params: data
	});
}
