<template>
	<div class="login">
		<div class="login-box">
			<div class="title">商家登录</div>
			<el-form :model="login" ref="loginForm">
				<div class="d-flex">
					<i class="el-icon-user"></i>
					<el-form-item prop="account" label=""><el-input v-model="login.account" auto-complete="off" placeholder="请输入账号"></el-input></el-form-item>
				</div>
				<div class="d-flex">
					<i class="el-icon-user"></i>
					<el-form-item prop="password" label=""><el-input v-model="login.password" auto-complete="off" placeholder="请输入密码"></el-input></el-form-item>
				</div>
				<div class="d-flex">
					<i class="el-icon-user"></i>
					<el-form-item prop="valCode" label=""><el-input v-model="login.valCode" auto-complete="off" placeholder="请输入验证码"></el-input></el-form-item>
					<img :src="valCodeImg" @click="acquireValCodeImg">
				</div>
				<div>商家登录</div>
			</el-form>
		</div>
	</div>
</template>

<script>
	import {fetchValCodeImg} from '@/api/user.js';
	import {getUUID} from '@/utils/utils.js';
	export default {
		name:'Login',
		data(){
			return{
				login:{
					account:null,
					password:null,
					valCode:null
				},
				valCodeImg:null
			}
		},
		methods:{
			// 获取验证码图片
			acquireValCodeImg(){
				let uuid = getUUID();
				fetchValCodeImg(uuid).then(res => {
					this.valCodeImg = `data:image/jpeg;base64,${res}`;
				}).catch(() => {});
			}
		},
		mounted() {
			this.acquireValCodeImg();// 获取验证码图片
		}
	}
</script>

<style lang="scss" scoped>
.login{
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background-image: url(~@/assets/images/background-image-1.jpg);
	background-repeat: no-repeat;
	background-size: cover;
	.login-box{
		padding: 80px 50px 100px;
		color: #fff;
		background-color: #0000004d;
		border-radius: 5px;
		.title{
			margin-bottom: 30px;
			font-size: 30px;
			text-align: center;
		}
	}
}
</style>