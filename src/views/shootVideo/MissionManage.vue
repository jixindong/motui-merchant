<template>
	<div class="card p-4 min-h-800">
		<!-- 大标题 -->
		<div class="headline">任务管理</div>

		<!-- 功能区域 -->
		<div class="d-flex justify-content-between my-4">
			<el-input type="text" size="medium" class="w-20" v-model="search.missionName" placeholder="请输入任务名称" clearable></el-input>
			<el-input type="text" size="medium" class="w-20" v-model="search.commodityName" placeholder="请输入宝贝名称" clearable></el-input>
			<el-select size="medium" class="w-20" v-model="search.status" placeholder="请选择任务状态" clearable>
				<el-option label="请选择" value=""></el-option>
				<el-option label="待发货" value="0"></el-option>
				<el-option label="已完成" value="1"></el-option>
				<el-option label="待制作" value="2"></el-option>
				<el-option label="任务结束" value="3"></el-option>
			</el-select>
			<el-button type="primary" size="medium" icon="el-icon-search" plain @click="searchMission">搜索</el-button>
			<el-button type="primary" size="medium" icon="el-icon-s-promotion" @click="publicMissionDV = true">发布任务</el-button>
		</div>

		<!-- 任务列表 -->
		<div>
			<el-table :data="missionList" stripe border>
				<el-table-column label="任务名称">
					<template slot-scope="scope">
						<el-button type="text" @click="viewMissionDetail(scope.row)">{{ scope.row.name }}</el-button>
					</template>
				</el-table-column>
				<el-table-column label="状态" show-overflow-tooltip>
					<template slot-scope="scope">
						<span class="text-warning" v-if="scope.row.status === '0'">待发货</span>
						<span class="text-primary" v-else-if="scope.row.status === '1'">已发货</span>
						<span class="text-primary" v-else-if="scope.row.status === '2'">已上传</span>
						<span class="text-success" v-else>任务结束</span>
					</template>
				</el-table-column>
				<el-table-column prop="productName" label="宝贝名称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="content" label="拍摄要求" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button type="primary" size="mini" icon="el-icon-truck" plain :disabled="scope.row.status !== '0'" @click="shipment(scope.row)">发货</el-button>
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
			<table class="detailTable">
				<tr>
					<th>任务名称</th>
					<td>{{ missionDetail.name }}</td>
					<th>任务状态</th>
					<td>
						<span class="text-warning" v-if="missionDetail.status === '0'">待发货</span>
						<span class="text-primary" v-else-if="missionDetail.status === '1'">已发货</span>
						<span class="text-primary" v-else-if="missionDetail.status === '2'">已上传</span>
						<span class="text-success" v-else>任务结束</span>
					</td>
				</tr>
				<tr>
					<th>任务发布时间</th>
					<td>{{ missionDetail.createTime }}</td>
					<th>发货时间</th>
					<td>{{ missionDetail.updateTime }}</td>
				</tr>
				<tr>
					<th>宝贝名称</th>
					<td colspan="3">{{ missionDetail.productName }}</td>
				</tr>
				<tr>
					<th>拍摄要求</th>
					<td colspan="3">{{ missionDetail.content }}</td>
				</tr>
				<tr>
					<th>收货人姓名</th>
					<td>
						<span v-if="receivingMsg">{{ receivingMsg.shr_name }}</span>
					</td>
					<th>收货人电话</th>
					<td>
						<span v-if="receivingMsg">{{ receivingMsg.shr_phone }}</span>
					</td>
				</tr>
				<tr>
					<th>收货人地址</th>
					<td colspan="3">
						<span v-if="receivingMsg">{{ receivingMsg.shr_address }}</span>
					</td>
				</tr>
			</table>

			<div class="mt-2">
				<el-table :data="missionVideoList" stripe border>
					<el-table-column label="视频地址" show-overflow-tooltip>
						<template slot-scope="scope">
							<el-link :href="scope.row.video" type="primary" target="_blank">{{ scope.row.video }}</el-link>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</el-dialog>

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
						<el-form-item label="视频数量" prop="videoNum" required><el-input-number v-model="publicMissionForm.videoNum" :min="1"></el-input-number></el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="宝贝亮点" prop="commodityMerit" required>
							<el-input type="textarea" placeholder="请输入宝贝亮点" v-model="publicMissionForm.commodityMerit" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="拍摄要求" prop="videoDemand" required>
							<el-input type="textarea" placeholder="请输入拍摄要求" v-model="publicMissionForm.videoDemand" clearable></el-input>
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

		<!-- 发货对话框 -->
		<el-dialog title="发货" width="660px" :visible.sync="shipmentDV" :before-close="sDClose" :close-on-click-modal="false">
			<el-form :model="shipmentForm" :rules="shipmentRules" ref="shipmentFormRef" size="medium" label-width="120px" status-icon>
				<el-form-item label="选择快递公司" prop="expressCompany" required>
					<el-select v-model="shipmentForm.expressCompany" class="w-100" filterable clearable>
						<el-option label="请选择" value=""></el-option>
						<el-option v-for="(v, i) in expressCompany" :key="i" :label="v.name" :value="v.name"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="快递单号" prop="expressIDNum" required>
					<el-input type="text" placeholder="请输入快递单号" v-model="shipmentForm.expressIDNum" clearable></el-input>
				</el-form-item>
				<div class="d-flex justify-content-center">
					<el-button type="primary" size="medium" @click="publicSF">确认发货</el-button>
					<el-button type="primary" size="medium" plain @click="resetSF">重置</el-button>
					<el-button type="info" size="medium" plain @click="sDClose">取消</el-button>
				</div>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import * as missionManage from '@/api/shootVideo';
import { fetchCommodityByMerch } from '@/api/commodity';

export default {
	name: 'MissionManage',
	data() {
		return {
			/* ======================== 任务 ======================== */
			// 搜索
			search: {
				missionName: null,
				commodityName: null,
				status: null
			},
			// 列表
			missionList: [],
			// 分页
			missionListPage: {
				total: 1,
				pageSize: 1,
				totalPage: 1,
				currentPage: 1
			},
			// 收货信息
			receivingMsg: null,
			/* ======================== 任务详情对话框 ======================== */
			// 显示隐藏
			missionDetailDV: false,
			// 任务详情
			missionDetail: {},
			// 任务视频列表
			missionVideoList: [],
			/* ======================== 发布任务对话框 ======================== */
			// 显示隐藏
			publicMissionDV: false,
			// 当前商家审核通过商品
			commodityByMerch: [],
			// 表单
			publicMissionForm: {
				name: null,
				commodityName: null,
				videoNum: 1,
				commodityMerit: null,
				videoDemand: null
			},
			// 表单校验规则
			publicMissionRules: {
				name: [{ required: true, message: '请输入任务名称', trigger: ['blur', 'change'] }],
				commodityName: [{ required: true, message: '请选择宝贝', trigger: ['blur', 'change'] }],
				videoNum: [{ required: true, message: '请输入视频数量', trigger: ['blur', 'change'] }],
				commodityMerit: [{ required: true, message: '请输入宝贝亮点', trigger: ['blur', 'change'] }],
				videoDemand: [{ required: true, message: '请输入拍摄要求', trigger: ['blur', 'change'] }]
			},
			/* ======================== 发货对话框 ======================== */
			// 显示隐藏
			shipmentDV: false,
			// 表单
			shipmentForm: {
				id: null,
				expressCompany: null,
				expressIDNum: null
			},
			// 表单校验规则
			shipmentRules: {
				expressCompany: [{ required: true, message: '请选择快递公司', trigger: ['blur', 'change'] }],
				expressIDNum: [{ required: true, message: '请输入快递单号', trigger: ['blur', 'change'] }]
			}
		};
	},
	computed: {
		// 快递公司列表
		expressCompany() {
			return this.$store.state.expressCompany || [];
		},
		// 任务列表搜索条件
		searchData() {
			return {
				productName: this.search.commodityName,
				name: this.search.missionName,
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
			this.getMIssionList(); // 获取任务列表
		},
		// 根据状态搜索
		searchMissionByStatus() {
			if (this.$route.params.videoStatus) {
				this.search.status = this.$route.params.videoStatus;
			}
			this.getMIssionList(); // 获取任务列表
		},
		// 查看任务详情
		async viewMissionDetail(e) {
			this.missionDetail = e;
			let res = await missionManage.fetchVideoByMission({ id: e.id });

			if (res.code !== 200) {
				return this.$message.warning(res.msg);
			}

			this.missionVideoList = res.list; // 任务视频列表
			this.missionDetailDV = true;
		},
		// 任务列表当前页切换
		missionListCurrentChange(currentPage) {
			this.missionListPage.currentPage = currentPage;
			this.getMIssionList(); // 获取任务列表
		},
		// 获取收货信息
		getReceivingMsg() {
			missionManage
				.fetchReceivingMsg()
				.then(res => {
					if (res.code === 200) {
						this.receivingMsg = res.data;
					} else {
						this.$message.warning(res.msg);
					}
				})
				.catch(() => {});
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
		// 发货
		shipment(e) {
			this.shipmentForm.id = e.id;
			this.shipmentDV = true;
		},
		/* ======================== 任务详情对话框 ======================== */
		// 关闭
		mDDClose(done) {
			this.missionVideoList = []; // 任务视频列表
			done();
		},
		/* ======================== 发布任务对话框 ======================== */
		// 关闭
		pMDClose() {
			this.$refs['publicMissionFormRef'].resetFields();
			this.publicMissionDV = false;
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
					number: this.publicMissionForm.videoNum,
					highlights: this.publicMissionForm.commodityMerit,
					content: this.publicMissionForm.videoDemand
				};
				missionManage
					.handleMissionAdd(data)
					.then(res => {
						if (res.code === 200) {
							this.$message.success('发布任务成功');
							this.$refs['publicMissionFormRef'].resetFields();
							this.publicMissionDV = false; // 发布任务对话框 隐藏
							this.getMIssionList(); // 获取任务列表
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
		},
		/* ======================== 发货对话框 ======================== */
		// 关闭
		sDClose() {
			this.$refs['shipmentFormRef'].resetFields();
			this.shipmentDV = false;
		},
		// 确认发货
		publicSF() {
			this.$refs['shipmentFormRef'].validate(valid => {
				if (!valid) {
					return false;
				}

				let data = { id: this.shipmentForm.id, logistics_name: this.shipmentForm.expressCompany, logistics: this.shipmentForm.expressIDNum };
				missionManage
					.shipments(data)
					.then(res => {
						if (res.code === 200) {
							this.$message.success('发货成功');
							this.shipmentDV = false;
							this.getMIssionList(); // 获取任务列表
						} else {
							this.$message.warning(res.msg);
						}
					})
					.catch(() => {});
			});
		},
		// 重置
		resetSF() {
			this.$refs['shipmentFormRef'].resetFields();
			this.$message.success('输入信息已重置');
		}
	},
	created() {
		this.searchMissionByStatus(); // 根据状态搜索
		this.getReceivingMsg(); // 获取收货信息
		this.getCommodityByMerch(); // 获取当前商家审核通过商品
	}
};
</script>
