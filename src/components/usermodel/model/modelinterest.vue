<style lang="less" scoped>
	.table{
		width: 400px;
		margin: 0 20px;
		display: inline-block;			
		vertical-align: top;
		&>div{
			height: 500px;
			overflow: auto;
		}
	}
</style>
<template>
	<div class="fn-align-center">
		<!-- <div class="table">
			<header>当前模型</header>
			<div>
				<el-table :data="l_list0" stripe style="width:100%;">		
					<el-table-column type="index" width="60"></el-table-column>		    			   
					<el-table-column prop="label_name" label="name"></el-table-column>		
					<el-table-column prop="label_score" label="value"></el-table-column>		
			  	</el-table>
			</div>			
		</div> -->
		<div class="table">
			<header>近期模型</header>
			<div>
				<el-table :data="l_list1" stripe style="width:100%;">		
					<el-table-column label="序号" type="index" width="60"></el-table-column>		    			   
					<el-table-column prop="label_name" label="name"></el-table-column>		
					<el-table-column prop="label_score" label="value"></el-table-column>		
			  	</el-table>
			</div>
		</div>
		<div class="table">
			<header>长期模型</header>
			<div>
				<el-table :data="l_list2" stripe style="width:100%;">		
					<el-table-column label="序号" type="index" width="60"></el-table-column>		    			   
					<el-table-column prop="label_name" label="name"></el-table-column>		
					<el-table-column prop="label_score" label="value"></el-table-column>		
			  	</el-table>
			</div>
		</div>
	</div>
</template>
<script>
	import axios from "axios";
	import Event from "../../../common/event.js";
	export default{
		data(){
			return {
				l_list0:[],
				l_list1:[],
				l_list2:[]
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
				}else if(1){
					url = "/api/interest/model/device_id";
					params.device_id = filterData.key;
				}
				axios.get(url,{
					params:params
				}).then((ajaxData)=>{							
					that.l_list0 = ajaxData[0].interestLables;
					that.l_list1 = ajaxData[1].interestLables;
					that.l_list2 = ajaxData[2].interestLables;
				})
			},
			_init(filterData){				
				this._getCurrentModel(filterData);
			}
		}
	}
</script>