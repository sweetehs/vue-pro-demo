<style>
	table{
		text-align: center;
	}
</style>
<template>
	<div>
		<div class="table">
			<el-table :data="l_list" stripe style="width:100%;">		
				<el-table-column label="序号" type="index" width="60"></el-table-column>		    			   
				<el-table-column prop="uid" label="neighborUseKey"></el-table-column>		
				<el-table-column prop="score" label="score"></el-table-column>		
		  	</el-table>
		</div>
	</div>
</template>
<script>
	import axios from "axios";
	import Event from "../../../common/event.js";
	export default{
		created(){			
			var that = this;			
			Event.$on("usermodel.init",(filterData)=>{
				that._init(filterData);
			})
		},
		data(){
			return {
				l_list:[]
			}
		},
		methods:{			
			_getList(filterData){			
				var that = this,url = "",params = {};
				if(filterData.type == 0){
					url = "/api/similar/user/uid";
					params.uid = filterData.key;
				}else{
					url = "/api/similar/user/device_id";
					params.device_id = filterData.key;
				}
				axios.get(url,{
					params:params
				}).then((ajaxData)=>{
					that.l_list = ajaxData;
				})
			},
			_init(filterData){								
				this._getList(filterData);
			}
		}
	}
</script>