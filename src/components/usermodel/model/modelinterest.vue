<template>
	<div>usermodelonline</div>
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
			_init(){				
				// alert("modelinterest");
			}
		}
	}
</script>