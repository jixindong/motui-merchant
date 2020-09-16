<template>
	<div>
		<!-- 大标题 -->
		<div class="headline">推广列表</div>

		<!-- 功能区域 -->
		<div class="d-flex justify-content-end mt-4 mb-4">
			<el-input placeholder="请输入搜索内容" size="medium" class="mr-4 w-25"><el-button slot="append" icon="el-icon-search"></el-button></el-input>
		</div>

		<!-- 推广列表 -->
		<div>
			<el-table :data="promoteList" stripe border>
				<el-table-column prop="starID" label="达人ID" show-overflow-tooltip></el-table-column>
				<el-table-column prop="promoteDate" label="推广时间" show-overflow-tooltip></el-table-column>
				<el-table-column label="视频地址">
					<template slot-scope="scope">
						<el-link type="primary" :href="scope.row.videoLink" target="blank">视频链接</el-link>
					</template>
				</el-table-column>
				<el-table-column prop="viewCounts" label="播放量" align="center" show-overflow-tooltip></el-table-column>
				<el-table-column label="是否审核">
					<template slot-scope="scope">
						<span class="text-warning" v-if="!scope.row.isCheck">未审核</span>
						<span class="text-success" v-else>已审核</span>
					</template>
				</el-table-column>
				<el-table-column label="是否发货">
					<template slot-scope="scope">
						<span class="text-warning" v-if="!scope.row.isShipment">未发货</span>
						<span class="text-success" v-else>已发货</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="260" align="center">
					<template slot-scope="scope">
						<el-button type="success" size="mini" icon="el-icon-view" @click="videoCheck(scope.row)" v-if="!scope.row.isCheck">审核</el-button>
						<el-button type="success" size="mini" plain disabled v-if="scope.row.isCheck">已审核</el-button>
						<el-button type="primary" size="mini" icon="el-icon-truck" @click="shipment(scope.row)" v-if="!scope.row.isShipment">发货</el-button>
						<el-button type="primary" size="mini" plain disabled v-if="scope.row.isShipment">已发货</el-button>
						<el-button type="danger" size="mini" icon="el-icon-chat-round" @click="complain(scope.row)" v-if="!scope.row.isComplain">投诉</el-button>
						<el-button type="danger" size="mini" plain disabled v-if="scope.row.isComplain">已投诉</el-button>
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
							<el-select v-model="shipmentForm.company" clearable>
								<el-option label="请选择" value=""></el-option>
								<el-option v-for="(v, i) in logisticsCompany" :key="i" :label="v" :value="v"></el-option>
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

		<!-- 投诉对话框 -->
		<el-dialog title="投诉" :visible.sync="complainDV" :before-close="cDClose">
			<el-form :model="complainForm" :rules="complainRules" ref="complainFormRef" size="medium" label-width="100px" status-icon>
				<el-form-item label="投诉内容" prop="content" required>
					<el-input type="textarea" placeholder="请输入投诉内容" v-model="complainForm.content" clearable></el-input>
				</el-form-item>
				<div class="d-flex justify-content-center">
					<el-button type="primary" size="medium" @click="complainCDF">提交投诉</el-button>
					<el-button type="primary" size="medium" plain @click="resetCDF">重置</el-button>
				</div>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: 'PromoteList',
	data() {
		return {
			/* ======================== 推广列表 ======================== */
			// 列表
			promoteList: [
				{
					pid: 23333,
					starID: 123456,
					promoteDate: '2020年9月16日',
					videoLink: 'http://www.baidu.com',
					viewCounts: 50,
					isCheck: false,
					isShipment: false,
					isComplain: false
				},
				{
					pid: 2333,
					starID: 123456,
					promoteDate: '2020年9月16日',
					videoLink: 'http://www.baidu.com',
					viewCounts: 50,
					isCheck: false,
					isShipment: false,
					isComplain: false
				},
				{
					pid: 233,
					starID: 123456,
					promoteDate: '2020年9月16日',
					videoLink: 'http://www.baidu.com',
					viewCounts: 50,
					isCheck: true,
					isShipment: true,
					isComplain: true
				}
			],
			// 分页
			promoteListPage: {
				total: 15,
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
				person: '达人',
				tel: '12345678910',
				addr: '山东省青岛市市北区敦化路诺德广场'
			},
			// 物流公司
			logisticsCompany: ['顺丰', '韵达'],
			/* ======================== 投诉对话框 ======================== */
			// 显示隐藏
			complainDV: false,
			// 表单
			complainForm: {
				content: ''
			},
			// 表单校验规则
			complainRules: {
				content: [{ required: true, message: '请输入投诉内容', trigger: ['blur', 'change'] }]
			}
		};
	},
	methods: {
		/* ======================== 推广列表 ======================== */
		// 审核
		videoCheck(e) {
			this.$confirm('确认审核通过？', '提示', {
				confirmButtonText: '通过',
				cancelButtonText: '取消',
				type: 'info'
			})
				.then(() => {
					// 调接口

					this.promoteList.map(v => {
						if (v.pid === e.pid) {
							v.isCheck = true;
						}
					});
					this.$message.success('审核通过');
				})
				.catch(() => {});
		},
		// 发货
		shipment(e) {
			this.shipmentDV = true;
			this.currentPid = e.pid;
		},
		// 投诉
		complain(e) {
			this.complainDV = true;
			this.currentPid = e.pid;
		},
		// 推广列表当前页切换
		promoteListCurrentChange(currentPage) {
			this.promoteListPage.currentPage = currentPage;
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
					done();
				})
				.catch(() => {});
		},
		// 确认发货
		shipmentSDF() {
			this.$refs['shipmentFormRef'].validate(valid => {
				if (valid) {
					console.log(1);
					// 请求接口

					this.promoteList.map(v => {
						if (v.pid === this.currentPid) {
							v.isShipment = true;
						}
					});
					this.$message.success('确认发货成功');
					this.shipmentDV = false;
				}
			});
		},
		// 重置
		resetSDF() {
			this.$refs['shipmentFormRef'].resetFields();
			this.$message.success('输入信息已重置');
		},
		/* ======================== 投诉对话框 ======================== */
		// 关闭
		cDClose(done) {
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
		// 提交投诉
		complainCDF() {
			this.$refs['complainFormRef'].validate(valid => {
				if (valid) {
					console.log(1);
					// 请求接口

					this.promoteList.map(v => {
						if (v.pid === this.currentPid) {
							v.isComplain = true;
						}
					});
					this.$message.success('提交投诉成功');
					this.complainDV = false;
				}
			});
		},
		// 重置
		resetCDF() {
			this.$refs['complainFormRef'].resetFields();
			this.$message.success('输入信息已重置');
		}
	}
};
</script>
