<template>
	<div class="card p-4 min-h-800">
		<!-- 大标题 -->
		<div class="headline">推广列表</div>

		<!-- 功能区域 -->
		<div class="d-flex my-4">
			<el-select size="medium" class="mr-4 w-25" v-model="search.status" placeholder="请选择推广状态" clearable>
				<el-option label="请选择" value=""></el-option>
				<el-option label="待审核" :value="0"></el-option>
				<el-option label="申请通过" :value="1"></el-option>
				<el-option label="申请拒绝" :value="2"></el-option>
				<el-option label="已上传链接" :value="3"></el-option>
				<el-option label="分发完成" :value="4"></el-option>
				<el-option label="已寄样" :value="5"></el-option>
				<el-option label="投诉" :value="6"></el-option>
				<el-option label="已下载链接" :value="7"></el-option>
				<el-option label="有效投诉" :value="8"></el-option>
			</el-select>
			<el-button type="primary" size="medium" icon="el-icon-search" plain @click="searchPromote">搜索</el-button>
		</div>

		<!-- 推广列表 -->
		<div>
			<el-table :data="promoteList" stripe border>
				<el-table-column prop="productName" label="宝贝名称" show-overflow-tooltip></el-table-column>
				<el-table-column label="宝贝视频" show-overflow-tooltip>
					<template slot-scope="scope">
						<el-link type="primary" :href="scope.row.video | videoUrl" target="_blank">{{ scope.row.video | videoTitle }}</el-link>
					</template>
				</el-table-column>
				<el-table-column prop="dName" label="达人名称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="did" label="达人id" show-overflow-tooltip></el-table-column>
				<el-table-column label="状态" width="120" align="center">
					<template slot-scope="scope">
						<span class="text-info" v-if="scope.row.status === 0">待审核</span>
						<span class="text-primary" v-else-if="scope.row.status === 1">申请通过</span>
						<span class="text-danger" v-else-if="scope.row.status === 2">申请拒绝</span>
						<span class="text-primary" v-else-if="scope.row.status === 3">已上传链接</span>
						<span class="text-success" v-else-if="scope.row.status === 4">分发完成</span>
						<span class="text-primary" v-else-if="scope.row.status === 5">已寄样</span>
						<span class="text-warning" v-else-if="scope.row.status === 6">投诉</span>
						<span class="text-success" v-else-if="scope.row.status === 7">已下载链接</span>
						<span class="text-danger" v-else-if="scope.row.status === 8">有效投诉</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="200" align="center">
					<template slot-scope="scope">
						<el-button type="success" size="mini" icon="el-icon-view" @click="videoCheck(scope.row)" v-if="scope.row.status === 0">审核</el-button>
						<el-button type="primary" size="mini" icon="el-icon-truck" @click="shipment(scope.row)" v-else-if="scope.row.status === 1 && scope.row.type === 'live'">
							发货
						</el-button>
						<el-button type="danger" size="mini" icon="el-icon-chat-round" @click="complain(scope.row)" v-else-if="scope.row.status === 3">申诉</el-button>
						<el-button type="warning" size="mini" icon="el-icon-warning-outline" plain @click="detail(scope.row)">详情</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="d-flex justify-content-center mt-4">
				<el-pagination
					layout="prev, pager, next"
					hide-on-single-page
					:total="promoteListPage.total"
					:page-size="promoteListPage.pageSize"
					:current-page="promoteListPage.currentPage"
					@current-change="promoteListCurrentChange"
				></el-pagination>
			</div>
		</div>

		<!-- 推广详情对话框 -->
		<el-dialog title="详情" :visible.sync="promoteDtlDV">
			<el-row>
				<el-col :span="12">推广名称：{{ this.promoteDtl.tName }}</el-col>
				<el-col :span="12">宝贝名称：{{ this.promoteDtl.productName }}</el-col>
				<el-col :span="12" class="mt-2">达人名称：{{ this.promoteDtl.dName }}</el-col>
				<el-col :span="12" class="mt-2">达人id：{{ this.promoteDtl.did }}</el-col>
				<el-col :span="12" class="mt-2">
					<span>任务状态：</span>
					<span class="text-info" v-if="this.promoteDtl.status === 0">待审核</span>
					<span class="text-primary" v-else-if="this.promoteDtl.status === 1">申请通过</span>
					<span class="text-danger" v-else-if="this.promoteDtl.status === 2">申请拒绝</span>
					<span class="text-primary" v-else-if="this.promoteDtl.status === 3">已上传链接</span>
					<span class="text-success" v-else-if="this.promoteDtl.status === 4">分发完成</span>
					<span class="text-primary" v-else-if="this.promoteDtl.status === 5">已寄样</span>
					<span class="text-warning" v-else-if="this.promoteDtl.status === 6">投诉</span>
					<span class="text-success" v-else-if="this.promoteDtl.status === 7">已下载链接</span>
				</el-col>
				<el-col :span="12" class="mt-2">抖音昵称：{{ this.promoteDtl.dyName }}</el-col>
				<el-col :span="12" class="mt-2">抖音账号：{{ this.promoteDtl.dyCount }}</el-col>
				<el-col :span="12" class="mt-2">粉丝数：{{ this.promoteDtl.fans }}</el-col>
			</el-row>
		</el-dialog>

		<!-- 审核对话框 -->
		<el-dialog title="审核" width="360px" :visible.sync="checkDV">
			<div>确认审核通过？</div>
			<div class="d-flex justify-content-end mt-4">
				<el-button size="small" @click="checkReject">拒绝</el-button>
				<el-button type="primary" size="small" @click="checkPass">通过</el-button>
			</div>
		</el-dialog>

		<!-- 发货对话框 -->
		<el-dialog title="发货" :visible.sync="shipmentDV" :before-close="sDClose" :close-on-click-modal="false">
			<el-form :model="shipmentForm" :rules="shipmentRules" ref="shipmentFormRef" size="medium" label-width="100px" status-icon>
				<el-row :gutter="20">
					<el-col :span="12">达人姓名：{{ starMsg.name }}</el-col>
					<el-col :span="12">达人电话：{{ starMsg.phone }}</el-col>
					<el-col :span="24" class="mt-4 mb-4">达人地址：{{ starMsg.address }}</el-col>
					<el-col :span="12">
						<el-form-item label="物流公司" prop="company" required>
							<el-select v-model="shipmentForm.company" class="w-100" filterable clearable>
								<el-option label="请选择" value=""></el-option>
								<el-option v-for="(v, i) in expressCompany" :key="i" :label="v.name" :value="v.type"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="物流单号" prop="shipmentID" required>
							<el-input type="text" placeholder="请输入物流单号" v-model="shipmentForm.shipmentID" clearable></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<div class="d-flex justify-content-center">
					<el-button type="primary" size="medium" @click="shipmentSDF">确认发货</el-button>
					<el-button type="primary" size="medium" plain @click="resetSDF">重置</el-button>
					<el-button type="info" size="medium" plain @click="sDClose">取消</el-button>
				</div>
			</el-form>
		</el-dialog>

		<!-- 申诉对话框 -->
		<el-dialog title="申诉" :visible.sync="complainDV" :before-close="cDClose" :close-on-click-modal="false">
			<el-form :model="complainForm" :rules="complainRules" ref="complainFormRef" size="medium" label-width="100px" status-icon>
				<el-form-item label="申诉内容" prop="content" required>
					<el-input type="textarea" placeholder="请输入申诉内容" v-model="complainForm.content" clearable></el-input>
				</el-form-item>
				<div class="d-flex justify-content-center">
					<el-button type="primary" size="medium" @click="complainCDF">提交申诉</el-button>
					<el-button type="primary" size="medium" plain @click="resetCDF">重置</el-button>
					<el-button type="info" size="medium" plain @click="cDClose">取消</el-button>
				</div>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import * as videoPromote from '@/api/videoPromote';

export default {
	name: 'PromoteList',
	data() {
		return {
			/* ======================== 公共 ======================== */
			// 当前推广id
			currentPid: null,
			/* ======================== 推广列表 ======================== */
			// 搜索
			search: {
				status: null
			},
			// 列表
			promoteList: [],
			// 分页
			promoteListPage: {
				total: 1,
				pageSize: 10,
				totalPage: 1,
				currentPage: 1
			},
			/* ======================== 推广详情对话框 ======================== */
			// 显示隐藏
			promoteDtlDV: false,
			// 推广详情
			promoteDtl: {},
			/* ======================== 审核对话框 ======================== */
			// 显示隐藏
			checkDV: false,
			/* ======================== 发货对话框 ======================== */
			// 显示隐藏
			shipmentDV: false,
			// 表单
			shipmentForm: {
				company: '',
				shipmentID: ''
			},
			// 表单校验规则
			shipmentRules: {
				company: [{ required: true, message: '请选择物流公司', trigger: ['blur', 'change'] }],
				shipmentID: [{ required: true, message: '请输入物流单号', trigger: ['blur', 'change'] }]
			},
			// 达人信息
			starMsg: {
				name: null,
				tel: null,
				addr: null
			},
			/* ======================== 申诉对话框 ======================== */
			// 显示隐藏
			complainDV: false,
			// 表单
			complainForm: {
				content: ''
			},
			// 表单校验规则
			complainRules: {
				content: [{ required: true, message: '请输入申诉内容', trigger: ['blur', 'change'] }]
			}
		};
	},
	computed: {
		// 快递公司列表
		expressCompany() {
			return this.$store.state.expressCompany || [];
		},
		// 推广列表搜索条件
		searchData() {
			return {
				type: 'sh',
				status: this.search.status,
				page: this.promoteListPage.currentPage,
				limit: this.promoteListPage.pageSize
			};
		}
	},
	filters: {
		videoTitle(value) {
			if (!value) {
				return '';
			}

			return value.slice(0, value.indexOf('http'));
		},
		videoUrl(value) {
			if (!value) {
				return '';
			}

			return value.slice(value.indexOf('http'), value.lastIndexOf('/') + 1);
		}
	},
	methods: {
		/* ======================== 推广列表 ======================== */
		// 获取推广列表
		getPromoteList() {
			videoPromote
				.fetchPromoteList(this.searchData)
				.then(res => {
					if (res.code === 200) {
						this.promoteList = res.list.list;
						let { totalCount: total, pageSize, totalPage, currPage: currentPage } = res.list;
						this.promoteListPage = { total, pageSize, totalPage, currentPage }; // 推广列表分页
					} else {
						this.$message.warning(res.msg);
					}
				})
				.catch(() => {});
		},
		// 搜索
		searchPromote() {
			this.getPromoteList(); // 获取推广列表
		},
		// 根据状态搜索
		searchPromoteByStatus() {
			if (this.$route.params.promoteStatus !== '') {
				this.search.status = this.$route.params.promoteStatus;
			}
			this.getPromoteList(); // 获取推广列表
		},
		// 推广列表当前页切换
		promoteListCurrentChange(currentPage) {
			this.promoteListPage.currentPage = currentPage;
			this.getPromoteList(); // 获取推广列表
		},
		// 审核
		videoCheck(e) {
			this.currentPid = e.id;
			this.checkDV = true;
		},
		// 发货
		shipment(e) {
			this.currentPid = e.id;
			this.shipmentDV = true;
			videoPromote
				.fetchStarAddress({ id: e.did })
				.then(res => {
					if (res.code === 200) {
						this.starMsg = res.detail;
					} else {
						this.$message.warning(res.msg);
					}
				})
				.catch(() => {});
		},
		// 申诉
		complain(e) {
			this.currentPid = e.id;
			this.complainDV = true;
		},
		// 详情
		detail(e) {
			this.promoteDtl = e;
			this.promoteDtlDV = true;
		},
		/* ======================== 审核对话框 ======================== */
		// 审核通过
		checkPass() {
			videoPromote
				.merchCheck({ id: this.currentPid, status: 1 })
				.then(res => {
					if (res.code === 200) {
						this.$message.success('已审核通过');
						this.checkDV = false;
						this.getPromoteList(); // 获取推广列表
					} else {
						this.$message.warning(res.msg);
					}
				})
				.catch(() => {});
		},
		// 审核拒绝
		checkReject() {
			videoPromote
				.merchCheck({ id: this.currentPid, status: 2 })
				.then(res => {
					if (res.code === 200) {
						this.$message.success('已审核拒绝');
						this.checkDV = false;
						this.getPromoteList(); // 获取推广列表
					} else {
						this.$message.warning(res.msg);
					}
				})
				.catch(() => {});
		},
		/* ======================== 发货对话框 ======================== */
		// 关闭
		sDClose() {
			this.$refs['shipmentFormRef'].resetFields();
			this.shipmentDV = false;
		},
		// 确认发货
		shipmentSDF() {
			this.$refs['shipmentFormRef'].validate(valid => {
				if (!valid) {
					return false;
				}

				let data = { id: this.currentPid, logistics_name: this.shipmentForm.company, logistics: this.shipmentForm.shipmentID };
				videoPromote
					.merchSend(data)
					.then(res => {
						if (res.code === 200) {
							this.$message.success('确认发货成功');
							this.$refs['shipmentFormRef'].resetFields();
							this.shipmentDV = false;
							this.getPromoteList(); // 获取推广列表
						} else {
							this.$message.warning(res.msg);
						}
					})
					.catch(() => {});
			});
		},
		// 重置
		resetSDF() {
			this.$refs['shipmentFormRef'].resetFields();
			this.$message.success('输入信息已重置');
		},
		/* ======================== 申诉对话框 ======================== */
		// 关闭
		cDClose() {
			this.$refs['complainFormRef'].resetFields();
			this.complainDV = false;
		},
		// 提交申诉
		complainCDF() {
			this.$refs['complainFormRef'].validate(valid => {
				if (!valid) {
					return false;
				}

				let data = { id: this.currentPid, status: 6, content: this.complainForm.content };
				videoPromote
					.merchComplaint(data)
					.then(res => {
						if (res.code === 200) {
							this.$message.success('提交申诉成功');
							this.$refs['complainFormRef'].resetFields();
							this.complainDV = false;
							this.getPromoteList(); // 获取推广列表
						} else {
							this.$message.warning(res.msg);
						}
					})
					.catch(() => {});
			});
		},
		// 重置
		resetCDF() {
			this.$refs['complainFormRef'].resetFields();
			this.$message.success('输入信息已重置');
		}
	},
	created() {
		this.searchPromoteByStatus(); // 根据状态搜索
	}
};
</script>
