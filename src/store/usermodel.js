import axios from "axios";
const usermodel = {
	state: {
		key: "",
		type: "0"
	},
	mutations: {
		usermodel_m_set(state, data = {}) {
			Object.assign(state, data);
		}
	},
	actions: {
		usermodel_a_set(context, data) {
			context.commit("usermodel_m_set", data)
		}
	},
	getters: {}
};
export default usermodel;