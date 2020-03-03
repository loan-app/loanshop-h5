import Vue from 'vue'
import Vuex from 'vuex'
import api from 'src/api'
import { cdn_pre, sortByObjKey } from 'assets/helper'

import user from './vuex/user'
import apply from './vuex/apply'

const isAndroid = /android/i.test(navigator.userAgent)

Vue.use(Vuex)

const types = {
	init_data: 'INIT_DATA',
	init_note: 'INIT_NOTE',
}

const instance = {
	modules: {
		user,
		apply,
	},

	state: {
		dataMap: {
			loans: {},
			banks: {},
		},
		banners: [],
		bankBanners: [],
		hotLoans: [],
		newLoans: [],
		moreLoans: [],
		cards: [],
		cur_tab_idx: 0,
		cur_book_idx: 0,
		books: [
			{
				id: "10834454",
				title: "贷款攻略",
				notes: [],
			},
			{
				id: "10834451",
				title: "信用生活",
				notes: [],
			},
			{
				id: "10834446",
				title: "办卡攻略",
				notes: [],
			},
			{
				id: "10834438",
				title: "羊毛活动",
				notes: [],
			},
		],
		// notes: {},
	},

	mutations: {
		SET_TAB(state, idx) {
			if(idx != state.cur_tab_idx) {
				window.MtaH5 && window.MtaH5.clickStat('tab', { 'idx': idx+'' });
				state.cur_tab_idx = idx;
			}
		},
		// 初始化数据：贷款列表和信用卡列表
		[types.init_data](state, hot) {
			hot.loans.concat(hot.newLoans).forEach(item => {
				state.dataMap.loans[item.id] = item;
			})
			hot.banks.forEach(item => {
				state.dataMap.banks[item.id] = {
					title: item.title + '银行',
					applyUrl: item.applyUrl,
				}
			})
			state.hotLoans = hot.loans;
			state.newLoans = hot.newLoans;
			state.cards = hot.banks;
			state.banners = hot.banners;
		},
		// 贷款tab 更多贷款
		setMoreLoan(state, data) {
			data.forEach(row => {
				row.list.forEach(item => {
					state.dataMap.loans[item.id] = item;
				})
			})
			state.moreLoans = data;
		},
		// 信用卡tab banner信息
		setTab2Data(state, data) {
			state.bankBanners = data.banners;
		},
		// 卡神秘籍
		[types.init_note](state, data) {
			data.books.forEach(item => {
				item.notes = [];
				data.notes.forEach(note => {
					if(!note.main_img) note.main_img = '/static/note-def.png';
					if(item.id == note.notebook_id) item.notes.push(note);
					// state.notes[note.id] = note;
				})
			})
			state.books = data.books;
		},
	},

	actions: {
		initData({ commit }) {
			api.initData().then(data => {
				commit(types.init_data, data);
			})
		},
		async getMoreLoan({ state, commit }) {
			const hotIds = []
			state.hotLoans.forEach(item => hotIds.push(item.id))
			const data = await api.getMoreLoan({ hotIds })
			commit('setMoreLoan', data)
		},
		async getTab2Data({ commit }) {
			const data = await api.getTab2Data()
			commit('setTab2Data', data)
		},

		async initNote({ commit }) {
			const data = await api.initNote();
			commit(types.init_note, data);
		},

	},

	getters: {
		cards: s => s.cards,
		banners: s => s.banners,
		bankBanners: s => s.bankBanners,
		hotLoans: s => s.hotLoans.slice(0, 3),
		newLoans: s => s.newLoans.slice(0, 12),
		hotCards: s => s.cards.slice(0, 3),
		books: s => s.books,
		cur_book_idx: s => s.cur_book_idx,
	}
}

export default new Vuex.Store(instance);
