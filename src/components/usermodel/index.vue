<style lang="less">
	.usermodel-inner{
		padding: 20px;
		.tab-child{
			padding: 0 40px;
			text-align: center;
			.el-tabs{
				display: inline-block;
			}
		}		
	}
</style>
<template>
	<div class="usermodel-wrapper">
		<Filterm :filterData.sync="m_filter">
			<el-button class="usermodel-search-btn" type="primary" @click="f_search()">检索</el-button>
		</Filterm>
		<div class="usermodel-inner">
			<div>
				<el-tabs v-model="m_tabActive" type="card" @tab-click="f_tabClick">
				    <el-tab-pane 
				    	v-for="(item,index) in l_tabChild" 
				    	:key="item.index"
				    	:label="item.name" 
				    	:name="item.path">
				    </el-tab-pane>			   
			  	</el-tabs>
			</div>			
			<router-view name="child"></router-view>
		</div>			
	</div>
</template>
<script>
	import Filter from "../filter.vue";
	import routeConfig from "../../config/route.js";	
	import Event from "../../common/event.js";
	export default {
		components: {
			Filterm: Filter
		},			
		created() {			
			var that = this,
				path = routeConfig.routeConfig[0].path;
			routeConfig.routeConfig.forEach((x) => {
				if (x.path == path) {
					that.l_tabChild = x.children.map((y,index) => {
						var _path = [path , y.path].join("/");						
						return {
							name: y.name,
							_path: y.path,
							path: _path,							
							children: y.children
						}
					});
				}
			});			
		},				
		beforeRouteEnter (to, from, next){
			next((that)=>{
				that._setTabActive(to.path);				
			})
		},
		watch:{
			$route(to, from){				
				this._setTabActive(to.path);
				Event.$off("usermodel.init");				
			}
		},
		data() {
			return {
				m_filter: {
					key: "",
					type: "0"
				},
				m_tabActive: "",	
				l_tabChild:[]			
			}
		},
		methods: {		
			f_search(){				
				this.$store.dispatch("usermodel/filter_a_set",this.m_filter);
				if(this.m_filter.key){										
					Event.$emit("usermodel.init",this.m_filter);	
				}				
			},	
			f_tabClick(t, e) {	
				location.hash = [t.name,this.l_tabChild[t.index].children[0].path].join("/");
			},
			_setTabActive(path){
				var that = this,pathArr = path.split("/");	
				if(pathArr.length == 2){				
					that.m_tabActive = this.l_tabChild[0].path;
					// location.hash = [this.l_tabChild[0].path,this.l_tabChild[0].children[0].path].join("/");
				}else if(pathArr.length == 3){
					that.m_tabActive = pathArr.join("/");
					// location.hash = [this.l_tabChild[0].path,this.l_tabChild[0].children[0].path].join("/");
				}else if(pathArr.length == 4){				
					that.m_tabActive = pathArr.slice(0,3).join("/");
				}
			}
		}
	}
</script>

vue-cli