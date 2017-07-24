<style lang="less">
	.visual-wrapper{				
		.visual-inner{
			padding: 20px;
			// min-width: 1400px;
		}		
		.step{			
			margin-bottom: 15px;
			.step-item{				
				@color: #22ACDB;				
				position: relative;
				display: inline-block;
				&:hover{
					cursor: pointer;
				}
				span{
					display: inline-block;
					vertical-align: top;
					width: 120px;
					height: 60px;
					line-height: 60px;
					background: @color;
					text-align: center;
					color: #eee;				
				}
				i{
					display: inline-block;
					width: 0;
					height: 0;
					border-style: solid;
				}
				em{
					display: inline-block;
					height: 15px;
					line-height: 15px;
					width: 15px;
					border: 1px solid #fff;
					border-radius: 15px;
					margin-right: 5px;
				}
				i.ir{					
					border-width: 30px 0 30px 30px;
					border-color: transparent transparent transparent @color;					
				}
				i.it{
					border-width: 0 30px 30px 0;
					border-color: transparent @color transparent transparent;
					position: absolute;
					left: 0;
				}
				i.ib{
					border-width: 0 0 30px 30px;
					border-color: transparent transparent @color transparent;
					position: absolute;
					left: 0;
					top: 30px;
				}
				&.middle{
					padding-left: 30px;
					margin-left: -30px;
					span{
						width: 100px;
					}
				}
				&.active{
					@color: #026DA1;
					span{
						background: @color;
						color: #fff;
					}
					i.ir{											
						border-color: transparent transparent transparent @color;
					}
					i.it{						
						border-color: transparent @color transparent transparent;						
					}
					i.ib{						
						border-color: transparent transparent @color transparent;						
					}
				}
				&.disabled{
					@color: #888;
					span{
						background: @color;
						color: #fff;
					}
					i.ir{											
						border-color: transparent transparent transparent @color;
					}
					i.it{						
						border-color: transparent @color transparent transparent;						
					}
					i.ib{						
						border-color: transparent transparent @color transparent;						
					}
				}
			}
		}
	}
	div.el-table{
		font-size: 12px!important;
	}
	
</style>
<template>
	<div class="visual-wrapper">		
		<Filterm :filterData.sync="m_filter">
			<el-button type="primary" v-stream:click="search$" ref="r_search">检索</el-button>		
		</Filterm>		
		<div class="visual-inner">
			<div class="step">				
				<div class="step-item" 
					v-for="(item,index) in l_tabList"  
					:class="{active:m_stepIndex == index, middle:index != 0, disabled:!list}">
					<i class="it" :class="{'fn-ihide':index == 0}"></i>
					<i class="ib" :class="{'fn-ihide':index == 0}"></i>
					<span @click="f_changeTabIndex(index)"><em>{{index}}</em>{{item.name}}{{item.count}}条</span><i class="ir"></i>
				</div>				
			</div>
			<div class="table">
				<el-table :data="list" stripe>		
					<el-table-column type="index" width="60"></el-table-column>		    
				    <el-table-column prop="title" label="标题" width="300"></el-table-column>
				    <el-table-column prop="vid" label="vid" width="120"></el-table-column>
				    <el-table-column label="原因" width="300">
				    	<template scope="scope">
				    		<span v-html="scope.row.reason"></span>
				    	</template>
				    </el-table-column>
				    <el-table-column prop="category" label="分类" ></el-table-column>
				    <el-table-column prop="dkeys" label="关键词" ></el-table-column>
				    <el-table-column prop="source" label="来源" ></el-table-column>
				    <el-table-column prop="video_click_num" label="点击数" ></el-table-column>
				    <el-table-column prop="video_rec_num" label="推荐数" ></el-table-column>
				    <el-table-column prop="sansu_score" label="三俗值" ></el-table-column>
				    <el-table-column prop="weights" label="权重" ></el-table-column>
				    <el-table-column prop="video_publish_time" label="发布时间" width="160" ></el-table-column>
			  	</el-table>
			</div>
			<div v-show="m_stepIndex == 0 && list">
				<el-pagination		
					@current-change="f_changePage"			
					:current-page="m_currentPage"
					:page-size="m_pageSize"
					layout="prev, pager, next, jumper"
					:total="100">
				</el-pagination>
			</div>			
		</div>		
	</div>
</template>
<script>
	import Rx from 'rxjs/Rx';
	import Filter from "./filter.vue";
	import util from "../common/util.js";
	import event from "../common/event.js";
	import axios from "axios";	
	export default {
		data() {
			return {
				radio3: '上海',
				m_filter: {
					key: "863840028924236",
					type: "0"
				},
				m_currentPage: 1,
				m_pageSize: 20,
				m_stepIndex: 0,
				l_tabList:[{
					name:"召回",
					count:"100"
				},{
					name:"过滤",
					count:"10"
				}],
				list:[]
			}
		},
		components: {
			"Filterm": Filter
		},
		domStreams: ["search$"],		
		methods: {			
			f_changePage(i){
				this.m_currentPage = i;
			},
			f_changeTabIndex(i){
				this.m_stepIndex = i;
			}
		},
		mounted(){
			// this.$refs.r_search.$el.click();
		},
		subscriptions() {
			var that = this;											
			var search$ = this.search$.map((e) => {				
				that.m_currentPage = 1;
				that.m_stepIndex = 0;				
				return util.getObjSelf(Object.assign({}, that.m_filter, {
					currentPage: that.m_currentPage
				}));
			}).map((data)=>{
				// 处理搜索字段
				if(data.type == 0){
					data.uid = data.key;
				}else if(data.type == 1){
					data.device_id = data.key;
				}							
				return data;
			}).filter((data)=>{				
				return !!data.key;
			});
			var tab$ = this.$watchAsObservable("m_stepIndex").withLatestFrom(search$).map((e) => {								
				that.m_currentPage = 1;
				return Object.assign(e[1], {
					currentPage: that.m_currentPage
				})
			});
			var page$ = this.$watchAsObservable("m_currentPage").withLatestFrom(search$).map((e) => {
				return Object.assign(e[1], {
					currentPage: that.m_currentPage
				})
			});			
			var list$ = Rx.Observable.merge(search$, page$, tab$).debounceTime(20).map((data)=>{
				// 处理url
				if(data.type == 0){
					if(that.m_stepIndex == 0){
						data.url = "/api/video/hundred/items";
					}else if(that.m_stepIndex == 1){
						data.url = "/api/recomm/video/uid";
					}
				}else if(data.type == 1){
					if(that.m_stepIndex == 0){
						data.url = "/api/video/hundred/items/deviceId";
					}else if(that.m_stepIndex == 1){
						data.url = "/api/recomm/video/device_id";
					}
				}				
				return data;
			}).do(()=>{
				event.$emit("loading.show");
			}).switchMap((params) => {					
				var _params = Object.assign({},params),url = params.url;				
				delete _params.currentPage;
				delete _params.key;
				delete _params.type;
				delete _params.url;				
				return Rx.Observable.fromPromise(
					new Promise((reslove, reject) => {						
						axios.get(url, {
							params: _params
						}).then((ajaxData) => {							
							reslove(ajaxData);
						}).catch((error)=>{							
							reject(error)
						})
					})
				).filter((data)=>{					
					return !!data;
				}).map((data) => {														
					var start = (params.currentPage - 1) * that.m_pageSize,
						end = params.currentPage * that.m_pageSize;
					return data.slice(start, end);
				}).do(() => {
					event.$emit("loading.hide");
				});
			});
			return {
				list: list$
			}
		}
	};
</script>