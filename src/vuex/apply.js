import api from 'src/api'

export default {
	namespaced: true,

	state: {
		logs: {
			loan: [],
			bank: [],
		},
	},

	mutations: {
		setLogs(state, data) {
			state.logs = data;
		},
	},

	actions: {
		async getLogs(store) {
			const data = await api.getApplyLog();
			const { loans, banks } = store.rootState.dataMap;
			data.loan.forEach(item => {
				const loan = loans[item.id];
				if(loan) Object.assign(item, loan);
			})
			data.bank.forEach(item => {
				const bank = banks[item.id];
				if(bank) Object.assign(item, bank);
			})
			store.commit('setLogs', data);
		},
	}
}