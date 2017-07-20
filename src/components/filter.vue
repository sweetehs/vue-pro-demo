<style lang="less" scoped>
	.filter-wrapper{
		background-color: #F2F2F2;
		padding: 15px;
		display: flex;
		align-items: center;
		height: 40px;
		input[type=text]{
			margin: 0 10px;
		}
		label{
			margin-right: 10px;
		}
	}
</style>
<template>
	<div class="filter-wrapper">
		<input type="text" v-model="filterData.key">
		<label><input type="radio" name="stype" value="0" v-model="filterData.type">用户帐号</label>		
		<label><input type="radio" name="stype" value="1" v-model="filterData.type">设备号</label>		
		<slot></slot>
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