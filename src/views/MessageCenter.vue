<template>
	<div class="card p-4 min-h-800">
		<!-- 大标题 -->
		<div class="headline">消息中心</div>

		<!-- 功能区域 -->
		<div class="d-flex justify-content-between my-4">
			<el-input type="text" size="medium" class="w-25" v-model="search.title" placeholder="请输入消息标题"></el-input>
			<el-input type="text" size="medium" class="w-25" v-model="search.username" placeholder="请输入发件人"></el-input>
			<el-input type="text" size="medium" class="w-25" v-model="search.content" placeholder="请输入消息内容"></el-input>
			<el-button type="primary" size="medium" icon="el-icon-search" plain @click="searchMessage">搜索</el-button>
		</div>

		<!-- 消息列表 -->
		<div>
			<el-table :data="messageList" stripe border>
				<el-table-column label="标题" show-overflow-tooltip>
					<template slot-scope="scope">
						<el-button type="text" @click="viewMessage(scope.row)">{{ scope.row.title }}</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="createName" label="发件人" show-overflow-tooltip></el-table-column>
				<el-table-column prop="createTime" label="发件时间" show-overflow-tooltip></el-table-column>
				<el-table-column label="消息类型" align="center" width="120">
					<template slot-scope="scope">
						<el-tag size="medium" v-if="scope.row.type === 'pt'">平台消息</el-tag>
						<el-tag type="success" size="medium" v-else>个人消息</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="阅读" align="center" width="100">
					<template slot-scope="scope">
						<span class="text-primary" v-if="scope.row.status === 0">未读</span>
						<span class="text-success" v-else>已读</span>
					</template>
				</el-table-column>
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

		<!-- 消息详情对话框 -->
		<el-dialog title="详情" :visible="messageDetailDV" :before-close="mDDClose">
			<el-row>
				<el-col>标题：{{ messageDetail.title }}</el-col>
				<el-col :span="10" class="my-2">发件人：{{ messageDetail.createName }}</el-col>
				<el-col :span="8" class="my-2">发件时间：{{ messageDetail.createTime }}</el-col>
				<el-col :span="6" class="my-2">
					<span>消息类型：</span>
					<span class="text-primary" v-if="messageDetail.type === 'pt'">平台消息</span>
					<span class="text-success" v-else>个人消息</span>
				</el-col>
				<el-col>内容：{{ messageDetail.content }}</el-col>
			</el-row>
		</el-dialog>
	</div>
</template>

<script>
import * as message from '@/api/message';

export default {
	name: 'MessageCenter',
	data() {
		return {
			/* ======================== 消息 ======================== */
			// 搜索
			search: {
				username: '',
				title: '',
				content: ''
			},
			// 列表
			messageList: [],
			// 分页
			messageListPage: {
				total: 1,
				pageSize: 10,
				totalPage: 1,
				currentPage: 1
			},
			/* ======================== 消息详情对话框 ======================== */
			// 显示隐藏
			messageDetailDV: false,
			// 详情
			messageDetail: {}
		};
	},
	computed: {
		// 消息列表搜索条件
		searchData() {
			return {
				createName: this.search.username,
				title: this.search.title,
				content: this.search.content,
				page: this.messageListPage.currentPage,
				limit: this.messageListPage.pageSize
			};
		}
	},
	methods: {
		/* ======================== 消息 ======================== */
		// 获取消息列表
		getMessageList() {
			message
				.fetchMessageList(this.searchData)
				.then(res => {
					if (res.code === 200) {
						this.messageList = res.page.list; // 任务列表
						let { totalCount: total, pageSize, totalPage, currPage: currentPage } = res.page;
						this.messageListPage = { total, pageSize, totalPage, currentPage }; // 任务列表分页
					} else {
						this.$message.warning(res.msg);
					}
				})
				.catch(() => {});
		},
		// 搜索
		searchMessage() {
			this.getMessageList(); // 获取消息列表
		},
		// 消息列表当前页切换
		messageListCurrentChange(currentPage) {
			this.messageListPage.currentPage = currentPage;
			this.getMessageList(); // 获取消息列表
		},
		// 查看消息
		viewMessage(e) {
			this.messageDetailDV = true;
			this.messageDetail = e;
			if (e.status === 1) {
				return false;
			}

			message.viewMessage({ id: e.id });
		},
		/* ======================== 消息详情对话框 ======================== */
		// 关闭
		mDDClose() {
			this.getMessageList(); // 获取消息列表
			this.messageDetailDV = false;
		}
	},
	created() {
		this.getMessageList(); // 获取消息列表
	}
};
</script>
