<template>
	<div class="card p-4 min-h-800">
		<!-- 大标题 -->
		<div class="headline">推广列表</div>

		<!-- 功能区域 -->
		<div class="d-flex my-4">
			<el-select size="medium" class="mr-4 w-25" v-model="search.status" placeholder="请选择推广状态" clearable>
				<el-option label="请选择" value=""></el-option>
				<el-option label="已申请" value="0"></el-option>
				<el-option label="申请通过" value="1"></el-option>
				<el-option label="申请拒绝" value="2"></el-option>
				<el-option label="已上传链接" value="3"></el-option>
				<el-option label="已完成" value="4"></el-option>
				<el-option label="已寄样" value="5"></el-option>
				<el-option label="投诉" value="6"></el-option>
				<el-option label="已下载链接" value="7"></el-option>
			</el-select>
			<el-button type="primary" size="medium" icon="el-icon-search" plain @click="searchPromote">搜索</el-button>
		</div>

		<!-- 推广列表 -->
		<div>
			<el-table :data="promoteList" stripe border>
				<el-table-column prop="productName" label="宝贝名称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="pName" label="达人名称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="did" label="达人ID" show-overflow-tooltip></el-table-column>
				<el-table-column label="状态" align="center">
					<template slot-scope="scope">
						<span class="text-info" v-if="scope.row.status === '0'">已申请</span>
						<span class="text-primary" v-else-if="scope.row.status === '1'">申请通过</span>
						<span class="text-danger" v-else-if="scope.row.status === '2'">申请拒绝</span>
						<span class="text-primary" v-else-if="scope.row.status === '3'">已上传</span>
						<span class="text-primary" v-else-if="scope.row.status === '4'">已完成</span>
						<span class="text-primary" v-else-if="scope.row.status === '5'">已寄样</span>
						<span class="text-warning" v-else-if="scope.row.status === '6'">投诉</span>
						<span class="text-success" v-else>已下载</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="260" align="center">
					<template slot-scope="scope">
						<el-button type="success" size="mini" icon="el-icon-view" @click="videoCheck(scope.row)" v-if="scope.row.status === '0'">审核</el-button>
						<el-button type="primary" size="mini" icon="el-icon-truck" @click="shipment(scope.row)" v-else-if="scope.row.status === '4'">发货</el-button>
						<el-button type="danger" size="mini" icon="el-icon-chat-round" @click="complain(scope.row)" v-else-if="scope.row.status === '6'">申诉</el-button>
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

		<!-- 发货对话框 -->
		<el-dialog title="发货" :visible.sync="shipmentDV" :before-close="sDClose">
			<el-form :model="shipmentForm" :rules="shipmentRules" ref="shipmentFormRef" size="medium" label-width="100px" status-icon>
				<el-row :gutter="20">
					<el-col :span="12">达人姓名：{{ starMsg.name }}</el-col>
					<el-col :span="12">达人电话：{{ starMsg.tel }}</el-col>
					<el-col :span="24" class="mt-4 mb-4">达人地址：{{ starMsg.addr }}</el-col>
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
				</div>
			</el-form>
		</el-dialog>

		<!-- 申诉对话框 -->
		<el-dialog title="申诉" :visible.sync="complainDV" :before-close="cDClose">
			<el-form :model="complainForm" :rules="complainRules" ref="complainFormRef" size="medium" label-width="100px" status-icon>
				<el-form-item label="申诉内容" prop="content" required>
					<el-input type="textarea" placeholder="请输入申诉内容" v-model="complainForm.content" clearable></el-input>
				</el-form-item>
				<div class="d-flex justify-content-center">
					<el-button type="primary" size="medium" @click="complainCDF">提交申诉</el-button>
					<el-button type="primary" size="medium" plain @click="resetCDF">重置</el-button>
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
			// 当前推广id
			currentPid: null,
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
			if (!this.search.status) {
				this.$message.warning('搜索条件不能为空');
				return false;
			}

			this.getPromoteList(); // 获取推广列表
		},
		// 根据状态搜索
		searchPromoteByStatus() {
			if (this.$route.params.promoteStatus) {
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
			this.$confirm('确认审核通过？', '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'info'
			})
				.then(() => {
					videoPromote
						.merchCheck({ id: e.id, status: 1 })
						.then(res => {
							if (res.code === 200) {
								this.$message.success('审核通过');
								this.getPromoteList(); // 获取推广列表
							} else {
								this.$message.warning(res.msg);
							}
						})
						.catch(() => {});
				})
				.catch(() => {});
		},
		// 发货
		shipment(e) {
			this.shipmentDV = true;
			this.currentPid = e.id;
			videoPromote
				.fetchStarAddress({ id: e.did })
				.then(res => {
					if (res.code === 200) {
						this.starMsg = res.data;
					} else {
						this.$message.warning(res.msg);
					}
				})
				.catch(() => {});
		},
		// 申诉
		complain(e) {
			this.complainDV = true;
			this.currentPid = e.id;
		},
		/* ======================== 发货对话框 ======================== */
		// 关闭
		sDClose(done) {
			this.$confirm('确认关闭？', '提示', {
				confirmButtonText: '关闭',
				cancelButtonText: '取消',
				type: 'info'
			})
				.then(() => {
					this.$refs['shipmentFormRef'].resetFields();
					done();
				})
				.catch(() => {});
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
		cDClose(done) {
			this.$confirm('确认关闭？', '提示', {
				confirmButtonText: '关闭',
				cancelButtonText: '取消',
				type: 'info'
			})
				.then(() => {
					this.$refs['complainFormRef'].resetFields();
					done();
				})
				.catch(() => {});
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
