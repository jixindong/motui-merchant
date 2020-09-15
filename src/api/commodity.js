import request from '@/utils/request';

// 商品分类
export function fetchCommodityClassify(data){
	return request({
		url:'productclassify/list',
		method:'POST',
		data
	});
}

// 商品列表
export function fetchCommodityList(data){
	return request({
		url:'product/listBySh',
		method:'POST',
		data
	});
}

// 商品添加
export function handleCommodityAdd(data){
	return request({
		url:'product/add',
		method:'POST',
		data
	});
}

// 商品修改
export function handleCommodityEdit(data){
	return request({
		url:'product/edit',
		method:'POST',
		data
	});
}

// 商品删除
export function handleCommodityDelete(data){
	return request({
		url:'product/delete',
		method:'POST',
		data
	});
}

// 商品详情
export function fetchCommodityDetail(data){
	return request({
		url:'product/detail',
		method:'POST',
		data
	});
}

// 根据链接查询商品详情
// export function fetchCommodityDetailByLink(data){
// 	return request({
// 		url:'product/sync',
// 		method:'POST',
// 		data
// 	});
// }