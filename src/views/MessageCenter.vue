<template>
	<div class="card p-4 min-h-800">
		<!-- 大标题 -->
		<div class="headline">消息中心</div>

		<!-- 功能区域 -->
		<div class="d-flex justify-content-between my-4">
			<el-input type="text" size="medium" class="w-25" v-model="search.title" placeholder="请输入消息标题"></el-input>
			<el-input type="text" size="medium" class="w-25" v-model="search.content" placeholder="请输入消息内容"></el-input>
			<el-date-picker type="date" size="medium" class="w-25" v-model="search.date" placeholder="请选择时间" clearable></el-date-picker>
			<el-button type="primary" size="medium" icon="el-icon-search" plain @click="searchMessage">搜索</el-button>
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
			// 搜索
			search:{
				title:null,
				content:null,
				date:null
			},
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
		// 搜索
		searchMessage(){
			if (!this.search.title && !this.search.content && !this.search.date) {
				this.$message.warning('搜索条件不能为空');
			} else {
				// 调接口
				console.log('搜索');
			}
		},
		// 消息列表当前页切换
		messageListCurrentChange(currentPage) {
			this.messageListPage.currentPage = currentPage;
		}
	}
};
</script>