<style lang="less" scoped>
	.info{
		text-align: left;
		.img{
			display: inline-block;
			width: 160px;
			height: 90px;
			background: #F2F2F2;
			position: relative;
			.time{
				width: 46px;
				height: 22px;
				line-height: 22px;
				text-align: center;
				position: absolute;
				bottom: 0;
				right: 0;
				font-size: 12px;
				background: #595959;
				color: #fff;
			}
		}
		.title{
			display: inline-block;
			vertical-align: top;
			width: 200px;
			margin-left: 5px;
		}
	}	
</style>
<template>
	<div>
		<table class="type1">
			<thead>
				<th>视频</th>
				<th>观看时间</th>
				<th>观看时长（秒）</th>
				<th>观看完成度</th>				
			</thead>
			<tbody>
				<tr>
					<td class="info">
						<div class="img">
							<span class="time">03:20</span>
						</div>
						<div class="title">
							这是一个标题这是一个标题这是一个标题这是一个标题
						</div>
					</td>
					<td>2017-06-29  12:35:27</td>
					<td><span class="status">123</span></td>
					<td><span class="status">35%</span></td>					
				</tr>				
			</tbody>
		</table>
	</div>
</template>