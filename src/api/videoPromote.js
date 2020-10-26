import request from '@/utils/request';

// 任务列表
export function fetchMissionList(data) {
	return request({
		url: 'task/listBySh',
		method: 'POST',
		data
	});
}

// 任务暂停
export function handleMissionSuspend(data) {
	return request({
		url: 'task/suspend',
		method: 'POST',
		data
	});
}

// 任务发布
export function handleMissionAdd(data) {
	return request({
		url: 'task/add',
		method: 'POST',
		data
	});
}

// 推广列表
export function fetchPromoteList(data) {
	return request({
		url: 'talentapply/listByType',
		method: 'POST',
		params: data
	});
}

// 商家审核
export function merchCheck(data) {
	return request({
		url: 'talentapply/pass',
		method: 'POST',
		params: data
	});
}

// 商家寄样
export function merchSend(data) {
	return request({
		url: 'talentapply/send',
		method: 'POST',
		params: data
	});
}

// 商家申诉
export function merchComplaint(data) {
	return request({
		url: 'talentapply/examine',
		method: 'POST',
		params: data
	});
}

// 获取达人列表
export function fetchStarList(data) {
	return request({
		url: 'talent/query',
		method: 'POST',
		params: data
	});
}

// 获取达人地址信息
export function fetchStarAddress(data) {
	return request({
		url: 'talent/detailBySh',
		method: 'POST',
		params: data
	});
}
