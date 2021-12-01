<template>
	<view class="self">
		<view class="default-info" v-if="!isLogin">
			<text>这里显示用户 未登录时 的一些东西</text>
		</view>
		<view class="login-info" v-else>
			<text>{{userInfo}}</text>
			<button class="scan-code" type="primary" @click="scanCode">扫码登录</button>
		</view>
	</view>
	

</template>

<script>
	import { mapState } from 'vuex'
	export default {
		computed: mapState(['isLogin', 'userInfo']),
		data(){
			return {
				src:"",
				qrInfo:{},
				data:uni.getStorageSync('userInfo')
			}
		},
		methods:{
			// 扫码并弹窗询问是否登录
			scanCode(){
				uni.scanCode({
					success : scanRes => {
						// 扫码后会得到web端的socket_id和二维码对应的qid
						// socket_id用于扫码并点击确定后发送给服务器查询该二维码是否过期
						this.sendDeviceId(this.getDeviceId())
						// type: string
						this.qrInfo = scanRes.result;
						uni.showModal({
							title: '是否确认登?',
							content: '如非是您本人操作, 请取消本次请求',
							showCancel: true,
							// 判断点击确定还是取消
							success: btnRes => {
								// 确定
								if(btnRes.confirm){
									this.makeLogin()
								}else if(btnRes.cancel){
									return
								}
							}
						})
					}
				})
			},
			
			// 获取设备id
			getDeviceId(){
				let deviceId;
				uni.getSystemInfo({
					success: res => deviceId= res.deviceId
				})
				
				return deviceId
			},
			
			// 将deviceId发送给服务器
			sendDeviceId(deviceId){
				uni.request({
					url: this.$config.req.baseURL + this.$config.api.sendDeviceId,
					data: { deviceId },
					method: "POST",
				})
			},
		
			// 点击确认 => 发送网络请求
			makeLogin(){
				uni.request({
					url: this.$config.req.baseURL + this.$config.api.scanLogin,
					data: {
						qrinfo: JSON.parse(this.qrInfo),
						token: uni.getStorageSync('userInfo').token,
						deviceId: this.getDeviceId()
					},
					method: "POST",
				})
			}
	},
}
</script>

<style>
	.scan-code{
		width: 100px;
	}
</style>
