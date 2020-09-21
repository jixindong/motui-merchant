<template>
	<div class="card p-4 min-h-800">
		<!-- 大标题 -->
		<div class="headline">消息中心</div>

		<!-- 功能区域 -->
		<div class="d-flex justify-content-between my-4">
			<el-input type="text" size="medium" class="w-25" v-model="search.username" placeholder="请输入发件人"></el-input>
			<el-input type="text" size="medium" class="w-25" v-model="search.title" placeholder="请输入消息标题"></el-input>
			<el-input type="text" size="medium" class="w-25" v-model="search.content" placeholder="请输入消息内容"></el-input>
			<!-- <el-date-picker type="date" size="medium" class="w-25" v-model="search.date" placeholder="请选择时间" clearable></el-date-picker> -->
			<el-button type="primary" size="medium" icon="el-icon-search" plain @click="searchMessage">搜索</el-button>
		</div>

		<!-- 消息列表 -->
		<div>
			<el-table :data="messageList" stripe border>
				<el-table-column prop="username" label="发件人" show-overflow-tooltip></el-table-column>
				<el-table-column prop="title" label="标题" show-overflow-tooltip></el-table-column>
				<el-table-column prop="content" label="内容" show-overflow-tooltip></el-table-column>
				<!-- <el-table-column prop="date" label="时间" show-overflow-tooltip></el-table-column> -->
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
import { fetchMessageList } from '@/api/message';

export default {
	name: 'MessageCenter',
	data() {
		return {
			/* ======================== 消息 ======================== */
			// 搜索
			search: {
				username: null,
				title: null,
				content: null,
				date: null
			},
			// 列表
			messageList: [],
			// 分页
			messageListPage: {
				total: 1,
				pageSize: 1,
				totalPage: 1,
				currentPage: 1
			}
		};
	},
	methods: {
		/* ======================== 消息 ======================== */
		// 获取消息列表
		getMessageList() {
			let data = { username: this.search.username, title: this.search.title, content: this.search.content, page: this.messageListPage.currentPage };
			fetchMessageList(data)
				.then(res => {
					if (res.code === 200) {
						this.messageList = res.list.list; // 任务列表
						let { totalCount: total, pageSize, totalPage, currPage: currentPage } = res.list;
						this.messageListPage = { total, pageSize, totalPage, currentPage }; // 任务列表分页
					} else {
						this.$message.warning(res.msg);
					}
				})
				.catch(() => {});
		},
		// 搜索
		searchMessage() {
			if (!this.search.username && !this.search.title && !this.search.content) {
				this.$message.warning('搜索条件不能为空');
				return false;
			}

			let data = { username: this.search.username, title: this.search.title, content: this.search.content, page: this.messageListPage.currentPage };
			fetchMessageList(data)
				.then(res => {
					if (res.code === 200) {
						this.messageList = res.list.list; // 任务列表
						let { totalCount: total, pageSize, totalPage, currPage: currentPage } = res.list;
						this.messageListPage = { total, pageSize, totalPage, currentPage }; // 任务列表分页
					} else {
						this.$message.warning(res.msg);
					}
				})
				.catch(() => {});
		},
		// 消息列表当前页切换
		messageListCurrentChange(currentPage) {
			let data = { username: this.search.username, title: this.search.title, content: this.search.content, page: currentPage };
			fetchMessageList(data)
				.then(res => {
					if (res.code === 200) {
						this.messageList = res.list.list; // 任务列表
						let { totalCount: total, pageSize, totalPage, currPage: currentPage } = res.list;
						this.messageListPage = { total, pageSize, totalPage, currentPage }; // 任务列表分页
					} else {
						this.$message.warning(res.msg);
					}
				})
				.catch(() => {});
		}
	},
	created() {
		this.getMessageList(); // 获取消息列表
	}
};
</script>
