<template>
	<div class="card p-4 min-h-800">
		<!-- 大标题 -->
		<div class="headline mb-4">账户信息</div>

		<!-- 账户信息 -->
		<div class="baseMsg">
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
		<div class="my-2">地址：{{ baseMsg.province }}{{ baseMsg.city }}{{ baseMsg.address }}</div>
		<div class="my-2">商家描述：</div>
		<div class="p-2">{{ baseMsg.content }}</div>
	</div>
</template>

<script>
export default {
	name: 'AccountSetting',
	computed: {
		// 基本信息
		baseMsg() {
			return this.$store.state.baseMsg;
		}
	}
};
</script>

<style lang="scss" scoped>
.baseMsg {
	display: flex;
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
