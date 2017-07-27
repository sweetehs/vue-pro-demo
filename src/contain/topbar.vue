<style lang="less">
	@import "../assets/less/var.less";
	.topbar-wrapper{
		background-color: #00CDB1;
		height: 100%;
		color: #fff;
		padding: 0 20px;
		box-sizing: border-box;
		.logo{
			height: 100%;			
			font-size: 18px;			
			line-height: @topHeight;		
			display: inline-block;
		}
		.action{
			float: right;
			height: 100%;
			line-height: @topHeight;
		}
		a{
			color: #fff;
		}
	}
</style>
<template>
	<div class="topbar-wrapper">
		<div class="logo">短视频推荐后台</div>
		<div class="action">
			<a href="javascript:;">{{userName}}</a>&nbsp;|&nbsp;<a href="javascript:;">退出</a>
		</div>		
	</div>
</template>
<script>	
	export default{		
		computed: {
			userName(){
				return this.$store.state.user.userName
			}
		}
	}
</script>