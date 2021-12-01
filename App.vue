<script>
	export default {
		data(){
			return {
				storage: uni.getStorageSync('userInfo') || null
			}
		},
		onLaunch: function() {
			console.log('App Launch');
			// uni.showModal({
			// 	content: JSON.stringify(this.storage)
			// })
			if(this.storage){
				this.$store.commit('login',this.storage)
			}
		},
		onShow: function() {
			console.log('App Show')

		},
		onHide: function() {
			console.log('App Hide')
		},
		
	}
</script>

<style>
	/*每个页面公共css */
</style>
