<template>
	<div>
		<!-- 大标题 -->
		<div class="headline">基础信息</div>
		
		<!-- 基础信息 -->
		<div>
			<el-table :data="basicMsg" stripe border>
				<el-table-column prop="account" label="账号" show-overflow-tooltip></el-table-column>
				<el-table-column prop="enterDate" label="入驻时间" show-overflow-tooltip></el-table-column>
				<el-table-column prop="setmeal" label="套餐名称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="agencyAccount" label="代理账号" show-overflow-tooltip></el-table-column>
			</el-table>
		</div>
		
		<!-- 大标题 -->
		<div class="headline mt-4">推广统计</div>
		
		<div>
			<el-table :data="promoteStatistics" stripe border>
				<el-table-column prop="waitDistribute" label="等待分发" align="center" show-overflow-tooltip></el-table-column>
				<el-table-column prop="waitCheck" label="等待审核" align="center" show-overflow-tooltip></el-table-column>
				<el-table-column prop="completeDistribute" label="分发完成" align="center" show-overflow-tooltip></el-table-column>
			</el-table>
		</div>
		
		<!-- 大标题 -->
		<div class="headline">商品统计</div>
		<!-- 大标题 -->
		<div class="headline">视频制作统计</div>
		<!-- 大标题 -->
		<div class="headline">订单统计</div>
		<!-- 大标题 -->
		<div class="headline">订单列表</div>
	</div>
</template>

<script>
export default {
	name: 'Console',
	data() {
		return {
			// 基础信息
			basicMsg: [{ account: '账号1',enterDate:'2020年9月16日',setmeal:'入门包',agencyAccount:'123456'}],
			// 推广统计
			promoteStatistics:[{waitDistribute:10,waitCheck:5,completeDistribute:66}],
			// 商品统计
			commodityStatistics:[{all:100,waitCheck:20,checked:60,reject:20}],
			// 视频制作统计
			videoStatistics:[{allMission:100,shipmented:50,waitMake:20,complete:30}],
			// 订单统计
			orderStatistics:[{todayProfit:666,todayOrders:50,allProfit:6666,allOrders:500}],
			// 订单列表
			orderList:[]
		};
	},
	methods: {}
};
</script>
