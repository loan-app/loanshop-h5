import api from 'src/api'

const types = {
	setUserBean: 'setUserBean',
}
export default {
	state: {
		userBean: null,
		loginForm: {
			mobile: '',
			vcode: '',
			psw: '',
		},
		setPswMap: {},
		isHasTab: true,
	},

	mutations: {
		[types.setUserBean](state, data) {
			state.userBean = data;
			if(data) state.loginForm.mobile = data.mobile;
		},
	},

	actions: {
		getUserBean({ commit }) {
			return api.getUser().then(data => {
				commit(types.setUserBean, data.user);
				return data.user;
			}, res => {
				console.info('未登录---')
				return res;
			})
		},
		async logout({ commit, getters }) {
			const data = await api.logout(getters.userBean.mobile);
			commit(types.setUserBean, null);
			return data.msg;
		},
	},

	getters: {
		userBean: s => s.userBean,
		
	},

}