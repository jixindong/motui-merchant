<template>
	<div class="card p-4 min-h-800">
		<!-- 大标题 -->
		<div class="headline mb-4">套餐余量</div>

		<!-- 套餐余量 -->
		<div>
			<el-table :data="nowSetmealList" stripe border>
				<el-table-column prop="bName" label="商家名称" show-overflow-tooltip></el-table-column>
				<el-table-column label="短视频推广">
					<template slot-scope="scope">
						<span :class="{ 'text-primary': scope.row.video > 0, 'text-danger': scope.row.video === 0 }">{{ scope.row.video }}</span>
					</template>
				</el-table-column>
				<el-table-column label="视频制作">
					<template slot-scope="scope">
						<span :class="{ 'text-primary': scope.row.shot > 0, 'text-danger': scope.row.shot === 0 }">{{ scope.row.shot }}</span>
					</template>
				</el-table-column>
				<el-table-column label="直播场次">
					<template slot-scope="scope">
						<span :class="{ 'text-primary': scope.row.live > 0, 'text-danger': scope.row.live === 0 }">{{ scope.row.live }}</span>
					</template>
				</el-table-column>
			</el-table>
			<div class="d-flex justify-content-center mt-4">
				<el-pagination
					layout="prev, pager, next"
					hide-on-single-page
					:total="nowSetmealListPage.total"
					:page-size="nowSetmealListPage.pageSize"
					:current-page="nowSetmealListPage.currentPage"
					@current-change="nowSetmealListCurrentChange"
				></el-pagination>
			</div>
		</div>

		<!-- 大标题 -->
		<div class="headline my-4">套餐开通</div>

		<!-- 套餐开通 -->
		<div>
			<el-table :data="setmealList" stripe border>
				<el-table-column prop="name" label="套餐名称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="priceTotal" label="原价" show-overflow-tooltip></el-table-column>
				<el-table-column prop="price" label="优惠价" show-overflow-tooltip></el-table-column>
				<el-table-column prop="video" label="短视频推广数"></el-table-column>
				<el-table-column prop="shot" label="视频制作数"></el-table-column>
				<el-table-column prop="live" label="直播场次"></el-table-column>
				<el-table-column label="开通" align="center">
					<template slot-scope="scope">
						<el-button type="warning" size="small" icon="el-icon-coin" plain @click="purchaseSetmeal(scope.row)">开通</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<!-- 支付方式对话框 -->
		<el-dialog title="支付方式" :visible.sync="choicePayTypeDV" :before-close="choicePayTypeDClose">
			<div class="text-1">选择支付方式：{{ payType }}</div>
			<div class="payTab">
				<div :class="['item', { active: payTypeSign === 'zfb' }]" @click="payTypeSign = 'zfb'">
					<img src="@/assets/images/Alipay.png" />
					<div>支付宝支付</div>
				</div>
				<div :class="['item', { active: payTypeSign === 'wx' }]" @click="payTypeSign = 'wx'">
					<img src="@/assets/images/WeChatPay.png" />
					<div>微信支付</div>
				</div>
			</div>
			<div class="d-flex justify-content-center"><el-button type="primary" size="medium" icon="el-icon-coin" @click="payNow">立即支付</el-button></div>
		</el-dialog>

		<!-- 支付宝对话框 -->
		<el-dialog title="支付宝支付" width="360px" :visible.sync="AlipayDV" :before-close="AlipayDClose"><div class="text-1">正在支付...</div></el-dialog>

		<!-- 微信支付对话框 -->
		<el-dialog title="微信支付" width="360px" :visible.sync="WeChatPayDV" :before-close="WeChatPayDClose">
			<qriously class="d-flex justify-content-center" :size="200" :value="WeChatPayLink"></qriously>
		</el-dialog>
	</div>
</template>

<script>
import * as setmeal from '@/api/setmeal';

export default {
	name: 'SetmealOpen',
	data() {
		return {
			/* ======================== 套餐余量 ======================== */
			// 列表
			nowSetmealList: [],
			// 分页
			nowSetmealListPage: {
				total: 1,
				pageSize: 1,
				totalPage: 1,
				currentPage: 1
			},
			/* ======================== 套餐开通 ======================== */
			// 列表
			setmealList: [],
			/* ======================== 支付方式对话框 ======================== */
			// 显示隐藏
			choicePayTypeDV: false,
			// 当前选择套餐
			currentSeatmeal: null,
			// 支付方式标识
			payTypeSign: '',
			// 支付标识
			paySign: 0,
			// 支付定时器
			payTimer: null,
			/* ======================== 支付宝对话框 ======================== */
			// 显示隐藏
			AlipayDV: false,
			/* ======================== 微信支付对话框 ======================== */
			// 显示隐藏
			WeChatPayDV: false,
			// 微信支付链接
			WeChatPayLink: ''
		};
	},
	computed: {
		// 搜索条件
		searchData() {
			return { page: this.nowSetmealListPage.currentPage };
		},
		// 支付方式
		payType() {
			let payType = '';
			if (this.payTypeSign === 'zfb') {
				payType = '支付宝';
			} else if (this.payTypeSign === 'wx') {
				payType = '微信支付';
			} else {
				payType = '';
			}
			return payType;
		}
	},
	methods: {
		/* ======================== 套餐余量 ======================== */
		// 获取套餐余量列表
		getSetmealResidue() {
			setmeal
				.fetchSetmealResidue(this.searchData)
				.then(res => {
					if (res.code === 200) {
						this.nowSetmealList = res.list.list; // 套餐余量列表
						let { totalCount: total, pageSize, totalPage, currPage: currentPage } = res.list;
						this.nowSetmealListPage = { total, pageSize, totalPage, currentPage }; // 套餐余量列表分页
					} else {
						this.$message.warning(res.msg);
					}
				})
				.catch(() => {});
		},
		// 套餐余量列表当前页切换
		nowSetmealListCurrentChange(currentPage) {
			this.nowSetmealListPage.currentPage = currentPage;
			this.getSetmealResidue(); // 获取套餐余量列表
		},
		/* ======================== 套餐开通 ======================== */
		// 获取套餐列表
		getSetmealList() {
			setmeal
				.fetchSetmealList()
				.then(res => {
					if (res.code === 200) {
						this.setmealList = res.list.list; // 套餐开通列表
					} else {
						this.$message.warning(res.msg);
					}
				})
				.catch(() => {});
		},
		// 开通
		purchaseSetmeal(e) {
			this.currentSeatmeal = e;
			this.choicePayTypeDV = true;
		},
		/* ======================== 支付方式对话框 ======================== */
		// 立即支付
		payNow() {
			if (!this.payTypeSign) {
				this.$message.warning('请选择支付方式');
				return false;
			}

			// let data = { id: this.currentSeatmeal.id, price: 0.01, priceTotal: 0.01, type: this.payTypeSign };
			let data = { id: this.currentSeatmeal.id, price: this.currentSeatmeal.price, priceTotal: this.currentSeatmeal.priceTotal, type: this.payTypeSign };
			if (data.type === 'wx') {
				this.WeChatPay(data);
			} else if (data.type === 'zfb') {
				this.Alipay(data);
			}
		},
		// 是否支付成功
		judgePaymentSuccess(data) {
			setmeal
				.fetchPaymentSuccess(data)
				.then(res => {
					if (res.code !== 200) {
						return false;
					}

					this.paySign = res.status; // 支付标识
					if (res.status === 1) {
						this.$message.success('开通成功');
						this.AlipayDV = false; // 支付宝对话框 隐藏
						this.WeChatPayDV = false; // 微信支付对话框 隐藏
					}
				})
				.catch(() => {});
		},
		// 关闭
		choicePayTypeDClose(done) {
			this.$confirm('确认关闭？', '提示', {
				confirmButtonText: '关闭',
				cancelButtonText: '取消',
				type: 'info'
			})
				.then(() => {
					this.currentSeatmeal = null; // 当前选择套餐
					this.payTypeSign = ''; // 支付方式标识
					done();
				})
				.catch(() => {});
		},
		/* ======================== 支付宝对话框 ======================== */
		// 支付宝支付
		Alipay(data) {
			setmeal
				.openSeatmeal(data)
				.then(res => {
					if (res.code === 200) {
						let div = document.createElement('div');
						div.innerHTML = res.status;
						document.body.appendChild(div);
						document.forms[0].target = 'blank';
						document.forms[0].submit();
						document.body.removeChild(div);
						this.AlipayDV = true; // 支付宝对话框 显示
						this.choicePayTypeDV = false; // 支付方式对话框 隐藏
						this.payTypeSign = ''; // 支付方式标识
						this.payTimer = setInterval(() => {
							if (this.paySign === 1 || this.AlipayDV === false) {
								this.payTimer = null;
								return false;
							}
							this.judgePaymentSuccess({ orderId: res.orderId }); // 是否支付成功
						}, 3000);
					} else {
						this.$message.warning(res.msg);
					}
				})
				.catch(() => {});
		},
		// 关闭
		AlipayDClose(done) {
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
		/* ======================== 微信支付对话框 ======================== */
		// 微信支付
		WeChatPay(data) {
			setmeal
				.openSeatmeal(data)
				.then(res => {
					if (!res) {
						this.$message.warning('请重试');
						return false;
					}

					this.WeChatPayLink = res.code_url; // 微信支付链接
					this.WeChatPayDV = true; // 微信支付对话框 显示
					this.choicePayTypeDV = false; // 支付方式对话框 隐藏
					this.payTypeSign = ''; // 支付方式标识
					this.payTimer = setInterval(() => {
						if (this.paySign === 1 || this.WeChatPayDV === false) {
							this.payTimer = null;
							return false;
						}
						this.judgePaymentSuccess({ orderId: res.out_trade_no }); // 是否支付成功
					}, 3000);
				})
				.catch(() => {});
		},
		// 关闭
		WeChatPayDClose(done) {
			this.$confirm('确认关闭？', '提示', {
				confirmButtonText: '关闭',
				cancelButtonText: '取消',
				type: 'info'
			})
				.then(() => {
					this.WeChatPayLink = ''; // 微信支付链接
					done();
				})
				.catch(() => {});
		}
	},
	created() {
		this.getSetmealResidue(); // 获取套餐余量列表
		this.getSetmealList(); // 获取套餐列表
	}
};
</script>

<style lang="scss" scoped>
.payTab {
	display: flex;
	justify-content: center;
	padding: 20px 0;
	.item {
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;
		margin: 0 20px;
		padding: 20px 40px;
		font-size: 16px;
		cursor: pointer;
		&.active {
			color: #fff;
			background-color: #c9e8ff;
		}
		img {
			margin-bottom: 10px;
			width: 80px;
			height: 80px;
		}
	}
}
</style>
