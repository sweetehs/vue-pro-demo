import Vue from 'vue'
import Router from 'vue-router'
import Visual from '../components/visual.vue'
Vue.use(Router);
let routeConfig = [{
	path: '/visual',
	name: '推荐流程可视化',
	component: Visual
}];
export default {
	routeConfig: routeConfig,
	instance: new Router({
		routes: routeConfig
	})
}