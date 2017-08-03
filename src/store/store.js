import Vue from "vue";
import Vuex from "vuex";
import user from "./user.js";
import usermodel from "./usermodel.js";

Vue.use(Vuex);
const store = new Vuex.Store({
	modules: {
		user: user,
		usermodel: usermodel
	}
})
export default store;