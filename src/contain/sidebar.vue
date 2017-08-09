<style lang="less">
	.sidebar-wrapper{
		@bgcolor: #414146;
		background-color: @bgcolor;
		height: 100%;
		.el-submenu__title{
			color: #D9D7D7;
			&:hover{
				background: @bgcolor;
			}
		}
		.el-submenu{
			background-color: @bgcolor;			
			.el-menu-item{
				color: #D9D7D7;
				background-color: @bgcolor;
				height: 50px;
				line-height: 50px;
				border-left: 3px solid @bgcolor;
				&.is-active{
					background: #5C5C63;
					border-left: 3px solid #69B0E8;
				}
			}
		}		
	}
</style>
<template>
	<div class="sidebar-wrapper">
		<el-menu :default-active="m_menuActive" theme="light" router>			
			<el-submenu index="/a">
				<template slot="title">推荐效果查询</template>				
				<el-menu-item index="/usermodel/model/info">用户模型</el-menu-item>
				<el-menu-item index="/exportulog">用户日志导出</el-menu-item>
				<el-menu-item index="/visual">推荐流程可视化</el-menu-item>				
			</el-submenu>		
			<el-submenu index="/b">
				<template slot="title">实用工具</template>				
				<el-menu-item index="/videorecommend">视频推荐演示</el-menu-item>
				<el-menu-item index="/2">用户ID List</el-menu-item>				
			</el-submenu>					
		</el-menu>		
	</div>
</template>
<script>
	export default {
		data() {			
			return {
				m_menuActive:"/"
			}
		},
		created(){
			var hash = location.hash.replace("#","");
			if(hash.indexOf("/usermodel") !== -1){
				this.m_menuActive = "/usermodel/model/info";
			}else{
				this.m_menuActive = hash;
			}
		},
	}
</script>