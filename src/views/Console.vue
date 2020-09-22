<template>
	<div>
		<!-- 基础信息 -->
		<div class="baseMsg card">
			<div class="d-flex">
				<img :src="baseMsg.avatar" class="avatar" v-if="baseMsg.avatar" />
				<div>
					<div class="d-flex align-items-center">
						<span class="mr-2 text-2">{{ baseMsg.name }}</span>
						<span class="nameplate">{{ baseMsg.talent || '未开通' }}</span>
					</div>
					<div class="mt-3">
						<span class="mr-4">
							<span>Tel：</span>
							<span class="text-primary">{{ baseMsg.phone }}</span>
						</span>
						<span class="text-info">
							<span>{{ baseMsg.createTime }}</span>
							<span>入驻</span>
						</span>
					</div>
					<div class="mt-2">
						<span>代理：</span>
						<span class="text-primary">{{ baseMsg.did }}</span>
					</div>
				</div>
			</div>
		</div>

		<!-- 推广统计 -->
		<div class="d-flex flex-wrap my-4 p-4 card">
			<div class="headline mb-4 w-100">推广统计</div>
			<div class="w-33">
				<el-tag type="warning" size="small">等待分发</el-tag>
				<router-link :to="{ name: 'vpPromoteList', params: { promoteStatus: 'waitDistribute' } }" class="d-block mt-4 text-info text-2 text-center">
					{{ promoteStatistics.waitDistribute }}
				</router-link>
			</div>
			<div class="w-33">
				<el-tag size="small">等待审核</el-tag>
				<router-link :to="{ name: 'vpPromoteList', params: { promoteStatus: 'waitCheck' } }" class="d-block mt-4 text-info text-2 text-center">
					{{ promoteStatistics.waitCheck }}
				</router-link>
			</div>
			<div class="w-33">
				<el-tag type="success" size="small">分发完成</el-tag>
				<router-link :to="{ name: 'vpPromoteList', params: { promoteStatus: 'completeDistribute' } }" class="d-block mt-4 text-info text-2 text-center">
					{{ promoteStatistics.completeDistribute }}
				</router-link>
			</div>
		</div>

		<div class="d-flex my-4 p-4 card">
			<!-- 商品统计 -->
			<div class="d-flex flex-wrap w-50">
				<div class="headline mb-4 w-100">商品统计</div>
				<div class="w-50">
					<el-tag type="info" size="small">全部商品</el-tag>
					<router-link :to="{ name: 'commodityManage', params: { commodityStatus: 'all' } }" class="d-block mt-4 text-info text-2 text-center">
						{{ commodityStatistics.all }}
					</router-link>
				</div>
				<div class="w-50">
					<el-tag size="small">待审核商品</el-tag>
					<router-link :to="{ name: 'commodityManage', params: { commodityStatus: 'waitCheck' } }" class="d-block mt-4 text-info text-2 text-center">
						{{ commodityStatistics.waitCheck }}
					</router-link>
				</div>
				<div class="w-50">
					<el-tag type="success" size="small">审核通过商品</el-tag>
					<router-link :to="{ name: 'commodityManage', params: { commodityStatus: 'checked' } }" class="d-block mt-4 text-info text-2 text-center">
						{{ commodityStatistics.checked }}
					</router-link>
				</div>
				<div class="w-50">
					<el-tag type="danger" size="small">审核拒绝商品</el-tag>
					<router-link :to="{ name: 'commodityManage', params: { commodityStatus: 'reject' } }" class="d-block mt-4 text-info text-2 text-center">
						{{ commodityStatistics.reject }}
					</router-link>
				</div>
			</div>

			<!-- 视频制作 -->
			<div class="d-flex flex-wrap w-50">
				<div class="headline mb-4 w-100">视频制作</div>
				<div class="w-50">
					<el-tag type="info" size="small">全部任务</el-tag>
					<router-link :to="{ name: 'svMissionManage', params: { videoStatus: 'allMission' } }" class="d-block mt-4 text-info text-2 text-center">
						{{ videoStatistics.allMission }}
					</router-link>
				</div>
				<div class="w-50">
					<el-tag size="small">已发货</el-tag>
					<router-link :to="{ name: 'svMissionManage', params: { videoStatus: 'shipmented' } }" class="d-block mt-4 text-info text-2 text-center">
						{{ videoStatistics.shipmented }}
					</router-link>
				</div>
				<div class="w-50">
					<el-tag type="warning" size="small">等待制作</el-tag>
					<router-link :to="{ name: 'svMissionManage', params: { videoStatus: 'waitMake' } }" class="d-block mt-4 text-info text-2 text-center">
						{{ videoStatistics.waitMake }}
					</router-link>
				</div>
				<div class="w-50">
					<el-tag type="success" size="small">已完成</el-tag>
					<router-link :to="{ name: 'svMissionManage', params: { videoStatus: 'complete' } }" class="d-block mt-4 text-info text-2 text-center">
						{{ videoStatistics.complete }}
					</router-link>
				</div>
			</div>
		</div>

		<!-- 订单列表 -->
		<div class="d-flex flex-wrap mt-4 p-4 card">
			<div class="headline mb-4 w-100">订单列表</div>
			<div class="w-25">
				<el-tag type="warning" size="small">今日成交金额</el-tag>
				<div class="mt-4 text-info text-2 text-center">￥{{ orderStatistics.todayProfit }}</div>
			</div>
			<div class="w-25">
				<el-tag size="small">今日成交订单数</el-tag>
				<div class="mt-4 text-info text-2 text-center">{{ orderStatistics.todayOrders }}</div>
			</div>
			<div class="w-25">
				<el-tag type="warning" size="small">总成交金额</el-tag>
				<div class="mt-4 text-info text-2 text-center">￥{{ orderStatistics.allProfit }}</div>
			</div>
			<div class="w-25">
				<el-tag size="small">总成交订单数</el-tag>
				<div class="mt-4 text-info text-2 text-center">{{ orderStatistics.allOrders }}</div>
			</div>
			<div class="mt-4 w-100">
				<el-table :data="orderList" stripe border>
					<el-table-column prop="starID" label="达人ID" show-overflow-tooltip></el-table-column>
					<el-table-column prop="commodityName" label="宝贝标题" show-overflow-tooltip></el-table-column>
					<el-table-column prop="paymentNum" label="付款金额" show-overflow-tooltip></el-table-column>
					<el-table-column prop="paymentDate" label="付款时间" show-overflow-tooltip></el-table-column>
					<el-table-column label="带货视频" show-overflow-tooltip>
						<template slot-scope="scope">
							<el-link type="primary" :href="scope.row.commodityLink">{{ scope.row.commodityLink }}</el-link>
						</template>
					</el-table-column>
					<el-table-column label="订单状态" align="center">
						<template slot-scope="scope">
							<span class="text-danger" v-if="scope.row.orderStatus === 0">未支付</span>
							<span class="text-primary" v-else>已支付</span>
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
export default {
	name: 'Console',
	data() {
		return {
			// 推广统计
			promoteStatistics: {
				waitDistribute: 10,
				waitCheck: 5,
				completeDistribute: 66
			},
			// 商品统计
			commodityStatistics: {
				all: 100,
				waitCheck: 20,
				checked: 60,
				reject: 20
			},
			// 视频制作统计
			videoStatistics: { allMission: 100, shipmented: 50, waitMake: 20, complete: 30 },
			// 订单统计
			orderStatistics: { todayProfit: 666, todayOrders: 50, allProfit: 6666, allOrders: 500 },
			// 订单列表
			orderList: [
				{
					starID: 123456,
					commodityName: '宝贝一',
					paymentNum: 666,
					paymentDate: '2020年9月16日14:56:53',
					commodityLink: 'http://www.baidu.com',
					orderStatus: 0
				},
				{
					starID: 123456,
					commodityName: '宝贝二',
					paymentNum: 666,
					paymentDate: '2020年9月16日14:56:53',
					commodityLink: 'http://www.baidu.com',
					orderStatus: 1
				},
				{
					starID: 123456,
					commodityName: '宝贝三',
					paymentNum: 666,
					paymentDate: '2020年9月16日14:56:53',
					commodityLink: 'http://www.baidu.com',
					orderStatus: 1
				}
			],
			// 订单列表分页
			orderListPage: {
				total: 15,
				pageSize: 10,
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
		// 订单列表当前页切换
		orderListCurrentChange(currentPage) {
			this.orderListPage.currentPage = currentPage;
		}
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
