<template>
	<div class="card p-4 min-h-800">
		<!-- 大标题 -->
		<div class="headline">任务管理</div>

		<!-- 功能区域 -->
		<div class="d-flex justify-content-between my-4">
			<!-- <el-select size="medium" class="w-20" v-model="search.commodityClassify" placeholder="请选择宝贝分类" clearable>
				<el-option label="请选择" value=""></el-option>
				<el-option v-for="(item, index) in commodityClassify" :key="index" :label="item" :value="item"></el-option>
			</el-select> -->
			<el-input type="text" size="medium" class="w-20" v-model="search.name" placeholder="请输入任务名称" clearable></el-input>
			<el-input type="text" size="medium" class="w-20" v-model="search.commodityName" placeholder="请输入宝贝名称" clearable></el-input>
			<el-select size="medium" class="w-20" v-model="search.promoteType" placeholder="请选择推广类型" clearable>
				<el-option label="请选择" value=""></el-option>
				<el-option v-for="(item, index) in promoteTypeList" :key="index" :label="item" :value="item"></el-option>
			</el-select>
			<el-select size="medium" class="w-20" v-model="search.status" placeholder="请选择任务状态" clearable>
				<el-option label="请选择" value=""></el-option>
				<el-option label="未开始" value="0"></el-option>
				<el-option label="进行中" value="1"></el-option>
				<el-option label="已完成" value="2"></el-option>
			</el-select>
			<el-button type="primary" size="medium" icon="el-icon-search" plain @click="searchMission">搜索</el-button>
		</div>
		<div class="d-flex justify-content-end mb-4"><el-button type="primary" size="medium" icon="el-icon-s-promotion" @click="publicMissionDV = true">发布任务</el-button></div>

		<!-- 任务列表 -->
		<div>
			<el-table :data="missionList" stripe border>
				<el-table-column prop="name" label="任务名称" show-overflow-tooltip></el-table-column>
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
						<el-form-item label="任务名称" prop="name" required>
							<el-input type="text" placeholder="请输入任务名称" v-model="publicMissionForm.name" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="推广类型" prop="promoteType" required>
							<el-input type="text" placeholder="请输入推广类型" v-model="publicMissionForm.promoteType" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="宝贝分类" prop="commodityClassify" required>
							<el-select v-model="publicMissionForm.commodityClassify" class="w-100" filterable clearable>
								<el-option label="请选择" value=""></el-option>
								<el-option v-for="(v, i) in commodityClassify" :key="i" :label="v" :value="v"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="选择宝贝" prop="commodityName" required>
							<el-select v-model="publicMissionForm.commodityName" class="w-100" filterable clearable>
								<el-option label="请选择" value=""></el-option>
								<el-option v-for="(v, i) in commodityList" :key="i" :label="v" :value="v"></el-option>
							</el-select>
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
				name: null,
				// commodityClassify: null,
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
			// 商品列表
			commodityList: ['宝贝一', '宝贝二'],
			// 表单
			publicMissionForm: {
				name: null,
				promoteType: null,
				promoteNum: 1,
				commodityClassify: null,
				commodityName: null,
				missionDemand: null
			},
			// 表单校验规则
			publicMissionRules: {
				name: [{ required: true, message: '请选输入任务名称', trigger: ['blur', 'change'] }],
				commodityClassify: [{ required: true, message: '请选择宝贝分类', trigger: ['blur', 'change'] }],
				commodityName: [{ required: true, message: '请选择宝贝', trigger: ['blur', 'change'] }],
				promoteType: [{ required: true, message: '请输入推广类型', trigger: ['blur', 'change'] }],
				promoteNum: [{ required: true, message: '请输入推广数量', trigger: ['blur', 'change'] }],
				missionDemand: [{ required: true, message: '请输入任务要求', trigger: ['blur', 'change'] }]
			}
		};
	},
	computed: {
		// 商品分类
		commodityClassify() {
			return this.$store.state.commodityClassify || [];
		},
		// 任务列表搜索条件
		searchData() {
			return {
				productName: this.search.commodityName,
				promoteType: this.search.promoteType,
				name: this.search.name,
				status: this.search.status,
				page: this.missionListPage.currentPage
			};
		}
	},
	methods: {
		/* ======================== 任务 ======================== */
		// 获取任务列表
		getMIssionList() {
			missionManage
				.fetchMissionList(this.searchData)
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
			if (!this.search.name && !this.search.commodityName && !this.search.promoteType && !this.search.status) {
				this.$message.warning('搜索条件不能为空');
				return false;
			}

			this.getMIssionList(); // 获取任务列表
		},
		// 任务列表当前页切换
		missionListCurrentChange(currentPage) {
			this.missionListPage.currentPage = currentPage;
			this.getMIssionList(); // 获取任务列表
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
					this.$refs['publicMissionFormRef'].resetFields();
					done();
				})
				.catch(() => {});
		},
		// 确认发布
		publicPMF() {
			this.$refs['publicMissionFormRef'].validate(valid => {
				if (!valid) {
					return false;
				}

				let data = {
					name: this.publicMissionForm.name,
					productName: this.commodityName,
					productClassify: this.publicMissionForm.commodityClassify,
					promoteType: this.publicMissionForm.promoteType,
					promoteNum: this.publicMissionForm.promoteNum,
					missionDemand: this.publicMissionForm.missionDemand
				};
				missionManage
					.handleMissionAdd(data)
					.then(res => {
						if (res.code === 200) {
							this.$message.success('发布任务成功');
							this.$refs['publicMissionFormRef'].resetFields();
							this.publicMissionDV = false;// 发布任务对话框 隐藏
						} else {
							this.$message.warning(res.msg);
						}
					})
					.catch(() => {});
			});
		},
		// 重置
		resetPMF() {
			this.$refs['publicMissionFormRef'].resetFields();
			this.$message.success('输入信息已重置');
		}
	},
	created() {
		this.getMIssionList(); // 获取任务列表
	}
};
</script>
