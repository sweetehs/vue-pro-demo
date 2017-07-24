<style lang="less">
	.exportulog-inner{
		padding: 20px;
	}
</style>
<template>
	<div class="exportulog-wrapper">		
		<Filterm :filterData.sync="m_filter"></Filterm>			
		<div class="exportulog-inner">
			<div class="form-item">
				<span class="text">导出日志文件：</span>
				<div class="content">
					<label><input type="radio" name="type">&nbsp;NginxLogHbase</label>
					<label><input type="radio" name="type">&nbsp;EngineLogHbase</label>	
				</div>				
			</div>
			<div class="form-item">
				<span class="text">导出日期：</span>
				<div class="content">
					<el-date-picker
						v-model="searchDate"
						type="daterange"
						align="left"
						placeholder="选择日期范围"
						:picker-options="pickerOptions2">
					</el-date-picker>
				</div>				
			</div>
			<div class="form-item">
				<span class="text"></span>
				<div class="content"><el-button type="primary">导出日志</el-button></div>				
			</div>
		</div>
	</div>
</template>
<script>
	import Filter from "./filter.vue";
	export default {
		components: {
			"Filterm": Filter
		},
		data() {
			return {
				m_filter: {
					key: "",
					type: "0"
				},
				searchDate: "",
				pickerOptions2: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
			}
		}

	}
</script>
