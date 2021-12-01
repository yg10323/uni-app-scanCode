<template>
	<form class='loginView' @submit="bindLogin">
		<view class="input-view">
			<view class="label-view">
				<text class="label">账号</text>
			</view>
			<input class="input" type="text" placeholder="请输入用户名/手机号" name="nameValue" />
		</view>
		<view class="input-view">
			<view class="label-view">
				<text class="label">密码</text>
			</view>
			<input class="input" password placeholder="请输入密码" name="passwordValue" />
		</view>
		<view class="button-view">
			<button type="primary" :loading="loading" class="login" formType="submit">登录</button>
		</view>
	</form>
</template>

<script>
	import {
		mapMutations
	} from 'vuex';

	export default {
		data() {
			return {
				loading: false
			}
		},
		methods: {
			bindLogin(e) {
				this.loading = true;
				let name = e.detail.value.nameValue,
					password = e.detail.value.passwordValue;
				// 发送登录请求
				uni.request({
					url: this.$config.req.baseURL + this.$config.api.login,
					data: {
						account: name,
						password: password,
						longKeep: true
					},
					method: "POST",
					success: (e) => {
						if (e.data.code !== 200) {
							uni.showModal({
								content: e.data.message,
								showCancel: false
							});
							return;
						} else {
							// 登录成功
							uni.showToast({
								title: e.data.message,
								success() {
									setTimeout(()=>{
										// 跳转到tabBar页面, 使用switchTab
										uni.switchTab({
											url: '/pages/profile/tabSelf',
										})
									},1000)
								}
							})
							// 改变vuex状态以及信息存储
							this.login(e.data)
						}
					},
					fail: (e) => {
						uni.showModal({
							content: "请求失败，请重试！",
							showCancel: false
						})
					},
					complete: () => {
						this.loading = false;
					}
				})
			},
			...mapMutations(['login'])
		}
	}
</script>

<style>
	view {
		display: flex;
	}

	.loginView {
		display: flex;
		flex: 1;
		flex-direction: column;
		width: 750upx;
		padding-top: 30upx;
	}

	.input-view {
		border-bottom-style: solid;
		border-bottom-width: 3upx;
		border-bottom-color: #ddd;
		background-color: #fff;
		flex-direction: row;
		width: 750upx;
		padding: 20upx 20upx;
		box-sizing: border-box;
	}

	.label-view {
		width: 100upx;
		height: 60upx;
		align-items: center;
		margin-right: 30upx;
	}

	.label {
		flex: 1;
		line-height: 60upx;
		font-size: 34upx;
		color: #555;
		text-align: left;
	}

	.input {
		flex: 1;
		height: 60upx;
		font-size: 34upx;
		align-items: center;
	}

	.button-view {
		width: 750upx;
		margin-top: 50upx;
		padding: 0 20upx;
		box-sizing: border-box;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	button {
		width: 710upx;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		font-size: 34upx;
		margin-bottom: 30upx;
	}

	button.register {
		margin-top: 30upx;
		color: #ff80ab;
		background-color: #fff;
		border-color: #ff80ab;
		border-width: 2upx;
	}

	/* .register.hover,
    .login.hover {
        opacity: 0.6;
    } */
	.getPassword {
		color: #888888;
	}
</style>
