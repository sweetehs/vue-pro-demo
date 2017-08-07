import axios from "axios";
const usermodel = {
	namespaced: true,
	state: {
		key: "",
		type: "0"
	},
	mutations: {
		filter_m_set(state, data = {}) {			
			Object.assign(state, data);
		}
	},
	actions: {
		filter_a_set(context, data) {
			context.commit("filter_m_set", data)
		}
	},
	getters: {}
};
export default usermodel;