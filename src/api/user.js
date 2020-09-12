import request from '@/utils/request.js';

export function fetchValCodeImg(data){
	return request({
		url:`captcha.jpg?uuid=${data}`,
		method:'GET'
	});
}

// export function test(data) {
// 	return request({
// 		url: 'home/syList',
// 		method: 'POST',
// 		data
// 	});
// }
