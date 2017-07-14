<style></style>
<template>
	<div>		
		<div class="tab-child">
			<el-tabs v-model="m_tabActive" @tab-click="f_tabClick">
			    <el-tab-pane 
			    	v-for="(item,index) in l_tabChild" 
			    	:key="item.name"
			    	:label="item.name" 
			    	:name="item.path">
			    </el-tab-pane>				    
		  	</el-tabs>
		</div>
		<router-view name="useraction"></router-view>
	</div>
</template>
<script>
	import routeConfig from "../../../config/route.js";
	export default {
		components: {},
		created() {
			var that = this,		
				path = "/usermodel",
				childPath = "action";				
			routeConfig.routeConfig.forEach((x) => {
				if (x.path == path) {
					x.children.forEach((y) => {
						if (y.path == childPath) {
							that.l_tabChild = y.children.map((k) => {								
								return {
									name: k.name,
									path: [path, childPath, k.path].join("/")
								}
							})
						}
					});
				}
			});			
		},
		data() {
			return {
				m_tabActive: "",
				l_tabChild: []
			}
		},
		beforeRouteEnter (to, from, next){
			next((that)=>{
				that.m_tabActive = to.path;
			})
		},
		watch:{
			$route(to,from){				
				this.m_tabActive = to.path;
			}
		},
		methods: {
			f_tabClick(t,e) {
				location.hash = t.name;
			}
		}
	}
</script>