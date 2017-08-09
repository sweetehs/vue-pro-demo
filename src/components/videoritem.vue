<style lang="less" scoped>
	.video-item{
		text-align: left;
		height: 90px;
		display: flex;		
		.img{			
			width: 160px;
			height: 100%;
			background: #F2F2F2;
			position: relative;
			margin-right: 10px;
			.time{
				width: 60px;
				height: 22px;
				line-height: 22px;
				text-align: center;
				position: absolute;
				bottom: 0;
				right: 0;
				font-size: 12px;
				background: #595959;
				color: #fff;
				opacity: 0.9;
			}
			img{
				width: 100%;
				height: 100%;
			}
			.btn-play{
				@color :#eee;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%,-50%);
				border: 2px solid @color;
				height: 40px;
				width: 40px;
				line-height: 30px;
				border-radius: 30px;
				text-align: center;
				opacity: 0.6;
				transition: opacity 0.3s ease;
				&:hover{
					opacity: 1;
				}
				i{
					display: inline-block;
					color: @color;
					font-size: 22px;
				    margin-top: 9px;
    				margin-left: 4px;
				}
			}			
		}
		.info{		
			flex: 1;				
			height: 100%;
			position: relative;
			.title{
				vertical-align: top;				
				margin-left: 5px;
			}			
			.else{
				font-size: 12px;	
				color: #999999;
				position: absolute;
				bottom: 0;
				width: 100%;								
			}
			.type{
				float: right;
				margin-right: 10px;		
				padding: 0 2px;
				color: rgba(213, 101, 129, 0.8);
				background-color: rgba(249, 242, 244, 1);					
			}
			.tie{
				float: right;				
			}
		}
	}	
</style>
<template>
	<div class="video-item">
		<div class="img">
			<img :src="this.videoData.cover">
			<span class="time" v-timelong>{{this.videoData.length}}</span>
			<a target="_blank" :href="this.videoData.mp4_url" class="btn-play">
				<i class="el-icon-caret-right"></i>	
			</a>			
		</div>
		<div class="info">
			<div class="title">{{this.videoData.title}}</div>			
			<div class="else">
				<span class="ptime">{{this.videoData.ptime}}</span>
				<span class="tie">{{this.videoData.replyCount}}跟帖</span>
				<span class="type">{{this.videoData.videosource}}</span>			
			</div>
		</div>
	</div>	
</template>
<script>	
	export default{
		data(){
			return {}
		},
		props:["videoData"],
		methods:{

		}
	}
</script>