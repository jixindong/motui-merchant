import request from '@/utils/request';

// 消息列表
export function fetchMessageList(data) {
	return request({
		url: 'information/list',
		method: 'POST',
		data
	});
}
