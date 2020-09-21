<template>
	<div class="card p-4 min-h-800">
		<!-- 大标题 -->
		<div class="headline">任务管理</div>

		<!-- 功能区域 -->
		<div class="d-flex justify-content-between my-4">
			<el-select size="medium" class="w-20" v-model="search.commodityClassify" placeholder="请选择宝贝分类" clearable>
				<el-option label="请选择" value=""></el-option>
				<el-option v-for="(item, index) in commodityClassify" :key="index" :label="item" :value="item"></el-option>
			</el-select>
			<el-input type="text" size="medium" class="w-20" v-model="search.commodityName" placeholder="请输入宝贝名称"></el-input>
			<el-select size="medium" class="w-20" v-model="search.promoteType" placeholder="请选择推广类型" clearable>
				<el-option label="请选择" value=""></el-option>
				<el-option v-for="(item, index) in promoteTypeList" :key="index" :label="item" :value="item"></el-option>
			</el-select>
			<el-select size="medium" class="w-20" v-model="search.status" placeholder="请选择任务状态" clearable>
				<el-option label="请选择" value=""></el-option>
				<el-option label="未开始" value="未开始"></el-option>
				<el-option label="进行中" value="进行中"></el-option>
				<el-option label="已完成" value="已完成"></el-option>
			</el-select>
			<el-button type="primary" size="medium" icon="el-icon-search" plain @click="searchMission">搜索</el-button>
		</div>
		<div class="d-flex justify-content-end mb-4"><el-button type="primary" size="medium" icon="el-icon-s-promotion" @click="publicMissionDV = true">发布任务</el-button></div>

		<!-- 任务列表 -->
		<div>
			<el-table :data="missionList" stripe border>
				<el-table-column prop="commodityClassify" label="宝贝分类" show-overflow-tooltip></el-table-column>
				<el-table-column prop="commodityName" label="宝贝名称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="promoteType" label="推广类型" show-overflow-tooltip></el-table-column>
				<el-table-column prop="promoteNum" label="推广数量" show-overflow-tooltip></el-table-column>
				<el-table-column prop="missionDemand" label="任务要求" show-overflow-tooltip></el-table-column>
				<el-table-column prop="missionProcess" label="进度" show-overflow-tooltip></el-table-column>
				<el-table-column label="状态" align="center">
					<template slot-scope="scope">
						<span class="text-warning" v-if="scope.row.missionStatus === 0">未开始</span>
						<span class="text-primary" v-else-if="scope.row.missionStatus === 1">进行中</span>
						<span class="text-success" v-else>已完成</span>
					</template>
				</el-table-column>
			</el-table>
			<div class="d-flex justify-content-center mt-4">
				<el-pagination
					layout="prev, pager, next"
					hide-on-single-page
					:total="missionListPage.total"
					:page-size="missionListPage.pageSize"
					:current-page="missionListPage.currentPage"
					@current-change="missionListCurrentChange"
				></el-pagination>
			</div>
		</div>

		<!-- 发布任务对话框 -->
		<el-dialog title="发布任务" :visible.sync="publicMissionDV" :before-close="pMDClose">
			<el-form :model="publicMissionForm" :rules="publicMissionRules" ref="publicMissionFormRef" size="medium" label-width="100px" status-icon>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="宝贝分类" prop="commodityClassify" required>
							<el-select v-model="publicMissionForm.commodityClassify" clearable>
								<el-option label="请选择" value=""></el-option>
								<el-option v-for="(v, i) in commodityClassify" :key="i" :label="v" :value="v"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="选择宝贝" prop="commodityName" required>
							<el-select v-model="publicMissionForm.commodityName" clearable>
								<el-option label="请选择" value=""></el-option>
								<el-option v-for="(v, i) in commodityList" :key="i" :label="v" :value="v"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="推广类型" prop="promoteType" required>
							<el-input type="text" placeholder="请输入推广类型" v-model="publicMissionForm.promoteType" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="推广数量" prop="promoteNum" required><el-input-number v-model="publicMissionForm.promoteNum" :min="1"></el-input-number></el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="任务要求" prop="missionDemand" required>
							<el-input type="textarea" placeholder="请输入任务要求" v-model="publicMissionForm.missionDemand" clearable></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<div class="d-flex justify-content-center">
					<el-button type="primary" size="medium" @click="publicPMF">确认发布</el-button>
					<el-button type="primary" size="medium" plain @click="resetPMF">重置</el-button>
				</div>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import * as missionManage from '@/api/videoPromote';

export default {
	name: 'MissionManage',
	data() {
		return {
			/* ======================== 任务 ======================== */
			// 搜索
			search: {
				commodityClassify: null,
				commodityName: null,
				promoteType: null,
				status: null
			},
			// 推广类型
			promoteTypeList: ['直播', '短视频'],
			// 列表
			missionList: [],
			// 分页
			missionListPage: {
				total: 1,
				pageSize: 1,
				totalPage: 1,
				currentPage: 1
			},
			/* ======================== 发布任务对话框 ======================== */
			// 显示隐藏
			publicMissionDV: false,
			// 商品分类
			commodityClassify: [],
			// 商品列表
			commodityList: ['宝贝一', '宝贝二'],
			// 表单
			publicMissionForm: {
				commodityClassify: null,
				commodityName: null,
				promoteType: null,
				promoteNum: 1,
				missionDemand: null
			},
			// 表单校验规则
			publicMissionRules: {
				commodityClassify: [{ required: true, message: '请选择宝贝分类', trigger: ['blur', 'change'] }],
				commodityName: [{ required: true, message: '请选择宝贝', trigger: ['blur', 'change'] }],
				promoteType: [{ required: true, message: '请输入推广类型', trigger: ['blur', 'change'] }],
				promoteNum: [{ required: true, message: '请输入推广数量', trigger: ['blur', 'change'] }],
				missionDemand: [{ required: true, message: '请输入任务要求', trigger: ['blur', 'change'] }]
			}
		};
	},
	methods: {
		/* ======================== 任务 ======================== */
		// 获取任务列表
		getMIssionList() {
			// let data = { name: this.search.missionName, productName: this.search.commodityName, status: this.search.status, page: this.missionListPage.currentPage };
			missionManage
				.fetchMissionList()
				.then(res => {
					if (res.code === 200) {
						this.missionList = res.list.list;
						let { totalCount: total, pageSize, totalPage, currPage: currentPage } = res.list;
						this.missionListPage = { total, pageSize, totalPage, currentPage }; // 任务列表分页
					} else {
						this.$message.warning(res.msg);
					}
				})
				.catch(() => {});
		},
		// 搜索
		searchMission() {
			if (!this.search.commodityClassify && !this.search.commodityName && !this.search.promoteType && !this.search.status) {
				this.$message.warning('搜索条件不能为空');
			} else {
				// 调接口
				console.log('搜索');
			}
		},
		// 任务列表当前页切换
		missionListCurrentChange(currentPage) {
			this.missionListPage.currentPage = currentPage;
		},
		/* ======================== 发布任务对话框 ======================== */
		// 关闭
		pMDClose(done) {
			this.$confirm('确认关闭？', '提示', {
				confirmButtonText: '关闭',
				cancelButtonText: '取消',
				type: 'info'
			})
				.then(() => {
					done();
				})
				.catch(() => {});
		},
		// 确认发布
		publicPMF() {
			this.$refs['publicMissionFormRef'].validate(valid => {
				if (valid) {
					console.log(1);
					// 请求接口
				}
			});
		},
		// 重置
		resetPMF() {
			this.$refs['publicMissionFormRef'].resetFields();
			this.$message.success('输入信息已重置');
		}
	},
	created() {
		this.getMIssionList();// 获取任务列表
	}
};
</script>
