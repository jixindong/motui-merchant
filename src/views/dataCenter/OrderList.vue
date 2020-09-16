<template>
	<div>
		<!-- 大标题 -->
		<div class="headline">订单列表</div>

		<!-- 功能区域 -->
		<div class="d-flex justify-content-end mt-4 mb-4">
			<el-input placeholder="请输入搜索内容" size="medium" class="mr-4 w-25"><el-button slot="append" icon="el-icon-search"></el-button></el-input>
		</div>

		<!-- 订单列表 -->
		<div>
			<el-table :data="orderList" stripe border>
				<el-table-column prop="starID" label="达人ID" show-overflow-tooltip></el-table-column>
				<el-table-column prop="commodityName" label="宝贝标题" show-overflow-tooltip></el-table-column>
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
export default {
	name: 'OrderList',
	data() {
		return {
			/* ======================== 订单列表 ======================== */
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
		// 订单列表当前页切换
		orderListCurrentChange(currentPage) {
			this.orderListPage.currentPage = currentPage;
		}
	}
};
</script>
