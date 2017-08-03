import axios from "axios";
const user = {
	state: {
		userName: ".."
	},
	mutations: {
		user_m_set(state, data = {}) {
			state.userName = data.user;
		}
	},
	actions: {
		user_a_set(context) {
			axios.get("/api/auth/new/info", {
				params: {}
			}).then((ajaxData) => {
				context.commit("user_m_set", ajaxData)
			})
		}
	},
	getters: {}
};
export default user;