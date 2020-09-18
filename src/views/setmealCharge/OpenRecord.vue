<template>
	<div class="card p-4 min-h-800">
		<!-- 大标题 -->
		<div class="headline">开通记录</div>

		<!-- 功能区域 -->
		<div class="d-flex justify-content-between my-4">
			<el-input type="text" size="medium" class="w-40" v-model="search.name" placeholder="请输入套餐名称"></el-input>
			<el-date-picker type="date" size="medium" class="w-40" v-model="search.dateStart" placeholder="请选择开通时间" clearable></el-date-picker>
			<el-button type="primary" size="medium" icon="el-icon-search" plain @click="searchRecord">搜索</el-button>
		</div>

		<!-- 开通记录列表 -->
		<div>
			<el-table :data="recordList" stripe border>
				<el-table-column prop="name" label="套餐" show-overflow-tooltip></el-table-column>
				<el-table-column prop="content" label="说明" show-overflow-tooltip></el-table-column>
				<el-table-column prop="dateStart" label="开通时间" show-overflow-tooltip></el-table-column>
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
			// 搜索
			search:{
				name:null,
				dateStart:null
			},
			// 列表
			recordList: [
				{
					id: 1,
					name: '初级包',
					content: '内容内容内容内容内容内容内容内容内容内容',
					dateStart: '2020年9月16日'
				},
				{
					id: 2,
					name: '体验包',
					content: '内容内容内容内容内容内容内容内容内容内容',
					dateStart: '2020年9月16日'
				},
				{
					id: 3,
					name: '高级包',
					content: '内容内容内容内容内容内容内容内容内容内容',
					dateStart: '2020年9月16日'
				}
			],
			// 分页
			recordListPage: {
				total: 15,
				pageSize: 10,
				totalPage: 1,
				currentPage: 1
			}
		};
	},
	methods: {
		/* ======================== 开通记录 ======================== */
		// 搜索
		searchRecord() {
			if (!this.search.name && !this.search.dateStart) {
				this.$message.warning('搜索条件不能为空');
			} else {
				// 调接口
				console.log('搜索');
			}
		},
		// 开通记录列表当前页切换
		recordListCurrentChange(currentPage) {
			this.recordListPage.currentPage = currentPage;
		}
	}
};
</script>
