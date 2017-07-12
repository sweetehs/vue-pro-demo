<style lang="less">
	.filter{		
		display: inline-block;
		input[type=text]{
			margin: 0 10px;
		}
		label{
			margin-right: 10px;
		}
	}
</style>
<template>
	<div class="filter">
		<input type="text" v-model="filterData.key">
		<label><input type="radio" name="stype" value="0" v-model="filterData.type">用户帐号</label>
		<label><input type="radio" name="stype" value="1" v-model="filterData.type">加密帐号</label>
		<label><input type="radio" name="stype" value="2" v-model="filterData.type">设备号</label>
		<label><input type="radio" name="stype" value="3" v-model="filterData.type">加密设备号</label>		
	</div>
</template>
<script>	
	export default {
		props: ["filterData","changeFilter"],
		data() {
			return {
				
			}
		},
		watch: {
			key() {
				this.$emit("changeFilter", {
					key: this.key,
					type: this.type
				})
			},
			type() {
				this.$emit("changeFilter", {
					key: this.key,
					type: this.type
				})
			}
		}
	}
</script>