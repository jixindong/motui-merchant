<template>
	<div class="login">
		<div class="login-box">
			<div class="title">商家登录</div>
			<el-form :model="login" :rules="loginFormRules" ref="loginForm" class="d-flex flex-column align-items-start">
				<div class="d-flex align-items-center">
					<i class="el-icon-user mr-2"></i>
					<el-form-item prop="account" label=""><el-input v-model="login.account" auto-complete="off" placeholder="请输入账号" clearable></el-input></el-form-item>
				</div>
				<div class="d-flex align-items-center">
					<i class="el-icon-lock mr-2"></i>
					<el-form-item prop="password" label="">
						<el-input type="password" v-model="login.password" auto-complete="off" placeholder="请输入密码" clearable></el-input>
					</el-form-item>
				</div>
				<div class="d-flex align-items-center">
					<i class="el-icon-link mr-2"></i>
					<el-form-item prop="valCode" label=""><el-input v-model="login.valCode" auto-complete="off" placeholder="请输入验证码" clearable></el-input></el-form-item>
				</div>
				<img :src="valCodeImg" @click="acquireValCodeImg" class="valCodeImg" />
				<div class="login-btn" @click="merchantLogin">商家登录</div>
			</el-form>
		</div>
	</div>
</template>

<script>
import { requestLogin } from '@/api/user';

export default {
	name: 'Login',
	data() {
		return {
			// 登录信息
			login: {
				account: null,
				password: null,
				valCode: null
			},
			uuid: null, // uuid
			valCodeImg: null, // 图片验证码
			// 登录表单验证
			loginFormRules: {
				account: [
					{
						required: true,
						message: '请输入账号',
						trigger: 'blur'
					}
				],
				password: [
					{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}
				],
				valCode: [
					{
						required: true,
						message: '请输入验证码',
						trigger: 'blur'
					}
				]
			}
		};
	},
	methods: {
		// 获取UUID
		getUUID() {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, e => {
				return (e === 'x' ? (Math.random() * 16) | 0 : 'r&0x3' | '0x8').toString(16);
			});
		},
		// 获取验证码图片
		acquireValCodeImg() {
			let uuid = this.getUUID();
			this.uuid = uuid;
			this.valCodeImg = `http://mtht.waszn.com:8001/captcha.jpg?uuid=${uuid}`;
		},
		// 登录
		merchantLogin() {
			this.$refs['loginForm'].validate(valid => {
				if (!valid) {
					return false;
				}

				let loginObj = {
					phone: this.login.account,
					password: this.login.password,
					captcha: this.login.valCode,
					uuid: this.uuid,
					type: 'sh'
				};
				requestLogin(loginObj)
					.then(res => {
						if (res.code === 200) {
							localStorage.setItem('token', res.token);
							this.$message.success('登陆成功');
							this.$router.push({ name: 'index' });
						} else {
							this.$message.warning(res.msg);
							this.acquireValCodeImg(); // 获取验证码图片
						}
					})
					.catch(() => {});
			});
		}
	},
	mounted() {
		this.acquireValCodeImg(); // 获取验证码图片
	}
};
</script>

<style lang="scss" scoped>
.login {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	background-image: url(~@/assets/images/background-image-1.jpg);
	background-repeat: no-repeat;
	background-size: cover;
	.login-box {
		padding: 50px 80px;
		color: #fff;
		background-color: #00000066;
		border-radius: 5px;
		.title {
			margin-bottom: 30px;
			font-size: 30px;
			text-align: center;
		}
		::v-deep .el-input__inner {
			color: #fff;
			background-color: transparent;
			border: 0 none;
			border-bottom: 1px solid #fff;
			border-radius: 0;
			&:focus {
				border-color: #409eff;
			}
		}
		.valCodeImg {
			margin-left: 24px;
			width: 100px;
			height: 25px;
		}
		.login-btn {
			margin: 30px auto 0;
			padding: 8px 40px;
			letter-spacing: 2px;
			background-image: linear-gradient(90deg, #fbc2eb 0%, #a6c1ee 100%);
			border-radius: 20px;
			cursor: pointer;
			&:hover {
				opacity: 0.9;
			}
		}
	}
}
</style>
