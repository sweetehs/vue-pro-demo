import Vue from "vue"
import Router from "vue-router"
import Visual from "../components/visual.vue"
import Exportulog from "../components/exportulog.vue"

import Model from "../components/usermodel/model/index.vue"
import Usermodel from "../components/usermodel/index.vue"
import Userinfo from "../components/usermodel/model/userinfo.vue"
import Modelinterest from "../components/usermodel/model/modelinterest.vue"
import Modelexplore from "../components/usermodel/model/modelexplore.vue"
import Modelback from "../components/usermodel/model/modelback.vue"
import Usersimilarity from "../components/usermodel/model/usersimilarity.vue"

import Action from "../components/usermodel/action/index.vue";
import Actionrecommend from "../components/usermodel/action/recommend.vue"
import Actionhistory from "../components/usermodel/action/history.vue"
import Actioncomment from "../components/usermodel/action/comment.vue"
import Actionshare from "../components/usermodel/action/share.vue"
import Actioncollect from "../components/usermodel/action/collect.vue"

import Videorecommend from "../components/videorecommend.vue"
Vue.use(Router);
let routeConfig = [{
	path: "/usermodel",
	name: "用户模型",
	components: {
		main: Usermodel
	},
	children: [{
		path: "model",
		name: "用户模型信息",
		components: {
			child: Model
		},
		children: [{
			path: "info",
			name: "用户基本信息",
			components: {
				usermodel: Userinfo
			}
		}, {
			path: "modelinterest",
			name: "线上兴趣模型",
			components: {
				usermodel: Modelinterest
			}
		}, {
			path: "modelexplore",
			name: "线上探索模型",
			components: {
				usermodel: Modelexplore
			}
		}, {
			path: "modelback",
			name: "数据模型备份",
			components: {
				usermodel: Modelback
			}
		}, {
			path: "usersimilarity",
			name: "相似用户",
			components: {
				usermodel: Usersimilarity
			}
		}]
	}, {
		path: "action",
		name: "用户行为",
		components: {
			child: Action
		},
		children: [{
			path: "recommend",
			name: "推荐记录",
			components: {
				useraction: Actionrecommend
			}
		}, {
			path: "history",
			name: "历史记录",
			components: {
				useraction: Actionhistory
			}
		}, {
			path: "comment",
			name: "评论记录",
			components: {
				useraction: Actioncomment
			}
		}, {
			path: "share",
			name: "用户分享",
			components: {
				useraction: Actionshare
			}
		}, {
			path: "collect",
			name: "用户收藏",
			components: {
				useraction: Actioncollect
			}
		}]
	}],
}, {
	path: "/exportulog",
	name: "用户日志导出",
	components: {
		main: Exportulog
	}
}, {
	path: "/visual",
	name: "推荐流程可视化",
	components: {
		main: Visual
	}
}, {
	path: "/videorecommend",
	name: "视频推荐演示",
	components: {
		main: Videorecommend
	}
}];
export default {
	routeConfig: routeConfig,
	instance: new Router({
		routes: routeConfig
	})
}