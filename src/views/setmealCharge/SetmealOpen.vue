<template>
	<div class="card p-4 min-h-800">
		<!-- 大标题 -->
		<div class="headline mb-4">当前套餐</div>

		<!-- 当前套餐 -->
		<div>
			<el-table :data="nowSetmealList" stripe border>
				<el-table-column prop="name" label="套餐名称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="date" label="开通时间" show-overflow-tooltip></el-table-column>
				<el-table-column label="视频推广数">
					<template slot-scope="scope">
						<span :class="{ 'text-primary': scope.row.videoPromoteNum > 0, 'text-danger': scope.row.videoPromoteNum === 0 }">{{ scope.row.videoPromoteNum }}</span>
					</template>
				</el-table-column>
				<el-table-column label="视频制作数">
					<template slot-scope="scope">
						<span :class="{ 'text-primary': scope.row.videoMakeNum > 0, 'text-danger': scope.row.videoMakeNum === 0 }">{{ scope.row.videoMakeNum }}</span>
					</template>
				</el-table-column>
				<el-table-column label="直播场次">
					<template slot-scope="scope">
						<span :class="{ 'text-primary': scope.row.videoLiveNum > 0, 'text-danger': scope.row.videoLiveNum === 0 }">{{ scope.row.videoLiveNum }}</span>
					</template>
				</el-table-column>
			</el-table>
			<div class="d-flex justify-content-center mt-4">
				<el-pagination
					layout="prev, pager, next"
					hide-on-single-page
					:total="nowSetmealListPage.total"
					:page-size="nowSetmealListPage.pageSize"
					:current-page="nowSetmealListPage.currentPage"
					@current-change="nowSetmealListCurrentChange"
				></el-pagination>
			</div>
		</div>

		<!-- 大标题 -->
		<div class="headline my-4">套餐开通</div>

		<!-- 套餐开通 -->
		<div>
			<el-table :data="setmealList" stripe border>
				<el-table-column prop="name" label="套餐名称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="price" label="价格" show-overflow-tooltip></el-table-column>
				<el-table-column prop="videoPromoteNum" label="视频推广数" show-overflow-tooltip></el-table-column>
				<el-table-column prop="videoMakeNum" label="视频制作数" show-overflow-tooltip></el-table-column>
				<el-table-column prop="videoLiveNum" label="直播场次" show-overflow-tooltip></el-table-column>
				<el-table-column label="购买" align="center">
					<template slot-scope="scope">
						<el-button type="warning" size="small" icon="el-icon-coin" plain @click="purchaseSetmeal(scope.row)">购买</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SetmealOpen',
	data() {
		return {
			/* ======================== 当前套餐 ======================== */
			// 列表
			nowSetmealList: [
				{
					name: '体验包',
					date: '2020-9-16 14:09:11',
					videoPromoteNum: 10,
					videoMakeNum: 5,
					videoLiveNum: 0
				},
				{
					name: '入门包',
					date: '2020-9-16 14:09:11',
					videoPromoteNum: 20,
					videoMakeNum: 50,
					videoLiveNum: 20
				}
			],
			// 分页
			nowSetmealListPage: {
				total: 15,
				pageSize: 10,
				totalPage: 1,
				currentPage: 1
			},
			/* ======================== 套餐开通 ======================== */
			// 列表
			setmealList: [
				{
					name: '体验包',
					price: '￥3980',
					videoPromoteNum: 100,
					videoMakeNum: 100,
					videoLiveNum: 6
				},
				{
					name: '入门包',
					price: '￥6980',
					videoPromoteNum: 200,
					videoMakeNum: 200,
					videoLiveNum: 15
				},
				{
					name: '体验包',
					price: '￥9980',
					videoPromoteNum: 300,
					videoMakeNum: 300,
					videoLiveNum: 26
				}
			]
		};
	},
	methods: {
		/* ======================== 当前套餐 ======================== */
		// 当前套餐列表当前页切换
		nowSetmealListCurrentChange(currentPage) {
			this.nowSetmealListPage.currentPage = currentPage;
		},
		/* ======================== 套餐开通 ======================== */
		// 开通
		purchaseSetmeal(e) {
			console.log(e);
		}
	}
};
</script>
