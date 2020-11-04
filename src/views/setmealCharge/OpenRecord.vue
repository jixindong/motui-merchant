<template>
	<div class="card p-4 min-h-800">
		<!-- 大标题 -->
		<div class="headline mb-4">开通记录</div>

		<!-- 功能区域 -->
		<div class="d-flex justify-content-between my-4">
			<el-select size="medium" class="w-20" v-model="search.status" placeholder="请选择支付状态" clearable>
				<el-option label="请选择" value=""></el-option>
				<el-option label="支付成功" :value="1"></el-option>
				<el-option label="支付失败" :value="0"></el-option>
			</el-select>
			<el-select size="medium" class="w-20" v-model="search.pay" placeholder="请选择支付方式" clearable>
				<el-option label="请选择" value=""></el-option>
				<el-option label="微信支付" value="wx"></el-option>
				<el-option label="支付宝支付" value="zfb"></el-option>
			</el-select>
			<el-input type="text" size="medium" class="w-20" v-model="search.name" placeholder="请输入套餐名称"></el-input>
			<el-date-picker
				type="daterange"
				size="medium"
				value-format="yyyy-MM-dd HH:mm:ss"
				v-model="search.date"
				range-separator="-"
				start-placeholder="开始日期"
				end-placeholder="结束日期"
				class="w-25"
			></el-date-picker>
			<el-button type="primary" size="medium" icon="el-icon-search" plain @click="getSetmealRecord">搜索</el-button>
		</div>

		<!-- 开通记录列表 -->
		<div>
			<el-table :data="recordList" stripe border>
				<el-table-column prop="tName" label="套餐名称" show-overflow-tooltip></el-table-column>
				<el-table-column label="价格" show-overflow-tooltip>
					<template slot-scope="scope">
						<span>{{ scope.row.price }}元</span>
					</template>
				</el-table-column>
				<el-table-column label="原价" show-overflow-tooltip>
					<template slot-scope="scope">
						<span>{{ scope.row.price_total }}元</span>
					</template>
				</el-table-column>
				<el-table-column prop="create_time" label="开通时间" show-overflow-tooltip></el-table-column>
				<el-table-column label="支付方式">
					<template slot-scope="scope">
						<span class="text-success" v-if="scope.row.type === 'wx'">微信支付</span>
						<span class="text-primary" v-else-if="scope.row.type === 'zfb'">支付宝支付</span>
					</template>
				</el-table-column>
				<el-table-column label="支付状态" align="center">
					<template slot-scope="scope">
						<el-tag type="danger" v-if="scope.row.status === 0">支付失败</el-tag>
						<el-tag type="success" v-else>支付成功</el-tag>
					</template>
				</el-table-column>
			</el-table>
			<div class="d-flex justify-content-center mt-4">
				<el-pagination
					layout="total, prev, pager, next"
					:total="recordListPage.total"
					:page-size="recordListPage.pageSize"
					:current-page="recordListPage.currentPage"
					@current-change="recordListCurrentChange"
				></el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
import { fetchSetmealRecord } from '@/api/setmeal';

export default {
	name: 'OpenRecord',
	data() {
		return {
			/* ======================== 开通记录 ======================== */
			// 搜索
			search: {
				status: null,
				name: '',
				date: ['', ''],
				pay: null
			},
			// 列表
			recordList: [],
			// 分页
			recordListPage: {
				total: 1,
				pageSize: 10,
				totalPage: 1,
				currentPage: 1
			}
		};
	},
	computed: {
		// 搜索条件
		searchData() {
			return {
				page: this.recordListPage.currentPage,
				limit: this.recordListPage.pageSize,
				status: this.search.status || '',
				name: this.search.starName,
				start_time: this.search.date[0],
				end_time: this.search.date[1],
				pay: this.search.pay || ''
			};
		}
	},
	methods: {
		/* ======================== 开通记录 ======================== */
		// 获取开通记录列表
		async getSetmealRecord() {
			let res = await fetchSetmealRecord(this.searchData);
			if (res.code !== 200) {
				return this.$message.warning(res.msg);
			}

			this.recordList = res.list.list; // 开通记录列表
			let { totalCount: total, pageSize, totalPage, currPage: currentPage } = res.list;
			this.recordListPage = { total, pageSize, totalPage, currentPage }; // 开通记录分页
		},
		// 开通记录列表当前页切换
		recordListCurrentChange(currentPage) {
			this.recordListPage.currentPage = currentPage;
			this.getSetmealRecord(); // 获取开通记录列表
		}
	},
	created() {
		this.getSetmealRecord(); // 获取开通记录列表
	}
};
</script>
