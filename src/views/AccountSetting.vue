<template>
	<div>
		<!-- 大标题 -->
		<div class="headline">账户信息</div>
		<!-- 账户信息 -->
		<div>
			<el-table :data="basicMsg" stripe border>
				<el-table-column prop="account" label="账号" show-overflow-tooltip></el-table-column>
				<el-table-column prop="enterDate" label="入驻时间" show-overflow-tooltip></el-table-column>
				<el-table-column prop="setmeal" label="套餐名称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="agencyAccount" label="代理账号" show-overflow-tooltip></el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AccountSetting',
	data() {
		return {
			// 账户信息
			basicMsg: [{ account: '账号1', enterDate: '2020年9月16日', setmeal: '入门包', agencyAccount: '123456' }]
		};
	}
};
</script>
