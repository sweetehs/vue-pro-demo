<style lang="less" scoped>
	.table{
		width: 300px;
		margin: 0 20px;
		display: inline-block;
	}
</style>
<template>
	<div class="fn-align-center">
		<div class="table">
			<header>当前模型</header>
			<el-table :data="l_list" stripe style="width:100%;">		
				<el-table-column type="index" width="60"></el-table-column>		    			   
				<el-table-column prop="label_name" label="name"></el-table-column>		
				<el-table-column prop="label_score" label="value"></el-table-column>		
		  	</el-table>
		</div>
		<div class="table">
			<header>近期模型</header>
			<el-table :data="l_list" stripe style="width:100%;">		
				<el-table-column type="index" width="60"></el-table-column>		    			   
				<el-table-column prop="label_name" label="name"></el-table-column>		
				<el-table-column prop="label_score" label="value"></el-table-column>		
		  	</el-table>
		</div>
		<div class="table">
			<header>长期模型</header>
			<el-table :data="l_list" stripe style="width:100%;">		
				<el-table-column type="index" width="60"></el-table-column>		    			   
				<el-table-column prop="label_name" label="name"></el-table-column>		
				<el-table-column prop="label_score" label="value"></el-table-column>		
		  	</el-table>
		</div>
	</div>
</template>
<script>
	import axios from "axios";
	import Event from "../../../common/event.js";
	export default{
		data(){
			return {
				l_list:[]
			}
		},
		created(){			
			var that = this;						
			Event.$on("usermodel.init",(filterData)=>{
				that._init(filterData);
			})
		},		
		methods:{
			_getCurrentModel(filterData){			
				var that = this,url = "",params = {};
				if(filterData.type == 0){
					url = "/api/interest/model/uid";
					params.uid = filterData.key;
				}
				axios.get(url,{
					params:params
				}).then((ajaxData)=>{
					that.l_list = ajaxData;
				})
			},
			_init(filterData){				
				this._getCurrentModel(filterData);
			}
		}
	}
</script>