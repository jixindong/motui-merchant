import request from '@/utils/request';

// 套餐开通记录
export function fetchSetmealRecord(data) {
	return request({
		url: 'businessrecord/listBySh',
		method: 'POST',
		data
	});
}