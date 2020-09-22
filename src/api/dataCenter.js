import request from '@/utils/request';

// 订单列表
export function fetchOrderList(data) {
	return request({
		url: 'ordersync/list',
		method: 'POST',
		data
	});
}
