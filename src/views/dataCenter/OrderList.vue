<template>
	<div class="card p-4 min-h-800">
		<!-- 大标题 -->
		<div class="headline">订单列表</div>

		<!-- 功能区域 -->
		<div class="d-flex justify-content-between my-4">
			<el-input type="text" size="medium" class="w-25" v-model="search.starID" placeholder="请输入达人ID"></el-input>
			<el-input type="text" size="medium" class="w-25" v-model="search.commodityName" placeholder="请输入宝贝名称"></el-input>
			<el-select size="medium" class="w-25" v-model="search.status" placeholder="请选择订单状态" clearable>
				<el-option label="请选择" value=""></el-option>
				<el-option label="未支付" value="0"></el-option>
				<el-option label="已支付" value="1"></el-option>
			</el-select>
			<el-button type="primary" size="medium" icon="el-icon-search" plain @click="searchOrder">搜索</el-button>
		</div>

		<!-- 订单列表 -->
		<div>
			<el-table :data="orderList" stripe border>
				<el-table-column prop="starID" label="达人ID" show-overflow-tooltip></el-table-column>
				<el-table-column prop="commodityName" label="宝贝名称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="paymentNum" label="付款金额" show-overflow-tooltip></el-table-column>
				<el-table-column prop="paymentDate" label="付款时间" show-overflow-tooltip></el-table-column>
				<el-table-column label="带货视频" show-overflow-tooltip>
					<template slot-scope="scope">
						<el-link type="primary" :href="scope.row.commodityLink">{{ scope.row.commodityLink }}</el-link>
					</template>
				</el-table-column>
				<el-table-column label="订单状态" align="center">
					<template slot-scope="scope">
						<span class="text-danger" v-if="scope.row.orderStatus === 0">未支付</span>
						<span class="text-primary" v-else>已支付</span>
					</template>
				</el-table-column>
			</el-table>
			<div class="d-flex justify-content-center mt-4">
				<el-pagination
					layout="prev, pager, next"
					hide-on-single-page
					:total="orderListPage.total"
					:page-size="orderListPage.pageSize"
					:current-page="orderListPage.currentPage"
					@current-change="orderListCurrentChange"
				></el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
// import {fetchOrderList} from '@/api/dataCenter';

export default {
	name: 'OrderList',
	data() {
		return {
			/* ======================== 订单列表 ======================== */
			// 搜索
			search:{
				starID:null,
				commodityName:null,
				status:null
			},
			// 列表
			orderList: [
				{
					starID: 123456,
					commodityName: '宝贝一',
					paymentNum: 666,
					paymentDate: '2020年9月16日14:56:53',
					commodityLink: 'http://www.baidu.com',
					orderStatus: 0
				},
				{
					starID: 123456,
					commodityName: '宝贝二',
					paymentNum: 666,
					paymentDate: '2020年9月16日14:56:53',
					commodityLink: 'http://www.baidu.com',
					orderStatus: 1
				},
				{
					starID: 123456,
					commodityName: '宝贝三',
					paymentNum: 666,
					paymentDate: '2020年9月16日14:56:53',
					commodityLink: 'http://www.baidu.com',
					orderStatus: 1
				}
			],
			// 分页
			orderListPage: {
				total: 15,
				pageSize: 10,
				totalPage: 1,
				currentPage: 1
			}
		};
	},
	methods: {
		/* ======================== 订单列表 ======================== */
		// 获取订单列表
		getOrderList(){
			// fetchOrderList().then(res => {
			// 	if(res.code === 200){
			// 		this.orderList = res.list.list;// 订单列表
			// 		let { totalCount: total, pageSize, totalPage, currPage: currentPage } = res.list;
			// 		this.orderListPage = { total, pageSize, totalPage, currentPage }; // 订单列表分页
			// 	}else{
			// 		this.$message.warning(res.msg);
			// 	}
			// }).catch(() => {});
		},
		// 搜索
		searchOrder(){
			if (!this.search.starID && !this.search.commodityName && !this.search.status) {
				this.$message.warning('搜索条件不能为空');
			} else {
				// 调接口
				console.log('搜索');
			}
		},
		// 订单列表当前页切换
		orderListCurrentChange(currentPage) {
			this.orderListPage.currentPage = currentPage;
		}
	},
	created() {
		this.getOrderList();// 获取订单列表
	}
};
</script>
