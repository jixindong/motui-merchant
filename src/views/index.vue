<template>
	<div class="index">
		<!-- 导航栏 -->
		<div class="hd">
			<div class="container d-flex align-items-center">
				<img src="@/assets/images/logo-1.png" class="logo" />
				<el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
				<el-dropdown trigger="click" @command="setting">
					<img src="@/assets/images/setting.png" class="setting" />
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="0">个人中心</el-dropdown-item>
						<el-dropdown-item command="1">修改密码</el-dropdown-item>
						<el-dropdown-item command="2">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>

		<!-- 主体 -->
		<div class="bd">
			<div class="container d-flex align-items-start">
				<el-menu default-active="0" class="aside-menu" @select="asideMenuSelect">
					<el-menu-item index="1">
						<i class="el-icon-box"></i>
						<span slot="title">商品管理</span>
					</el-menu-item>

					<el-submenu index="2">
						<template slot="title">
							<i class="el-icon-video-camera-solid"></i>
							<span>拍摄视频</span>
						</template>
						<el-menu-item-group><el-menu-item index="2-1">任务管理</el-menu-item></el-menu-item-group>
					</el-submenu>

					<el-submenu index="3">
						<template slot="title">
							<i class="el-icon-position"></i>
							<span>拍摄推广</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="3-1">任务管理</el-menu-item>
							<el-menu-item index="3-2">推广列表</el-menu-item>
						</el-menu-item-group>
					</el-submenu>

					<el-submenu index="4">
						<template slot="title">
							<i class="el-icon-s-data"></i>
							<span>数据中心</span>
						</template>
						<el-menu-item-group><el-menu-item index="4-1">订单列表</el-menu-item></el-menu-item-group>
					</el-submenu>

					<el-submenu index="5">
						<template slot="title">
							<i class="el-icon-money"></i>
							<span>套餐充值</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="5-1">套餐开通</el-menu-item>
							<el-menu-item index="5-2">开通记录</el-menu-item>
						</el-menu-item-group>
					</el-submenu>

					<el-menu-item index="6">
						<i class="el-icon-chat-line-square"></i>
						<span slot="title">消息中心</span>
					</el-menu-item>

					<el-menu-item index="7">
						<i class="el-icon-setting"></i>
						<span slot="title">账户设置</span>
					</el-menu-item>

					<el-menu-item index="0">
						<i class="el-icon-receiving"></i>
						<span slot="title">控制台</span>
					</el-menu-item>
				</el-menu>

				<div class="main"><router-view /></div>
			</div>
		</div>

		<!-- 底部 -->
		<div class="ft">© 2018-2020 瓦艾斯 All rights reserved.</div>
	</div>
</template>

<script>
export default {
	name: 'index',
	data() {
		return {};
	},
	methods: {
		// 设置
		setting(e) {
			console.log(e);
		},
		// 侧边栏菜单激活回调
		asideMenuSelect(e) {
			if (e === '1') {
				this.$router.push({ name: 'commodityManage' }); // 商品管理
			} else if (e === '2-1') {
				this.$router.push({ name: 'svMissionManage' }); // 拍摄视频/任务管理
			} else if (e === '3-1') {
				this.$router.push({ name: 'vmMissionManage' }); // 视频推广/任务管理
			} else if (e === '3-2') {
				this.$router.push({ name: 'vpPromoteList' }); // 视频推广/推广列表
			} else if (e === '4-1') {
				this.$router.push({ name: 'dcOrderList' }); // 数据中心/订单列表
			} else if (e === '5-1') {
				this.$router.push({ name: 'scSetmealOpen' }); // 套餐充值/套餐开通
			} else if (e === '5-2') {
				this.$router.push({ name: 'scOpenRecord' }); // 套餐充值/开通记录
			} else if (e === '6') {
				this.$router.push({ name: 'messageCenter' }); // 消息中心
			} else if (e === '7') {
				this.$router.push({ name: 'accountSetting' }); // 账户设置
			} else if (e === '0') {
				this.$router.push({ name: 'console' }); // 控制台
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.index {
	display: flex;
	flex-flow: column nowrap;
	min-height: 100vh;
	overflow-x: hidden;
	// 导航栏
	.hd {
		padding: 10px 0;
		background-color: #2897ff;
		.logo {
			width: 100px;
		}
		::v-deep .el-avatar {
			margin: 0 40px 0 auto;
		}
		.setting {
			width: 20px;
			cursor: pointer;
			&:hover {
				opacity: 0.9;
			}
		}
	}
	// 主体
	.bd {
		flex: 1;
		padding: 20px 0;
		background-color: #f9f9f9;
		.aside-menu {
			width: 240px;
			border: 0 none;
			box-shadow: 0 0 5px #cccccc66;
		}
		.main {
			flex: 1;
			margin-left: 20px;
			min-height: 800px;
			background-color: #fff;
			box-shadow: 0 0 5px #cccccc66;
		}
	}
	// 底部
	.ft {
		padding: 4px 0;
		color: #fff;
		font-size: 14px;
		text-align: center;
		background-color: #333;
	}
}
</style>
