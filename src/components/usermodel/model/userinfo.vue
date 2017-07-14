<template>
	<div>userinfo</div>
</template>
<script>
	import Event from "../../../common/event.js";
	export default{
		created(){
			Event.$on("usermodel.init",(filterData)=>{
				debugger
			})
		}
	}
</script>