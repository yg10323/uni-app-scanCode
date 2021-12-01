<template>
	<view class="content">
		<view class="wrap">
			<view class="un-login" v-if="!isLogin">
				<text class="un-login-text">未登录, 请登录</text>
			</view>
			<view class="has-login" v-else>
				<text class="has-login-text">{{userInfo.message}}</text>
			</view>
			<button class="btn" type="warn" @click="handler">{{isLogin ? '退出登录' : '登录'}}</button>
			<image src="../../static/logo.gif" class="gif"></image>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex";
	export default {
		computed: mapState(['isLogin', 'userInfo']),
		data() {
			return {
				title: '首页'
			}
		},
		onLoad() {},
		methods: {
			...mapMutations(['logout']),
			handler() {
				// 点击登出
				if (this.isLogin) {
					uni.showModal({
						content: '是否确认登出?',
						showCancel: true,
						// 判断点击确定还是取消
						success: btnRes => {
							// 确定
							if (btnRes.confirm) {
								this.logout()
							} else if (btnRes.cancel) {
								return
							}
						}
					})
				} else {
					// 点击登录
					uni.navigateTo({
						url: '/pages/profile/login'
					})
				}
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.wrap {
		margin-top: 10%;
	}

	.un-login,
	.has-login {
		margin-bottom: 20px;
	}
	
	.gif{
		margin-top: 30px;
	}
</style>
