<template>
	<div>
		<!-- 大标题 -->
		<div class="headline">消息中心</div>

		<!-- 功能区域 -->
		<div class="d-flex justify-content-end mt-4 mb-4">
			<el-input placeholder="请输入搜索内容" size="medium" class="mr-4 w-25"><el-button slot="append" icon="el-icon-search"></el-button></el-input>
		</div>

		<!-- 消息列表 -->
		<div>
			<el-table :data="messageList" stripe border>
				<el-table-column prop="title" label="标题" show-overflow-tooltip></el-table-column>
				<el-table-column prop="content" label="内容" show-overflow-tooltip></el-table-column>
				<el-table-column prop="date" label="时间" show-overflow-tooltip></el-table-column>
			</el-table>
			<div class="d-flex justify-content-center mt-4">
				<el-pagination
					layout="prev, pager, next"
					hide-on-single-page
					:total="messageListPage.total"
					:page-size="messageListPage.pageSize"
					:current-page="messageListPage.currentPage"
					@current-change="messageListCurrentChange"
				></el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'MessageCenter',
	data() {
		return {
			/* ======================== 消息 ======================== */
			// 列表
			messageList: [
				{
					id: 1,
					title: '消息一',
					content: '内容内容内容内容内容内容内容内容内容内容',
					date: '2020年9月16日'
				},
				{
					id: 2,
					title: '消息二',
					content: '内容内容内容内容内容内容内容内容内容内容',
					date: '2020年9月16日'
				},
				{
					id: 3,
					title: '消息三',
					content: '内容内容内容内容内容内容内容内容内容内容',
					date: '2020年9月16日'
				}
			],
			// 分页
			messageListPage: {
				total: 15,
				pageSize: 10,
				totalPage: 1,
				currentPage: 1
			}
		};
	},
	methods: {
		/* ======================== 消息 ======================== */
		// 消息列表当前页切换
		messageListCurrentChange(currentPage) {
			this.messageListPage.currentPage = currentPage;
		}
	}
};
</script>
