<template>
	<div class="index">
		<!-- 导航栏 -->
		<div class="hd">
			<div class="container d-flex align-items-center">
				<img src="@/assets/images/logo-1.png" class="logo" onclick="window.open('http://motui.waszn.com/')" />
				<el-avatar :src="baseMsg.avatar" v-if="baseMsg && baseMsg.avatar"></el-avatar>
				<el-avatar :src="require('@/assets/images/avatar.png')" v-else></el-avatar>
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
				<el-menu :default-active="$route.path" class="aside-menu" router>
					<el-menu-item index="/console">
						<i class="el-icon-receiving"></i>
						<span slot="title">控制台</span>
					</el-menu-item>

					<el-menu-item index="/commodity-manage">
						<i class="el-icon-present"></i>
						<span slot="title">宝贝管理</span>
					</el-menu-item>

					<el-submenu index="/shootVideo">
						<template slot="title">
							<i class="el-icon-video-camera-solid"></i>
							<span>拍摄视频</span>
						</template>
						<el-menu-item-group><el-menu-item index="/video-mission-manage">任务管理</el-menu-item></el-menu-item-group>
					</el-submenu>

					<el-submenu index="/videoPromote">
						<template slot="title">
							<i class="el-icon-position"></i>
							<span>拍摄推广</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="/promote-mission-manage">任务管理</el-menu-item>
							<el-menu-item index="/promote-list">推广列表</el-menu-item>
						</el-menu-item-group>
					</el-submenu>

					<el-submenu index="/dataCenter">
						<template slot="title">
							<i class="el-icon-s-data"></i>
							<span>数据中心</span>
						</template>
						<el-menu-item-group><el-menu-item index="/order-list">订单列表</el-menu-item></el-menu-item-group>
					</el-submenu>

					<el-submenu index="/setmealCharge">
						<template slot="title">
							<i class="el-icon-money"></i>
							<span>套餐充值</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="/setmeal-open">套餐开通</el-menu-item>
							<el-menu-item index="/open-record">开通记录</el-menu-item>
						</el-menu-item-group>
					</el-submenu>

					<el-menu-item index="/message-center">
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
		<el-dialog title="修改密码" width="660px" :visible.sync="modifyPasswordDV" :before-close="cPDClose">
			<el-form :model="iPassword" :rules="passwordRules" ref="passwordRef" label-width="100px" size="medium" status-icon>
				<el-form-item label="原密码" prop="iOPassword" required>
					<el-input type="password" placeholder="请输入原密码" v-model="iPassword.iOPassword"></el-input>
				</el-form-item>
				<el-form-item label="新密码" prop="iNPassword" required>
					<el-input type="password" placeholder="请输入新密码" v-model="iPassword.iNPassword"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="iCNPassword" required>
					<el-input type="password" placeholder="请再次输入新密码" v-model="iPassword.iCNPassword"></el-input>
				</el-form-item>
				<div class="d-flex justify-content-center mt-2">
					<el-button type="primary" size="medium" @click="submitPF">确认修改</el-button>
					<el-button size="medium" @click="resetPF">重置</el-button>
				</div>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import * as merch from '@/api/user';
import { fetchCommodityClassify } from '@/api/commodity';
import { fetchExpressCompany } from '@/api/shootVideo';

export default {
	name: 'index',
	data() {
		// 新密码 用户输入 校验规则
		let vNP = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入新密码'));
			} else if (value.length < 6 || value.length > 16) {
				callback(new Error('密码长度应为6到16位'));
			} else {
				callback();
			}
		};
		// 确认密码 用户输入 校验规则
		let vCNP = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入新密码'));
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
				// 原密码
				iOPassword: [{ required: true, message: '请输入原密码', trigger: ['blur', 'change'] }],
				// 新密码
				iNPassword: [{ required: true, message: '请输入新密码', trigger: ['blur', 'change'] }, { validator: vNP, trigger: 'blur' }],
				// 确认密码
				iCNPassword: [{ required: true, message: '请再次输入新密码', trigger: ['blur', 'change'] }, { validator: vCNP, trigger: 'blur' }]
			}
		};
	},
	computed: {
		// 商家基本信息
		baseMsg() {
			return this.$store.state.baseMsg;
		}
	},
	methods: {
		// 获取基本信息
		getBaseMsg() {
			merch
				.fetchMerchBaseMsg({ id: '' })
				.then(res => {
					if (res.code === 200) {
						this.$store.commit('handleBaseMsg', res.detail);
					} else {
						this.$message.warning(res.msg);
					}
				})
				.catch(() => {});
		},
		// 获取商品分类
		getCommodityClassify() {
			fetchCommodityClassify()
				.then(res => {
					if (res.code === 200) {
						this.$store.commit('handleCommodityClassify', res.list);
					} else {
						this.$message.warning(res.msg);
					}
				})
				.catch(() => {});
		},
		// 获取快递公司列表
		getExpressCompany() {
			fetchExpressCompany()
				.then(res => {
					if (res.code === 200) {
						this.$store.commit('handleExpressCompany', res.list);
					} else {
						this.$message.warning(res.msg);
					}
				})
				.catch(() => {});
		},
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
		// 修改密码对话框 确认修改
		submitPF() {
			this.$refs.passwordRef.validate(valid => {
				if (valid) {
					let data = {
						password: this.iPassword.iOPassword,
						newPassword: this.iPassword.iNPassword
					};
					merch
						.handlePassword(data)
						.then(res => {
							if (res.code === 200) {
								localStorage.removeItem('token');
								this.modifyPasswordDV = false; // 修改密码对话框 隐藏
								this.$message.success('修改密码成功，请重新登录');
								this.$router.push({ name: 'login' });
							} else {
								this.$message.warning(res.msg);
							}
						})
						.catch(() => {});
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
	},
	created() {
		this.getBaseMsg(); // 获取基本信息
		this.getCommodityClassify(); // 获取商品分类
		this.getExpressCompany(); // 获取快递公司列表
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
			cursor: pointer;
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
			min-height: 800px;
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
