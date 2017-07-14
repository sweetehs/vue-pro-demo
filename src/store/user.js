const user = {
	state: {
		userName: "XXXX"
	},
	mutations: {
		SET(state, data) {			
			state.userName = data.userName;
		}
	},
	actions: {
		GETUSER(context) {
			setTimeout(() => {
				context.commit("SET", {
					userName: "zhaoweinan"
				})
			}, 1000)
		}
	},
	getters: {}
};
export default user;