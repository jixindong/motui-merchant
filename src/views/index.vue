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
						<el-dropdown-item command="0">账户信息</el-dropdown-item>
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
					<el-menu-item index="0">
						<i class="el-icon-receiving"></i>
						<span slot="title">控制台</span>
					</el-menu-item>

					<el-menu-item index="1">
						<i class="el-icon-present"></i>
						<span slot="title">宝贝管理</span>
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
				</el-menu>

				<div class="main"><router-view /></div>
			</div>
		</div>

		<!-- 底部 -->
		<div class="ft">© 2018-2020 山东瓦艾斯科技 All rights reserved.</div>

		<!-- 修改密码对话框 -->
		<el-dialog title="修改密码" width="1000px" :visible.sync="modifyPasswordDV" :before-close="cPDClose">
			<el-form :model="iPassword" :rules="passwordRules" ref="passwordRef" label-width="100px" status-icon>
				<el-form-item label="原密码" prop="iOPassword" required>
					<el-input type="password" placeholder="请输入原密码" v-model="iPassword.iOPassword"></el-input>
				</el-form-item>
				<el-form-item label="新密码" prop="iNPassword" required>
					<el-input type="password" placeholder="请输入新密码" v-model="iPassword.iNPassword"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="iCNPassword" required>
					<el-input type="password" placeholder="请输入确认密码" v-model="iPassword.iCNPassword"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="medium" @click="submitPF">确认修改</el-button>
					<el-button size="medium" @click="resetPF">重置</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: 'index',
	data() {
		// 原密码 用户输入 校验规则
		let vOP = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入原密码'));
			} else if (value != this.oPassword) {
				callback(new Error('原密码错误'));
			} else {
				callback();
			}
		};
		// 新密码 用户输入 校验规则
		let vNP = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入新密码'));
			} else if (value.length < 6 || value.length > 16) {
				callback(new Error('密码长度应为6到16位'));
			} else if (value == this.oPassword) {
				callback(new Error('新旧密码不能一样'));
			} else {
				callback();
			}
		};
		// 确认密码 用户输入 校验规则
		let vCNP = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入确认密码'));
			} else if (value != this.iPassword.iNPassword) {
				callback(new Error('两次输入不一致'));
			} else {
				callback();
			}
		};
		return {
			modifyPasswordDV: false, // 修改密码对话框 显示隐藏
			oPassword: '123456', // 原密码
			// 密码 用户输入
			iPassword: {
				iOPassword: '', // 原密码
				iNPassword: '', // 新密码
				iCNPassword: '' // 确认密码
			},
			// 密码校验规则
			passwordRules: {
				iOPassword: [{ required: true, message: '请输入原密码', trigger: 'change' }, { validator: vOP, trigger: 'blur' }], // 原密码
				iNPassword: [{ required: true, message: '请输入新密码', trigger: 'change' }, { validator: vNP, trigger: 'blur' }], // 新密码
				iCNPassword: [{ required: true, message: '请输入确认密码', trigger: 'change' }, { validator: vCNP, trigger: 'blur' }] // 确认密码
			}
		};
	},
	methods: {
		// 设置
		setting(e) {
			if (e === '0') {
				this.$router.push({ name: 'accountSetting' }); // 账户信息
			} else if (e === '1') {
				this.modifyPasswordDV = true; // 修改密码对话框 显示
			} else if (e === '2') {
				// 退出登录
				this.$confirm('确认退出？', '退出登录', {
					confirmButtonText: '退出',
					cancelButtonText: '取消',
					type: 'info'
				})
					.then(() => {
						this.$message.success('退出成功');
						this.$router.push({ name: 'login' });
						localStorage.removeItem('token');
					})
					.catch(() => {
						this.$message.info('操作已取消');
					});
			}
		},
		// 侧边栏菜单激活回调
		asideMenuSelect(e) {
			if (e === '1') {
				this.$router.push({ name: 'commodityManage' }); // 宝贝管理
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
			} else if (e === '0') {
				this.$router.push({ name: 'console' }); // 控制台
			}
		},
		// 修改密码对话框 确认修改
		submitPF() {
			this.$refs.passwordRef.validate(valid => {
				if (valid) {
					this.modifyPasswordDV = false; // 修改密码对话框 隐藏
					this.$message.success('修改密码成功，请重新登录');
					this.$router.push({ name: 'login' });
					localStorage.removeItem('token');
				} else {
					this.$message.warning('修改密码失败');
				}
			});
		},
		// 修改密码对话框 重置
		resetPF() {
			this.$refs['passwordRef'].resetFields();
			this.$message.success('输入信息已重置');
		},
		// 修改密码对话框 关闭
		cPDClose(done) {
			this.$confirm('确认关闭？', '提示', {
				confirmButtonText: '关闭',
				cancelButtonText: '取消',
				type: 'info'
			})
				.then(() => {
					this.$refs['passwordRef'].resetFields();
					done();
				})
				.catch(() => {});
		}
	}
};
</script>

<style lang="scss" scoped>
.index {
	display: flex;
	flex-flow: column nowrap;
	height: 100vh;
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
		overflow-y: auto;
		.aside-menu {
			width: 240px;
			border: 0 none;
			box-shadow: 0 0 5px #cccccc66;
		}
		.main {
			flex: 1;
			margin-left: 20px;
			padding: 20px;
			min-height: 800px;
			background-color: #fff;
			box-shadow: 0 0 5px #cccccc66;
		}
	}
	// 底部
	.ft {
		padding: 5px 0;
		color: #fff;
		font-size: 14px;
		text-align: center;
		background-color: #333;
	}
}
</style>
