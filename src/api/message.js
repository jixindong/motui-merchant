import request from '@/utils/request';

// 消息列表
export function fetchMessageList(data) {
	return request({
		url: 'information/listSj',
		method: 'POST',
		params: data
	});
}

// 阅读消息
export function viewMessage(data) {
	return request({
		url: 'information/infoSj',
		method: 'POST',
		data
	});
}
