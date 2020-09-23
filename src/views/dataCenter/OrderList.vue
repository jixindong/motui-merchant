<template>
	<div class="card p-4 min-h-800">
		<!-- 大标题 -->
		<div class="headline mb-4">订单列表</div>

		<!-- 功能区域 -->
		<!-- <div class="d-flex justify-content-between my-4">
			<el-input type="text" size="medium" class="w-25" v-model="search.starID" placeholder="请输入达人ID"></el-input>
			<el-input type="text" size="medium" class="w-25" v-model="search.commodityName" placeholder="请输入宝贝名称"></el-input>
			<el-select size="medium" class="w-25" v-model="search.status" placeholder="请选择订单状态" clearable>
				<el-option label="请选择" value=""></el-option>
				<el-option label="未支付" value="0"></el-option>
				<el-option label="已支付" value="1"></el-option>
			</el-select>
			<el-button type="primary" size="medium" icon="el-icon-search" plain @click="searchOrder">搜索</el-button>
		</div> -->

		<!-- 订单列表 -->
		<div>
			<el-table :data="orderList" stripe border>
				<el-table-column prop="did" label="达人ID" show-overflow-tooltip></el-table-column>
				<el-table-column prop="item_title" label="宝贝标题" show-overflow-tooltip></el-table-column>
				<el-table-column prop="pay_price" label="付款金额" show-overflow-tooltip></el-table-column>
				<el-table-column prop="tb_paid_time" label="付款时间" show-overflow-tooltip></el-table-column>
				<el-table-column label="订单状态" align="center">
					<template slot-scope="scope">
						<span class="text-warning" v-if="scope.row.tk_status === 3">订单结算</span>
						<span class="text-primary" v-else-if="scope.row.tk_status === 12">订单付款</span>
						<span class="text-info" v-else-if="scope.row.tk_status === 13">订单失效</span>
						<span class="text-success" v-else-if="scope.row.tk_status === 14">订单成功</span>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				class="mt-4 text-center"
				layout="prev, pager, next"
				hide-on-single-page
				:total="orderListPage.total"
				:page-size="orderListPage.pageSize"
				:current-page="orderListPage.currentPage"
				@current-change="orderListCurrentChange"
			></el-pagination>
		</div>
	</div>
</template>

<script>
import { fetchOrderList } from '@/api/dataCenter';

export default {
	name: 'OrderList',
	data() {
		return {
			/* ======================== 订单列表 ======================== */
			// 搜素
			search: {},
			// 列表
			orderList: [],
			// 分页
			orderListPage: {
				total: 1,
				pageSize: 1,
				totalPage: 1,
				currentPage: 1
			}
		};
	},
	methods: {
		/* ======================== 订单列表 ======================== */
		// 获取订单列表
		getOrderList() {
			fetchOrderList({ type: 'sh' })
				.then(res => {
					if (res.code === 200) {
						this.orderList = res.page.list; // 订单列表
						let { totalCount: total, pageSize, totalPage, currPage: currentPage } = res.page;
						this.orderListPage = { total, pageSize, totalPage, currentPage }; // 订单列表分页
					} else {
						this.$message.warning(res.msg);
					}
				})
				.catch(() => {});
		},
		// 订单列表当前页切换
		orderListCurrentChange(currentPage) {
			this.orderListPage.currentPage = currentPage;
			this.getOrderList(); // 获取订单列表
		}
	},
	created() {
		this.getOrderList(); // 获取订单列表
	}
};
</script>
