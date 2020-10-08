import request from '@/utils/request';

// 统计
export function fetchStatistics(data) {
	return request({
		url: 'home/sjHtList',
		method: 'POST',
		params:data
	});
}

// 订单列表
export function fetchOrderList(data) {
	return request({
		url: 'ordersync/list',
		method: 'POST',
		params:data
	});
}
