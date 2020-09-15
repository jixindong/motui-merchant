import request from '@/utils/request';

// 任务列表
export function fetchMissionList(data){
	return request({
		url:'businessvideo/list',
		method:'POST',
		data
	});
}

// 任务发布
export function handleMissionAdd(data){
	return request({
		url:'businessvideo/add',
		method:'POST',
		data
	});
}

// 根据任务查看所有视频
export function fetchVideoByMission(data){
	return request({
		url:'businessvideo/listByVideo',
		method:'POST',
		data
	});
}

// 视频下载
export function fetchVideo(data){
	return request({
		url:'businessvideoadmin/detail',
		method:'POST',
		data
	});
}