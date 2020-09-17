<template>
	<div class="console">
		<!-- 基础信息 -->
		<div class="baseMsg">
			<div class="d-flex">
				<img src="@/assets/images/avatar.png" class="avatar" />
				<div>
					<div class="d-flex align-items-center">
						<span class="mr-2 text-2">{{ basicMsg.account }}</span>
						<span class="nameplate">{{ basicMsg.setmeal }}</span>
					</div>
					<div class="mt-3">
						<span class="mr-4">
							<span>Tel：</span>
							<span class="text-primary">{{ basicMsg.tel }}</span>
						</span>
						<span class="text-info">
							<span>{{ basicMsg.enterDate }}</span>
							<span>入驻</span>
						</span>
					</div>
					<div class="mt-2">
						<span>代理：</span>
						<span class="text-primary">{{ basicMsg.agencyAccount }}</span>
					</div>
				</div>
			</div>
		</div>

		<!-- 统计信息 -->
		<div class="d-flex flex-wrap">
			<!-- 推广统计 -->
			<div class="d-flex flex-wrap w-50">
				<div class="headline w-100">推广统计</div>
				<div class="w-50">
					<el-tag type="warning" size="small">等待分发</el-tag>
					<router-link :to="{ name: 'vpPromoteList', params: { promoteStatus: 'waitDistribute' } }" class="d-block mt-4 text-info text-2 text-center">
						{{ promoteStatistics.waitDistribute }}
					</router-link>
				</div>
				<div class="w-50">
					<el-tag size="small">等待审核</el-tag>
					<router-link :to="{ name: 'vpPromoteList', params: { promoteStatus: 'waitCheck' } }" class="d-block mt-4 text-info text-2 text-center">
						{{ promoteStatistics.waitCheck }}
					</router-link>
				</div>
				<div class="w-50">
					<el-tag type="success" size="small">分发完成</el-tag>
					<router-link :to="{ name: 'vpPromoteList', params: { promoteStatus: 'completeDistribute' } }" class="d-block mt-4 text-info text-2 text-center">
						{{ promoteStatistics.completeDistribute }}
					</router-link>
				</div>
			</div>

			<!-- 商品统计 -->
			<div class="d-flex flex-wrap w-50">
				<div class="headline w-100">商品统计</div>
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
			<div class="d-flex flex-wrap mt-4 w-50">
				<div class="headline w-100">视频制作</div>
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

			<!-- 订单统计 -->
			<div class="d-flex flex-wrap mt-4 w-50">
				<div class="headline w-100">订单统计</div>
				<div class="w-50">
					<el-tag type="warning" size="small">今日成交金额</el-tag>
					<div class="mt-4 text-info text-2 text-center">￥{{ orderStatistics.todayProfit }}</div>
				</div>
				<div class="w-50">
					<el-tag size="small">今日成交订单数</el-tag>
					<div class="mt-4 text-info text-2 text-center">{{ orderStatistics.todayOrders }}</div>
				</div>
				<div class="w-50">
					<el-tag type="warning" size="small">总成交金额</el-tag>
					<div class="mt-4 text-info text-2 text-center">￥{{ orderStatistics.allProfit }}</div>
				</div>
				<div class="w-50">
					<el-tag size="small">总成交订单数</el-tag>
					<div class="mt-4 text-info text-2 text-center">{{ orderStatistics.allOrders }}</div>
				</div>
			</div>
		</div>

		<!-- 大标题 -->
		<!-- <div class="headline">基础信息</div> -->
		<!-- 基础信息 -->
		<!-- <div>
			<el-table :data="basicMsg" stripe border>
				<el-table-column prop="account" label="账号" show-overflow-tooltip></el-table-column>
				<el-table-column prop="enterDate" label="入驻时间" show-overflow-tooltip></el-table-column>
				<el-table-column prop="setmeal" label="套餐名称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="agencyAccount" label="代理账号" show-overflow-tooltip></el-table-column>
			</el-table>
		</div> -->

		<!-- 大标题 -->
		<!-- <div class="headline">推广统计</div>
		<div>
			<el-table :data="promoteStatistics" stripe border>
				<el-table-column prop="waitDistribute" label="等待分发" align="center" show-overflow-tooltip></el-table-column>
				<el-table-column prop="waitCheck" label="等待审核" align="center" show-overflow-tooltip></el-table-column>
				<el-table-column prop="completeDistribute" label="分发完成" align="center" show-overflow-tooltip></el-table-column>
			</el-table>
		</div> -->

		<!-- 大标题 -->
		<!-- <div class="headline mt-5">商品统计</div>
		<div>
			<el-table :data="commodityStatistics" stripe border>
				<el-table-column prop="all" label="全部商品" align="center" show-overflow-tooltip></el-table-column>
				<el-table-column prop="waitCheck" label="待审核商品" align="center" show-overflow-tooltip></el-table-column>
				<el-table-column prop="checked" label="审核通过商品" align="center" show-overflow-tooltip></el-table-column>
				<el-table-column prop="reject" label="审核拒绝商品" align="center" show-overflow-tooltip></el-table-column>
			</el-table>
		</div> -->

		<!-- 大标题 -->
		<!-- <div class="headline mt-5">视频制作统计</div>
		<div>
			<el-table :data="videoStatistics" stripe border>
				<el-table-column prop="allMission" label="全部任务" align="center" show-overflow-tooltip></el-table-column>
				<el-table-column prop="shipmented" label="已发货" align="center" show-overflow-tooltip></el-table-column>
				<el-table-column prop="waitMake" label="等待制作" align="center" show-overflow-tooltip></el-table-column>
				<el-table-column prop="complete" label="已完成" align="center" show-overflow-tooltip></el-table-column>
			</el-table>
		</div> -->

		<!-- 大标题 -->
		<!-- <div class="headline mt-5">订单统计</div>
		<div>
			<el-table :data="orderStatistics" stripe border>
				<el-table-column prop="todayProfit" label="今日成交额" align="center" show-overflow-tooltip></el-table-column>
				<el-table-column prop="todayOrders" label="今日订单成交数" align="center" show-overflow-tooltip></el-table-column>
				<el-table-column prop="allProfit" label="总订单成交额" align="center" show-overflow-tooltip></el-table-column>
				<el-table-column prop="allOrders" label="总订单成交数" align="center" show-overflow-tooltip></el-table-column>
			</el-table>
		</div> -->

		<div class="headline mt-4">订单列表</div>
		<div>
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
			<div class="d-flex justify-content-center mt-4">
				<el-pagination
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
			// 基础信息
			basicMsg: {
				account: '山东鲁杰律师事务所',
				tel: '11011011011',
				enterDate: '2000年9月10日',
				setmeal: '高级包',
				agencyAccount: '张三'
			},
			// basicMsg: [{ account: '账号1',enterDate:'2020年9月16日',setmeal:'入门包',agencyAccount:'123456'}],
			// 推广统计
			promoteStatistics: {
				waitDistribute: 10,
				waitCheck: 5,
				completeDistribute: 66
			},
			// promoteStatistics: [{ waitDistribute: 10, waitCheck: 5, completeDistribute: 66 }],
			// 商品统计
			commodityStatistics: {
				all: 100,
				waitCheck: 20,
				checked: 60,
				reject: 20
			},
			// commodityStatistics: [{ all: 100, waitCheck: 20, checked: 60, reject: 20 }],
			// 视频制作统计
			videoStatistics: { allMission: 100, shipmented: 50, waitMake: 20, complete: 30 },
			// videoStatistics: [{ allMission: 100, shipmented: 50, waitMake: 20, complete: 30 }],
			// 订单统计
			orderStatistics: { todayProfit: 666, todayOrders: 50, allProfit: 6666, allOrders: 500 },
			// orderStatistics: [{ todayProfit: 666, todayOrders: 50, allProfit: 6666, allOrders: 500 }],
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
	padding: 20px 30px 50px;
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
