<template>
	<div>
		<!-- 大标题 -->
		<div class="headline">任务管理</div>

		<!-- 功能区域 -->
		<div class="d-flex justify-content-end mt-4 mb-4">
			<el-input placeholder="请输入搜索内容" size="medium" class="mr-4 w-25"><el-button slot="append" icon="el-icon-search"></el-button></el-input>
			<el-button type="primary" size="medium" icon="el-icon-s-promotion" @click="publicMissionDV = true">发布任务</el-button>
		</div>

		<!-- 任务管理 -->
		<div>
			<el-table :data="missionList" stripe border>
				<el-table-column label="任务名称">
					<template slot-scope="scope">
						<el-button type="text" @click="viewMissionDetail(scope.row)">{{ scope.row.name }}</el-button>
					</template>
				</el-table-column>
				<el-table-column label="状态" show-overflow-tooltip>
					<template slot-scope="scope">
						<span class="text-warning" v-if="scope.row.status === '0'">未发货</span>
						<span class="text-primary" v-else-if="scope.row.status === '1'">配送中</span>
						<span class="text-success" v-else>已送达</span>
					</template>
				</el-table-column>
				<el-table-column prop="productName" label="商品名称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="content" label="备注" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button type="primary" size="mini" icon="el-icon-truck" plain @click="shipment(scope.row)">发货</el-button>
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

		<!-- 任务详情对话框 -->
		<el-dialog title="任务详情" :visible.sync="missionDetailDV" :before-close="mDDClose">
			<div class="text-1">发货信息</div>
			<div class="mt-4 mb-4 text-1">视频列表</div>
			<div>
				<el-table :data="missionDetail.videoList" stripe border>
					<el-table-column prop="video" label="名称" show-overflow-tooltip></el-table-column>
					<el-table-column prop="contet" label="备注" show-overflow-tooltip></el-table-column>
				</el-table>
			</div>
		</el-dialog>

		<!-- 发布任务对话框 -->
		<el-dialog title="发布任务" :visible.sync="publicMissionDV" :before-close="pMDClose">
			<el-form :model="publicMissionForm" :rules="publicMissionRules" ref="publicMissionFormRef" size="medium" label-width="100px" status-icon>
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="宝贝分类" prop="commodityClassify" required>
							<el-select v-model="publicMissionForm.commodityClassify" clearable>
								<el-option label="请选择" value=""></el-option>
								<el-option v-for="(v, i) in commodityClassify" :key="i" :label="v" :value="v"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="选择宝贝" prop="commodityName" required>
							<el-select v-model="publicMissionForm.commodityName" clearable>
								<el-option label="请选择" value=""></el-option>
								<el-option v-for="(v, i) in commodityList" :key="i" :label="v" :value="v"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="视频数量" prop="videoNum" required><el-input-number v-model="publicMissionForm.videoNum" :min="1"></el-input-number></el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="宝贝亮点" prop="commodityMerit" required>
							<el-input type="text" placeholder="请输入宝贝亮点" v-model="publicMissionForm.commodityMerit" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="拍摄要求" prop="videoDemand" required>
							<el-input type="text" placeholder="请输入拍摄要求" v-model="publicMissionForm.videoDemand" clearable></el-input>
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
import { fetchCommodityClassify } from '@/api/commodity';

export default {
	name: 'MissionManage',
	data() {
		return {
			/* ======================== 任务 ======================== */
			// 列表
			missionList: [
				{
					id: 1,
					name: '任务一',
					content: '1',
					productName: '商品名称2',
					status: '0'
				},
				{
					id: 2,
					name: '任务二',
					content: '1',
					productName: '商品名称2',
					status: '1'
				},
				{
					id: 3,
					name: '任务三',
					content: '1',
					productName: '商品名称2',
					status: '2'
				}
			],
			// 分页
			missionListPage: {
				total: 15,
				pageSize: 10,
				totalPage: 1,
				currentPage: 1
			},
			/* ======================== 任务详情对话框 ======================== */
			// 显示隐藏
			missionDetailDV: false,
			// 详情
			missionDetail: {
				msg: {},
				videoList: [
					{
						id: 1,
						video: '视频一',
						contet: '这是一条视频',
						rid: 1,
						createTime: null
					},
					{
						id: 2,
						video: '视频二',
						contet: '这是一条视频',
						rid: 2,
						createTime: null
					}
				]
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
				videoNum: 1,
				commodityMerit: null,
				videoDemand: null
			},
			// 表单校验规则
			publicMissionRules: {
				commodityClassify: [{ required: true, message: '请选择宝贝分类', trigger: ['blur', 'change'] }],
				commodityName: [{ required: true, message: '请选择宝贝', trigger: ['blur', 'change'] }],
				videoNum: [{ required: true, message: '请输入视频数量', trigger: ['blur', 'change'] }],
				commodityMerit: [{ required: true, message: '请输入宝贝亮点', trigger: ['blur', 'change'] }],
				videoDemand: [{ required: true, message: '请输入拍摄要求', trigger: ['blur', 'change'] }]
			}
		};
	},
	methods: {
		/* ======================== 任务 ======================== */
		// 查看任务详情
		viewMissionDetail(e) {
			this.missionDetailDV = true;

			console.log(e);
			// 请求接口获取任务详情
		},
		// 任务列表当前页切换
		missionListCurrentChange(currentPage) {
			this.missionListPage.currentPage = currentPage;
		},
		// 发货
		shipment(e) {
			this.$confirm('确认发货？', '提示', {
				confirmButtonText: '发货',
				cancelButtonText: '取消',
				type: 'info'
			})
				.then(() => {
					// 调接口
					this.$message.success('发货成功');
					console.log(e);
				})
				.catch(() => {});
		},
		/* ======================== 任务详情对话框 ======================== */
		// 关闭
		mDDClose(done) {
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
		// 获取商品分类
		getCommodityClassify() {
			fetchCommodityClassify()
				.then(res => {
					res.list.forEach(e => {
						this.commodityClassify.push(e.name);
					});
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
	mounted() {
		this.getCommodityClassify(); // 获取商品分类
	}
};
</script>
