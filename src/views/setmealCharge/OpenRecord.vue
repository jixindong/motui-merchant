<template>
	<div>
		<!-- 大标题 -->
		<div class="headline">开通记录</div>

		<!-- 功能区域 -->
		<div class="d-flex justify-content-end mt-4 mb-4">
			<el-date-picker v-model="search.date" type="daterange" size="medium" start-placeholder="开通日期" end-placeholder="到期日期" clearable></el-date-picker>
			<el-input placeholder="请输入搜索内容" size="medium" class="mr-4 ml-4 w-25"></el-input>
			<el-button type="primary" icon="el-icon-search" size="medium">搜索</el-button>
		</div>

		<!-- 开通记录列表 -->
		<div>
			<el-table :data="recordList" stripe border>
				<el-table-column prop="name" label="套餐" show-overflow-tooltip></el-table-column>
				<el-table-column prop="content" label="说明" show-overflow-tooltip></el-table-column>
				<el-table-column prop="dateStart" label="开通时间" show-overflow-tooltip></el-table-column>
				<el-table-column prop="dateEnd" label="到期时间" show-overflow-tooltip></el-table-column>
			</el-table>
			<div class="d-flex justify-content-center mt-4">
				<el-pagination
					layout="prev, pager, next"
					hide-on-single-page
					:total="recordListPage.total"
					:page-size="recordListPage.pageSize"
					:current-page="recordListPage.currentPage"
					@current-change="recordListCurrentChange"
				></el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'OpenRecord',
	data() {
		return {
			/* ======================== 开通记录 ======================== */
			// 列表
			recordList: [
				{
					id: 1,
					name: '套餐一',
					content: '内容内容内容内容内容内容内容内容内容内容',
					dateStart: '2020年9月16日',
					dateEnd: '2020年9月16日'
				},
				{
					id: 2,
					name: '套餐二',
					content: '内容内容内容内容内容内容内容内容内容内容',
					dateStart: '2020年9月16日',
					dateEnd: '2020年9月16日'
				},
				{
					id: 3,
					name: '套餐三',
					content: '内容内容内容内容内容内容内容内容内容内容',
					dateStart: '2020年9月16日',
					dateEnd: '2020年9月16日'
				}
			],
			// 分页
			recordListPage: {
				total: 15,
				pageSize: 10,
				totalPage: 1,
				currentPage: 1
			},
			// 搜索
			search: {
				date: null
			}
		};
	},
	methods: {
		/* ======================== 开通记录 ======================== */
		// 开通记录列表当前页切换
		recordListCurrentChange(currentPage) {
			this.recordListPage.currentPage = currentPage;
		}
	}
};
</script>
