import request from '@/utils/request';

// 任务列表
export function fetchMissionList(data) {
	return request({
		url: 'businessvideo/list',
		method: 'POST',
		data
	});
}

// 任务发布
export function handleMissionAdd(data) {
	return request({
		url: 'businessvideo/add',
		method: 'POST',
		data
	});
}

// 根据任务查看所有视频
export function fetchVideoByMission(data) {
	return request({
		url: 'businessvideo/listByVideo',
		method: 'POST',
		params:data
	});
}

// 视频下载
export function fetchVideo(data) {
	return request({
		url: 'businessvideoadmin/detail',
		method: 'POST',
		data
	});
}

// 快递公司
export function fetchExpressCompany(data) {
	return request({
		url: 'logisticscompany/list',
		method: 'POST',
		data
	});
}

// 收货信息
export function fetchReceivingMsg(data) {
	return request({
		url: 'setting/listBySort',
		method: 'POST',
		params:data
	});
}

// 确认收货
export function confirmReceipt(data) {
	return request({
		url: 'logisticscompany/add',
		method: 'POST',
		data
	});
}

// 发货
export function shipments(data) {
	return request({
		url: 'talentapply/send',
		method: 'POST',
		params:data
	});
}