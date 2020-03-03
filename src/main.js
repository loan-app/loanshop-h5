import Vue from 'vue'
import store from './store'
import { mapActions } from 'vuex'
import router from './router'
import { addJSBridgeFn, addRule, JSBridge } from 'assets/helper'
import 'assets/extend.js'

import './css/style.less'
import './css/icon-bk-logo.less'

import  { LoadingPlugin, AlertPlugin, ToastPlugin, ConfirmPlugin, Group, Cell, XInput, XButton,
	Spinner, Grid, GridItem } from 'vux'
Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)
Vue.component('group', Group)
Vue.component('cell', Cell)
Vue.component('grid', Grid)
Vue.component('gridItem', GridItem)
Vue.component('XInput', XInput)
Vue.component('XButton', XButton)
Vue.component('Spinner', Spinner)
Vue.prototype.$toast = function(msg, type="text") {
	Vue.$vux.toast.show({
		text: msg,
		type,
	})
	Vue.$vux.loading.hide()
}
Vue.prototype.$loading = function(msg) {
	Vue.$vux.loading.show({ text: msg })
}
Vue.prototype.$loading.close = function() {
	Vue.$vux.loading.hide()
}

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	template: '<app :class="appClass"/>',
	methods: {
		...mapActions([
			'initData',
			'getUserBean',
		]),
	},
	data() {
		return {
			appClass: '',
		}
	},
	created() {
		// this.appClass = 'from-' + (Param.from||'bs');
		// if(Param.ios11) this.appClass += ' ios11'
		if(Param.tab < 5 && Param.tab > 1) this.$store.commit('SET_TAB', Param.tab);
	},
	mounted() {
		if(window.android_wkcon || window.webkit.messageHandlers.wkcon) {
			JSBridge('setStatusBarStyle', {
				isDefault: false,
			})
		}
		if(Param.statusH && Param.plat == 2  || Param.statusH < 40) {
			addRule('#app .stabar', `height: ${Param.statusH}px;`)
		}
		const statusH = Param.statusH || 20;
		if(Param.from == 'app') addRule('#app .page', `padding-bottom: ${statusH}px;`)
		// window.scrollTo(0, statusH) // 解决WKWebView下头部状态栏白色问题
		// window.onscroll = () => {
		// 	// this.$toast(window.scrollY);
		// 	if(window.scrollY < statusH) {
		// 		window.scrollTo(0, statusH);

		// 	}
		// }

		this.initData();
		this.getUserBean();
		// if(window.android_wkcon || window.webkit.messageHandlers.wkcon) {
		// 	addJSBridgeFn('onConnectChange', res => {
		// 	// this.$message(JSON.stringify(res))
		// 	})
		// }
	},
})

// import FastClick from 'fastclick'
// FastClick.attach(document.body)
