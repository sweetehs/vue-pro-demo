<style lang="less">
	.visual-wrapper{				
		.visual-inner{
			padding: 20px;
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
					width: 100px;
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
						width: 80px;
					}
				}
				&.active{
					@activeColor: #026DA1;
					span{
						background: @activeColor;
						color: #fff;
					}
					i.ir{											
						border-color: transparent transparent transparent @activeColor;
					}
					i.it{						
						border-color: transparent @activeColor transparent transparent;						
					}
					i.ib{						
						border-color: transparent transparent @activeColor transparent;						
					}
				}
			}
		}
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
					v-for="(item,index) in m_tabList"  
					:class="{active:m_stepIndex == index, middle:index != 0}">
					<i class="it" :class="{'fn-ihide':index == 0}"></i>
					<i class="ib" :class="{'fn-ihide':index == 0}"></i>
					<span @click="changeTabIndex(index)"><em>{{index}}</em>{{item.name}}{{item.count}}条</span><i class="ir"></i>
				</div>				
			</div>
			<div class="table">
				<el-table :data="list" stripe style="width: 100%">				    
				    <el-table-column prop="date" label="标题" ></el-table-column>
				    <el-table-column prop="date" label="vid" ></el-table-column>
				    <el-table-column prop="date" label="原因"></el-table-column>
				    <el-table-column prop="date" label="分类" ></el-table-column>
				    <el-table-column prop="date" label="关键词" ></el-table-column>
				    <el-table-column prop="date" label="来源" ></el-table-column>
				    <el-table-column prop="item" label="点击数" ></el-table-column>
				    <el-table-column prop="date" label="推荐数" ></el-table-column>
				    <el-table-column prop="date" label="三俗值" ></el-table-column>
				    <el-table-column prop="date" label="权重" ></el-table-column>
				    <el-table-column prop="item" label="发布时间" ></el-table-column>
			  	</el-table>
			</div>
			<div>
				<el-pagination		
					@current-change="changePage"			
					:current-page="m_currentPage"
					:page-size="100"
					layout="prev, pager, next, jumper"
					:total="1000">
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
	var promise$ = {
		list(o){						
			console.log(o)			
			return Rx.Observable.fromPromise(
				new Promise((reslove,reject)=>{
					setTimeout(function(){
						reslove([{
							date: Math.random(),
							item: Math.random()
						},{
							date: Math.random(),
							item: Math.random()
						}])
					},100)					
				})
			)
		}
	}
	export default {
		data() {
			return {
				m_filter: {
					key: "",
					type: "0"
				},
				m_currentPage: 1,
				m_stepIndex: 0,
				m_tabList:[{
					name:"召回",
					count:"0"
				},{
					name:"过滤",
					count:"0"
				},{
					name:"选取",
					count:"0"
				},{
					name:"排序",
					count:"0"
				}]
			}
		},
		components: {
			"Filterm": Filter
		},
		domStreams: ["search$"],		
		methods: {			
			changePage(i){
				this.m_currentPage = i;
			},
			changeTabIndex(i){
				this.m_stepIndex = i;
			}
		},
		mounted(){
			this.$refs.r_search.$el.click();
		},
		subscriptions() {
			var that = this,
				flag = false,
				_searchFlag = false; // 为了防止手动变化m_currentPage,m_stepIndex引起的多次执行promise
			var search$, page$, tab$, list$;
			search$ = this.search$.map((e) => {
				_searchFlag = true;
				that.m_currentPage = 1;
				that.m_stepIndex = 0;
				return util.getObjSelf(Object.assign(that.m_filter, {
					currentPage: that.m_currentPage
				}));
			});
			tab$ = this.$watchAsObservable("m_stepIndex").withLatestFrom(search$).map((e) => {
				return Object.assign(e[1], {
					currentPage: that.m_currentPage
				})
			}).filter(()=>{							
				return !_searchFlag;
			});
			page$ = this.$watchAsObservable("m_currentPage").withLatestFrom(search$).map((e) => {
				return Object.assign(e[1], {
					currentPage: that.m_currentPage
				})
			}).filter(()=>{
				return !_searchFlag;
			});			
			list$ = Rx.Observable.merge(search$, page$, tab$).do(()=>{
				event.$emit("loading.show");
			}).switchMap((o) => {				
				return promise$.list(o).do(()=>{					
					_searchFlag = false;
					event.$emit("loading.hide");
				});
			});
			return {
				list: list$
			}
		}
	}
</script>