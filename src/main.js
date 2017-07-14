// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'element-ui/lib/theme-default/index.css';
import Vue from 'vue';
import Rx from 'rxjs/Rx';
import VueRx from 'vue-rx';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import router from './config/route.js';
import "./config/axios.js";
import App from './contain/App';

import directiveDrag from "./directive/drag.js";
import store from "./store/store.js";

Vue.config.productionTip = false;
Vue.use(VueRx, Rx);
Vue.use(ElementUI);
Vue.directive(directiveDrag.name, directiveDrag);

store.dispatch("GETUSER");

new Vue({
	el: '#app',
	router: router.instance,
	store,
	template: '<App/>',
	components: {
		App
	}
});