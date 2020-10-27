<template>
	<div class="card p-4 min-h-800">
		<!-- 大标题 -->
		<div class="headline">任务管理</div>

		<!-- 功能区域 -->
		<div class="d-flex justify-content-between my-4">
			<el-input type="text" size="medium" class="w-25" v-model="search.name" placeholder="请输入任务名称" clearable></el-input>
			<el-select size="medium" class="w-25" v-model="search.promoteType" placeholder="请选择推广类型" clearable>
				<el-option label="请选择" value=""></el-option>
				<el-option v-for="(item, index) in promoteTypeList" :key="index" :label="item.title" :value="item.value"></el-option>
			</el-select>
			<el-select size="medium" class="w-25" v-model="search.status" placeholder="请选择任务状态" clearable>
				<el-option label="请选择" value=""></el-option>
				<el-option label="进行中" value="0"></el-option>
				<el-option label="已结束" value="1"></el-option>
				<el-option label="任务终止" value="2"></el-option>
			</el-select>
			<el-button type="primary" size="medium" icon="el-icon-search" plain @click="searchMission">搜索</el-button>
		</div>
		<div class="d-flex justify-content-end mb-4"><el-button type="primary" size="medium" icon="el-icon-s-promotion" @click="publicMissionDV = true">发布任务</el-button></div>

		<!-- 任务列表 -->
		<div>
			<el-table :data="missionList" stripe border>
				<el-table-column prop="name" label="任务名称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="productName" label="宝贝名称" show-overflow-tooltip></el-table-column>
				<el-table-column label="推广类型" align="center" show-overflow-tooltip>
					<template slot-scope="scope">
						<span v-if="scope.row.type === 'live'">直播</span>
						<span v-else-if="scope.row.type === 'video'">短视频</span>
					</template>
				</el-table-column>
				<el-table-column prop="number" label="推广数量" show-overflow-tooltip></el-table-column>
				<el-table-column prop="content" label="任务要求" show-overflow-tooltip></el-table-column>
				<el-table-column prop="createTime" label="时间" show-overflow-tooltip></el-table-column>
				<el-table-column label="状态" align="center">
					<template slot-scope="scope">
						<span class="text-primary" v-if="scope.row.status === 0">进行中</span>
						<span class="text-success" v-else-if="scope.row.status === 1">已结束</span>
						<span class="text-warning" v-else-if="scope.row.status === 2">任务终止</span>
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
		<el-dialog title="发布任务" :visible.sync="publicMissionDV" :before-close="pMDClose" :close-on-click-modal="false">
			<el-form :model="publicMissionForm" :rules="publicMissionRules" ref="publicMissionFormRef" size="medium" label-width="100px" status-icon>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="任务名称" prop="name" required>
							<el-input type="text" placeholder="请输入任务名称" v-model="publicMissionForm.name" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="推广类型" prop="promoteType" required>
							<el-select v-model="publicMissionForm.promoteType" class="w-100" clearable>
								<el-option label="请选择" value=""></el-option>
								<el-option v-for="(item, index) in promoteTypeList" :key="index" :label="item.title" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="选择宝贝" prop="commodityName" required>
							<el-select
								v-model="publicMissionForm.commodityName"
								:placeholder="commodityByMerch.length === 0 ? '您当前没有宝贝' : '请选择宝贝'"
								class="w-100"
								filterable
								clearable
							>
								<el-option label="请选择" value=""></el-option>
								<el-option v-for="(v, i) in commodityByMerch" :key="i" :label="v.name" :value="v.id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="开始时间" prop="startTime" required>
							<el-date-picker
								type="date"
								value-format="yyyy-MM-dd HH:mm:ss"
								v-model="publicMissionForm.startTime"
								class="w-100"
								placeholder="请选择开始时间"
								clearable
								required
							></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="推广数量" prop="promoteNum" required><el-input-number v-model="publicMissionForm.promoteNum" :min="1"></el-input-number></el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="粉丝数量" prop="fans" required><el-input-number v-model="publicMissionForm.fans" :min="1"></el-input-number></el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="定向任务" required>
							<el-radio-group v-model="publicMissionForm.isDx">
								<el-radio :label="0">非定向</el-radio>
								<el-radio :label="1">定向</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="达人" prop="star" required v-if="publicMissionForm.isDx === 1">
							<el-select
								v-model="publicMissionForm.star"
								:remote-method="getStarList"
								class="w-100"
								placeholder="请输入达人昵称或完整id"
								multiple
								filterable
								remote
								clearable
							>
								<el-option v-for="(item, index) in starList" :key="index" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="任务要求" prop="missionDemand" required>
							<el-input type="textarea" placeholder="请输入任务要求" v-model="publicMissionForm.missionDemand" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="宝贝要求" prop="productDemand" required>
							<el-input type="textarea" placeholder="请输入宝贝要求" v-model="publicMissionForm.productDemand" clearable></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<div class="d-flex justify-content-center">
					<el-button type="primary" size="medium" @click="publicPMF">确认发布</el-button>
					<el-button type="primary" size="medium" plain @click="resetPMF">重置</el-button>
					<el-button type="info" size="medium" plain @click="pMDClose">取消</el-button>
				</div>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import * as videoPromote from '@/api/videoPromote';
import { fetchCommodityByMerch } from '@/api/commodity';

export default {
	name: 'MissionManage',
	data() {
		return {
			/* ======================== 任务 ======================== */
			// 搜索
			search: {
				name: null,
				promoteType: null,
				status: null
			},
			// 推广类型
			promoteTypeList: [{ title: '直播', value: 'live' }, { title: '短视频', value: 'video' }],
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
			// 获取当前商家审核通过商品
			commodityByMerch: [],
			// 达人列表
			starList: [],
			// 表单
			publicMissionForm: {
				name: null,
				promoteType: null,
				promoteNum: 1,
				commodityName: null,
				fans: 1,
				startTime: null,
				isDx: 0,
				star: [],
				productDemand: null,
				missionDemand: null
			},
			// 表单校验规则
			publicMissionRules: {
				name: [{ required: true, message: '请选输入任务名称', trigger: ['blur', 'change'] }],
				commodityName: [{ required: true, message: '请选择宝贝', trigger: ['blur', 'change'] }],
				fans: [{ required: true, message: '请输入粉丝数量', trigger: ['blur', 'change'] }],
				startTime: [{ required: true, message: '请选择开始时间', trigger: ['blur', 'change'] }],
				promoteType: [{ required: true, message: '请选择推广类型', trigger: ['blur', 'change'] }],
				promoteNum: [{ required: true, message: '请输入推广数量', trigger: ['blur', 'change'] }],
				star: [{ required: true, message: '请输入达人昵称或完整id', trigger: ['blur', 'change'] }],
				productDemand: [{ required: true, message: '请输入宝贝要求', trigger: ['blur', 'change'] }],
				missionDemand: [{ required: true, message: '请输入任务要求', trigger: ['blur', 'change'] }]
			}
		};
	},
	computed: {
		// 任务列表搜索条件
		searchData() {
			return {
				name: this.search.name,
				type: this.search.promoteType,
				status: this.search.status,
				page: this.missionListPage.currentPage
			};
		}
	},
	methods: {
		/* ======================== 任务 ======================== */
		// 获取任务列表
		getMIssionList() {
			videoPromote
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
			this.getMIssionList(); // 获取任务列表
		},
		// 任务列表当前页切换
		missionListCurrentChange(currentPage) {
			this.missionListPage.currentPage = currentPage;
			this.getMIssionList(); // 获取任务列表
		},
		/* ======================== 发布任务对话框 ======================== */
		// 关闭
		pMDClose() {
			this.$refs['publicMissionFormRef'].resetFields();
			this.publicMissionDV = false;
		},
		// 获取当前商家审核通过商品
		getCommodityByMerch() {
			fetchCommodityByMerch()
				.then(res => {
					if (res.code === 200) {
						this.commodityByMerch = res.list;
					} else {
						this.$message.warning(res.msg);
					}
				})
				.catch(() => {});
		},
		// 获取达人列表
		getStarList(query) {
			if (query === '') {
				this.starList = [];
				return false;
			}

			videoPromote
				.fetchStarList({ name: query })
				.then(res => {
					if (res.code !== 200) {
						return false;
					}

					this.starList = res.list;
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
					pid: this.publicMissionForm.commodityName,
					type: this.publicMissionForm.promoteType,
					number: this.publicMissionForm.promoteNum,
					fans: this.publicMissionForm.fans,
					createTime: this.publicMissionForm.startTime,
					isDx: this.publicMissionForm.isDx,
					did: this.publicMissionForm.star.join(','),
					content: this.publicMissionForm.missionDemand,
					requirement: this.publicMissionForm.productDemand
				};
				videoPromote
					.handleMissionAdd(data)
					.then(res => {
						if (res.code !== 200) {
							this.$message.warning(res.msg);
							return false;
						}

						this.$message.success('发布任务成功');
						this.$refs['publicMissionFormRef'].resetFields();
						this.publicMissionDV = false; // 发布任务对话框 隐藏
						this.getMIssionList(); // 获取任务列表
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
		this.getCommodityByMerch(); // 获取当前商家审核通过商品
	}
};
</script>
