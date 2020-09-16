<template>
	<div>
		<!-- 大标题 -->
		<div class="headline">任务管理</div>
		
		<!-- 功能区域 -->
		<div class="d-flex justify-content-end mt-4 mb-4">
			<el-input placeholder="请输入搜索内容" size="medium" class="mr-4 w-25"><el-button slot="append" icon="el-icon-search"></el-button></el-input>
			<el-button type="primary" size="medium" icon="el-icon-s-promotion" @click="publicMissionDV = true">发布任务</el-button>
		</div>
		
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
export default {
	name: 'MissionManage',
	data(){
		return{
			/* ======================== 任务 ======================== */
			// 列表
			missionList:[
				{
					commodityClassify:'分类一',
					commodityName:'宝贝一',
					promoteType:'普通推广',
					promoteNum:50,
					missionDemand:'要求要求要求要求',
					missionProcess:0,
					missionStatus:0
				},
				{
					commodityClassify:'分类一',
					commodityName:'宝贝二',
					promoteType:'普通推广',
					promoteNum:50,
					missionDemand:'要求要求要求要求',
					missionProcess:1,
					missionStatus:1
				},
				{
					commodityClassify:'分类一',
					commodityName:'宝贝三',
					promoteType:'普通推广',
					promoteNum:50,
					missionDemand:'要求要求要求要求',
					missionProcess:1,
					missionStatus:2
				}
			],
			// 分页
			missionListPage: {
				total: 15,
				pageSize: 10,
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
				commodityClassify:null,
				commodityName:null,
				promoteType:null,
				promoteNum:1,
				missionDemand:null
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
	methods:{
		/* ======================== 任务 ======================== */
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
	}
};
</script>