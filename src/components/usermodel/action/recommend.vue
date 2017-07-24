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
	.status{
		display: inline-block;
		padding: 5px;			
		text-align: center;
		line-height: 1;
		&.e{
			background: #F9F2F4;
			color: #DE8198;
			border-radius: 4px;
		}
	}
	.tie{
		position: relative;					
		&:hover{			
			ul{
				height: 30px * 3;
				visibility: visible;
			}
		}
		ul{			
			height: 0;
			position: absolute;
			background: #FFFFFF;
			width: 100%;			
			border: 1px solid #E4E4E4;	
		    top: 40px;
			left: -1px;			
			transition: all 0.2s ease-out;	
			overflow: hidden;
			visibility: hidden;
		}
		li{
			height: 30px;
			line-height: 30px;
			&.active{
				background: #20A0FF;
				color: #000;
			}
			&:hover{
				background: #20A0FF;
				color: #fff;	
			}
		}
	}
</style>
<template>
	<div>
		<table class="type1">
			<thead>
				<th>推送时间：xxxx-xx-xx xx:xx:xx</th>
				<th>视频VID</th>
				<th><a href="javascript:;">点击<i class="san"></i></a></th>
				<th><a href="javascript:;">分享<i class="san"></i></a></th>
				<th><a href="javascript:;">收藏<i class="san"></i></a></th>
				<th class="tie">
					<a href="javascript:;">跟贴<i class="san"></i>
						<ul>
							<li v-for="(item,index) in l_tie">{{item.name}}</li>
						</ul>
					</a>
				</th>
				<th><a href="javascript:;">不感兴趣<i class="san"></i></a></th>
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
					<td>VQMJMSJIH</td>
					<td><span class="status">未点击</span></td>
					<td><span class="status">未分享</span></td>
					<td><span class="status">未收藏</span></td>
					<td><span class="status">未跟贴</span></td>
					<td><span class="status">未不感兴趣</span></td>
				</tr>
				<tr>
					<td class="info">
						<div class="img">
							<span class="time">03:20</span>
						</div>
						<div class="title">
							这是一个标题这是一个标题这是一个标题这是一个标题
						</div>
					</td>
					<td>VQMJMSJIH</td>
					<td><span class="status e">未点击</span></td>
					<td><span class="status e">未分享</span></td>
					<td><span class="status e">未收藏</span></td>
					<td><span class="status e">未跟贴</span></td>
					<td><span class="status e">未不感兴趣</span></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				l_tie:[{
					name:"全部"
				},{
					name:"已跟帖"
				},{
					name:"未跟帖"
				}]
			}
		},
		methods: {
			
		}
	}
</script>