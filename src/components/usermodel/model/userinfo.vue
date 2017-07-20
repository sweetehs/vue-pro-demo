<style lang="less" scoped>
	
</style>
<template>
	<div>
		<header>基本信息</header>
		<el-table :data="l_info" stripe style="width: 100%">				    
		    <el-table-column prop="date" label="性别" ></el-table-column>
		    <el-table-column prop="date" label="注册年龄" ></el-table-column>
		    <el-table-column prop="date" label="常用登录"></el-table-column>
		    <el-table-column prop="date" label="用户选择的位置" ></el-table-column>
		    <el-table-column prop="date" label="最近一次会话推荐次数" ></el-table-column>
		    <el-table-column prop="date" label="收入" ></el-table-column>
		    <el-table-column prop="item" label="学历" ></el-table-column>
		    <el-table-column prop="date" label="手机类型" ></el-table-column>
		    <el-table-column prop="date" label="模型更新时间" ></el-table-column>
		    <el-table-column prop="date" label="最后刷新时间" ></el-table-column>
		    <el-table-column prop="item" label="用户类型" ></el-table-column>
		    <el-table-column prop="item" label="组织/学校/公司" ></el-table-column>
		    <el-table-column prop="item" label="常用网络环境" ></el-table-column>
		    <el-table-column prop="item" label="常用消费时段" ></el-table-column>
	  	</el-table>
	  	<header>用户勾选兴趣</header>
	  	<el-table :data="l_device" stripe style="width: 100%">				    
		    <el-table-column prop="date" label="设备号" ></el-table-column>
		    <el-table-column prop="date" label="机型" ></el-table-column>
		    <el-table-column prop="date" label="时间"></el-table-column>		    
	  	</el-table>
	  	<header>设备信息</header>
	  	<el-table :data="l_interest" stripe style="width: 100%">				    
		    <el-table-column prop="date" label="兴趣" ></el-table-column>
		    <el-table-column prop="date" label="值" ></el-table-column>		    	   
	  	</el-table>
	</div>
</template>
<script>
	import Event from "../../../common/event.js";
	export default{
		created(){			
			var that = this;
			that._init();
			Event.$on("usermodel.init",(filterData)=>{
				that._init();
			})
		},
		methods:{
			_getUserInfo(){
				var temp = [{
					date: "aaa",
					item: "bbb"
				}];
				this.l_info = temp;
				this.l_device = temp;
				this.l_interest = temp;
			},
			_init(){								
				this._getUserInfo();
			}
		}
	}
</script>