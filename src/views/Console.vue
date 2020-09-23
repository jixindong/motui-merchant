<template>
	<div>
		<!-- 基础信息 -->
		<div class="baseMsg card">
			<div class="d-flex">
				<img :src="baseMsg.avatar" class="avatar" v-if="baseMsg" />
				<img src="@/assets/images/avatar.png" class="avatar" v-else />
				<div>
					<div class="d-flex align-items-center">
						<span class="mr-2 text-2" v-if="baseMsg">{{ baseMsg.name }}</span>
						<span class="nameplate" v-if="baseMsg">{{ baseMsg.talent || '未开通' }}</span>
					</div>
					<div class="mt-3">
						<span class="mr-4">
							<span>Tel：</span>
							<span class="text-primary" v-if="baseMsg">{{ baseMsg.phone }}</span>
						</span>
						<span class="text-info">
							<span v-if="baseMsg">{{ baseMsg.createTime }}</span>
							<span>入驻</span>
						</span>
					</div>
					<div class="mt-2">
						<span>代理：</span>
						<span class="text-primary" v-if="baseMsg">{{ baseMsg.did }}</span>
					</div>
				</div>
			</div>
		</div>

		<!-- 推广统计 -->
		<div class="d-flex flex-wrap my-4 p-4 card">
			<div class="headline mb-4 w-100">推广统计</div>
			<div class="w-33">
				<el-tag type="warning" size="small">等待分发</el-tag>
				<router-link :to="{ name: 'vpPromoteList', params: { promoteStatus: 'waitDistribute' } }" class="d-block mt-4 text-info text-2 text-center" v-if="statistics">
					{{ statistics.tgtj.dff }}
				</router-link>
				<router-link :to="{ name: 'vpPromoteList', params: { promoteStatus: 'waitDistribute' } }" class="d-block mt-4 text-info text-2 text-center" v-else>0</router-link>
			</div>
			<div class="w-33">
				<el-tag size="small">等待审核</el-tag>
				<router-link :to="{ name: 'vpPromoteList', params: { promoteStatus: 'waitCheck' } }" class="d-block mt-4 text-info text-2 text-center" v-if="statistics">
					{{ statistics.tgtj.dsh }}
				</router-link>
				<router-link :to="{ name: 'vpPromoteList', params: { promoteStatus: 'waitCheck' } }" class="d-block mt-4 text-info text-2 text-center" v-else>0</router-link>
			</div>
			<div class="w-33">
				<el-tag type="success" size="small">分发完成</el-tag>
				<router-link :to="{ name: 'vpPromoteList', params: { promoteStatus: 'completeDistribute' } }" class="d-block mt-4 text-info text-2 text-center" v-if="statistics">
					{{ statistics.tgtj.ffwc }}
				</router-link>
				<router-link :to="{ name: 'vpPromoteList', params: { promoteStatus: 'completeDistribute' } }" class="d-block mt-4 text-info text-2 text-center" v-else>
					0
				</router-link>
			</div>
		</div>

		<div class="d-flex my-4 p-4 card">
			<!-- 商品统计 -->
			<div class="d-flex flex-wrap w-50">
				<div class="headline mb-4 w-100">商品统计</div>
				<div class="w-50">
					<el-tag type="info" size="small">全部商品</el-tag>
					<router-link :to="{ name: 'commodityManage', params: { commodityStatus: 'all' } }" class="d-block mt-4 text-info text-2 text-center" v-if="statistics">
						{{ statistics.sptj.all }}
					</router-link>
					<router-link :to="{ name: 'commodityManage', params: { commodityStatus: 'all' } }" class="d-block mt-4 text-info text-2 text-center" v-else>0</router-link>
				</div>
				<div class="w-50">
					<el-tag size="small">待审核商品</el-tag>
					<router-link :to="{ name: 'commodityManage', params: { commodityStatus: 'waitCheck' } }" class="d-block mt-4 text-info text-2 text-center" v-if="statistics">
						{{ statistics.sptj.dsh }}
					</router-link>
					<router-link :to="{ name: 'commodityManage', params: { commodityStatus: 'waitCheck' } }" class="d-block mt-4 text-info text-2 text-center" v-else>
						0
					</router-link>
				</div>
				<div class="w-50">
					<el-tag type="success" size="small">审核通过商品</el-tag>
					<router-link :to="{ name: 'commodityManage', params: { commodityStatus: 'checked' } }" class="d-block mt-4 text-info text-2 text-center" v-if="statistics">
						{{ statistics.sptj.shtg }}
					</router-link>
					<router-link :to="{ name: 'commodityManage', params: { commodityStatus: 'checked' } }" class="d-block mt-4 text-info text-2 text-center" v-else>0</router-link>
				</div>
				<div class="w-50">
					<el-tag type="danger" size="small">审核拒绝商品</el-tag>
					<router-link :to="{ name: 'commodityManage', params: { commodityStatus: 'reject' } }" class="d-block mt-4 text-info text-2 text-center" v-if="statistics">
						{{ statistics.sptj.shjj }}
					</router-link>
					<router-link :to="{ name: 'commodityManage', params: { commodityStatus: 'reject' } }" class="d-block mt-4 text-info text-2 text-center" v-else>0</router-link>
				</div>
			</div>

			<!-- 视频制作 -->
			<div class="d-flex flex-wrap w-50">
				<div class="headline mb-4 w-100">视频制作</div>
				<div class="w-50">
					<el-tag type="info" size="small">全部任务</el-tag>
					<router-link :to="{ name: 'svMissionManage', params: { videoStatus: 'allMission' } }" class="d-block mt-4 text-info text-2 text-center" v-if="statistics">
						{{ statistics.spzz.all }}
					</router-link>
					<router-link :to="{ name: 'svMissionManage', params: { videoStatus: 'allMission' } }" class="d-block mt-4 text-info text-2 text-center" v-else>0</router-link>
				</div>
				<div class="w-50">
					<el-tag size="small">待发货</el-tag>
					<router-link :to="{ name: 'svMissionManage', params: { videoStatus: 'shipmented' } }" class="d-block mt-4 text-info text-2 text-center" v-if="statistics">
						{{ statistics.spzz.dfh }}
					</router-link>
					<router-link :to="{ name: 'svMissionManage', params: { videoStatus: 'shipmented' } }" class="d-block mt-4 text-info text-2 text-center" v-else>0</router-link>
				</div>
				<div class="w-50">
					<el-tag type="warning" size="small">等待制作</el-tag>
					<router-link :to="{ name: 'svMissionManage', params: { videoStatus: 'waitMake' } }" class="d-block mt-4 text-info text-2 text-center" v-if="statistics">
						{{ statistics.spzz.dzz }}
					</router-link>
					<router-link :to="{ name: 'svMissionManage', params: { videoStatus: 'waitMake' } }" class="d-block mt-4 text-info text-2 text-center" v-else>0</router-link>
				</div>
				<div class="w-50">
					<el-tag type="success" size="small">已完成</el-tag>
					<router-link :to="{ name: 'svMissionManage', params: { videoStatus: 'complete' } }" class="d-block mt-4 text-info text-2 text-center" v-if="statistics">
						{{ statistics.spzz.ywc }}
					</router-link>
					<router-link :to="{ name: 'svMissionManage', params: { videoStatus: 'complete' } }" class="d-block mt-4 text-info text-2 text-center" v-else>0</router-link>
				</div>
			</div>
		</div>

		<!-- 订单列表 -->
		<div class="d-flex flex-wrap mt-4 p-4 card">
			<div class="headline mb-4 w-100">订单列表</div>
			<div class="w-25">
				<el-tag type="warning" size="small">今日成交金额</el-tag>
				<div class="mt-4 text-info text-2 text-center" v-if="statistics">￥{{ statistics.ddlb.jrcjjw }}</div>
				<div class="mt-4 text-info text-2 text-center" v-else>￥0</div>
			</div>
			<div class="w-25">
				<el-tag size="small">今日成交订单数</el-tag>
				<div class="mt-4 text-info text-2 text-center" v-if="statistics">{{ statistics.ddlb.jrcjdd }}</div>
				<div class="mt-4 text-info text-2 text-center" v-else>0</div>
			</div>
			<div class="w-25">
				<el-tag type="warning" size="small">总成交金额</el-tag>
				<div class="mt-4 text-info text-2 text-center" v-if="statistics">￥{{ statistics.ddlb.zcje }}</div>
				<div class="mt-4 text-info text-2 text-center" v-else>￥0</div>
			</div>
			<div class="w-25">
				<el-tag size="small">总成交订单数</el-tag>
				<div class="mt-4 text-info text-2 text-center" v-if="statistics">{{ statistics.ddlb.zcjdd }}</div>
				<div class="mt-4 text-info text-2 text-center" v-else>0</div>
			</div>
			<div class="mt-4 w-100">
				<el-table :data="orderList" stripe border>
					<el-table-column prop="did" label="达人ID" show-overflow-tooltip></el-table-column>
					<el-table-column prop="item_title" label="宝贝标题" show-overflow-tooltip></el-table-column>
					<el-table-column prop="pay_price" label="付款金额" show-overflow-tooltip></el-table-column>
					<el-table-column prop="tb_paid_time" label="付款时间" show-overflow-tooltip></el-table-column>
					<el-table-column label="订单状态" align="center">
						<template slot-scope="scope">
							<span class="text-warning" v-if="scope.row.tk_status === 3">订单结算</span>
							<span class="text-primary" v-else-if="scope.row.tk_status === 12">订单付款</span>
							<span class="text-info" v-else-if="scope.row.tk_status === 13">订单失效</span>
							<span class="text-success" v-else-if="scope.row.tk_status === 14">订单成功</span>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination
					class="mt-4 text-center"
					layout="prev, pager, next"
					hide-on-single-page
					:total="orderListPage.total"
					:page-size="orderListPage.pageSize"
					:current-page="orderListPage.currentPage"
					@current-change="orderListCurrentChange"
				></el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
import * as dataCenter from '@/api/dataCenter';

export default {
	name: 'Console',
	data() {
		return {
			// 统计
			statistics: null,
			// 订单列表
			orderList: [],
			// 订单列表分页
			orderListPage: {
				total: 1,
				pageSize: 1,
				totalPage: 1,
				currentPage: 1
			}
		};
	},
	computed: {
		// 基本信息
		baseMsg() {
			return this.$store.state.baseMsg;
		}
	},
	methods: {
		// 获取统计
		getStatistics() {
			dataCenter
				.fetchStatistics()
				.then(res => {
					if (res.code === 200) {
						this.statistics = res.home;
					} else {
						this.$message.warning(res.msg);
					}
				})
				.catch(() => {});
		},
		// 获取订单列表
		getOrderList() {
			dataCenter
				.fetchOrderList({ type: 'sh' })
				.then(res => {
					if (res.code === 200) {
						this.orderList = res.page.list; // 订单列表
						let { totalCount: total, pageSize, totalPage, currPage: currentPage } = res.page;
						this.orderListPage = { total, pageSize, totalPage, currentPage }; // 订单列表分页
					} else {
						this.$message.warning(res.msg);
					}
				})
				.catch(() => {});
		},
		// 订单列表当前页切换
		orderListCurrentChange(currentPage) {
			this.orderListPage.currentPage = currentPage;
			this.getOrderList(); // 获取订单列表
		}
	},
	created() {
		this.getStatistics(); // 获取统计
		this.getOrderList(); // 获取订单列表
	}
};
</script>

<style lang="scss" scoped>
.baseMsg {
	display: flex;
	justify-content: space-between;
	padding: 20px 30px;
	.avatar {
		margin-right: 20px;
		width: 122px;
		height: 122px;
		border: 2px solid #cccccc3b;
		border-radius: 50%;
		box-shadow: 0 0 5px #0094ff33;
	}
	.nameplate {
		padding: 1px 3px;
		color: #f35626;
		font-size: 14px;
		background-color: coral;
		background-image: -webkit-linear-gradient(45deg, #f35626, #feab3a);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		border: 1px solid;
		border-radius: 2px;
		animation: hue 12s infinite linear;
	}
}
</style>
