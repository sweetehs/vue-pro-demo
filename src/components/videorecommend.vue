<style lang="less" scoped>
	.filter{
		height: 40px;
		line-height: 40px;
		padding: 15px;
		background-color: #F2F2F2;
		a{
			margin: 0 5px;
		}
	}
	.videorecommend-inner{
		padding: 15px;
	}
	.video-list{
		// max-width: 500px;
		li{			
			padding: 10px;
			border: 1px solid #E4E4E4;
			margin-bottom: -1px;
			&:hover{
				background-color: #F7FDFD;
			}
		}
		.el-button{
			margin-top: -10px;
		}
	}
	.el-table{
		margin-bottom: 10px;
	}
</style>
<template>	
	<div class="videorecommend-wrapper">
		<div class="filter">
			关联自己的客户端帐号：
			<span v-show="!m_isUpdate">{{m_passport}}</span>
			<el-input v-show="m_isUpdate" v-model="m_passportTemp" placeholder="请输入内容"></el-input>
			<div class="fn-iblock" v-show="!m_isUpdate">
				<a href="javascript:;" @click="f_toggleUpdate()">修改</a><a href="javascript:;">刷新</a>	
			</div>
			<div class="fn-iblock" v-show="m_isUpdate">
				<el-button @click="f_sureUpdate()" type="primary">确认</el-button>
				<el-button @click="()=>{this.m_isUpdate = false;}">取消</el-button>				
			</div>
		</div>
		<div class="videorecommend-inner">
			<el-row :gutter="10">
			  	<el-col :span="12">
					<div>
						<header>基本信息</header>
						<el-table stripe>										   
						    <el-table-column prop="title" label="性别"></el-table-column>
						    <el-table-column prop="vid" label="注册年龄"></el-table-column>						    
						    <el-table-column prop="video_click_num" label="常用登录" ></el-table-column>
						    <el-table-column prop="video_rec_num" label="最近一次会话推荐次数" ></el-table-column>
						    <el-table-column prop="sansu_score" label="收入" ></el-table-column>
						    <el-table-column prop="weights" label="学历" ></el-table-column>
						    <el-table-column prop="video_publish_time" label="手机类型" ></el-table-column>
					  	</el-table>
					  	<el-table stripe>										   
						    <el-table-column prop="title" label="模型更新时间"></el-table-column>
						    <el-table-column prop="vid" label="最后刷新时间"></el-table-column>						    
						    <el-table-column prop="video_click_num" label="用户类型" ></el-table-column>
						    <el-table-column prop="video_rec_num" label="组织/学校/公司" ></el-table-column>
						    <el-table-column prop="sansu_score" label="常用网络环境" ></el-table-column>
						    <el-table-column prop="weights" label="常用消费时段" ></el-table-column>						    
					  	</el-table>
					</div>
					<div>
						<header>用户勾选兴趣</header>
						<el-table stripe>										   
						    <el-table-column prop="title" label="兴趣"></el-table-column>
						    <el-table-column prop="vid" label="值"></el-table-column>						    	
					  	</el-table>
					</div>
					<el-row 	:gutter="10">
						<el-col :span="12">
							<header>当前模型</header>
							<el-table stripe>										   
							    <el-table-column prop="title" label="name"></el-table-column>
							    <el-table-column prop="vid" label="value"></el-table-column>						    	
							    <el-table-column prop="vid" label="操作"></el-table-column>	
						  	</el-table>
							</el-col>
						<el-col :span="12">
							<header>近期模型</header>
							<el-table stripe>										   
							    <el-table-column prop="title" label="name"></el-table-column>
							    <el-table-column prop="vid" label="value"></el-table-column>						    	
							    <el-table-column prop="vid" label="操作"></el-table-column>	
						  	</el-table>
						</el-col>
					</el-row>
			  	</el-col>
			  	<el-col :span="12">
			  		<div class="video-list">
			  			<header>
							已推荐以下{{l_rlist.length}}个视频
							<el-button class="fn-right" type="primary" @click="f_reRecommend()" >重新推荐</el-button>		
						</header>
						<ul>
							<li v-for="(item,index) in l_rlist">
								<Videoritem :videoData="item"></Videoritem>
							</li>
						</ul>
			  		</div>					
			  	</el-col>
			</el-row>
		</div>
	</div>
</template>
<script>
	import axios from "axios";	
	import Videoritem from './videoritem.vue';	
	export default{
		data(){
			return {
				m_passport:1231354,
				m_passportTemp:"",
				l_rlist:[],
				m_isUpdate:false
			}
		},
		created(){
			this._getRecommendVideo();
		},
		methods:{
			_getRecommendVideo(){
				var that = this;
				axios.get("/flow/video/recommendlist", {
					params: {
						passport: this.m_passport
					}
				}).then((ajaxData) => {					
					that.l_rlist = ajaxData;
				}).catch((error) => {
					
				})
			},
			f_reRecommend(){
				this._getRecommendVideo();
			},
			f_toggleUpdate(){
				this.m_isUpdate = !this.m_isUpdate;
				this.m_passportTemp = this.m_passport;
			},
			f_sureUpdate(){
				this.m_isUpdate = false;
				this.m_passport = this.m_passportTemp;
			}
		},
		components:{
			Videoritem:Videoritem
		}
	}
</script>