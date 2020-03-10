import Vue from 'vue'
import VueRouter from 'vue-router'
import SwipeRouter from './components/vue-slide-router'
// import { openLink } from 'assets/helper'
import api, { path, storeCache } from 'src/api'
import uuid from 'uuid/v1'
import { querystring } from 'vux'

// import pages from 'src/pages'

Vue.use(VueRouter)
Vue.use(SwipeRouter, {
	androidCanDrag: true
})

Vue.component('set-list', { template: '<ul class="set-list"><slot/></ul>' })
Vue.component('set-form', { template: '<ul class="set-list form"><slot/></ul>' })
Vue.component('set-item', { template: '<li class="more"><slot/></li>' })

const routes = [
	// { path: '/', component: pages.Home, },
	// { path: '/', component: resolve => require(['./pages/home/home.vue'], resolve)},
	// { path: '/tag-detail', component: resolve => require(['./pages/home/home-tab0/tag-detail'], resolve) },

	{ path: '/protocol', component: resolve => require(['./pages/login/protocol'], resolve) },

	// { path: '/login', component: resolve => require(['./pages/login'], resolve) },
	{ path: '/channel-login', component: resolve => require(['./pages/login/channel-login'], resolve) },
	{ path: '/channel-xjdk', component: resolve => require(['./pages/login/channel-xjdk'], resolve) },
	{ path: '/channel-xjdk2', component: resolve => require(['./pages/login/channel-xjdk2'], resolve) },
	{ path: '/', component: resolve => require(['./pages/login/channel-aqy'], resolve) },
	// { path: '/setting', component: resolve => require(['./pages/mine/setting'], resolve) },
	// { path: '/about-us', component:resolve => require(['./pages/mine/about-us'], resolve)  },
	// { path: '/contact', component: pages.Contact, },
	// { path: '/apply-log', component: pages.ApplyLog, },
	// { path: '/download', component: resolve => require(['./pages/mine/download'], resolve), },

	// { path: '/credit-card', component: pages.CreditCard, },
	// { path: '/query-card', component: pages.QueryCard, },
	// { path: '/bank/:id', component: pages.LoanDetail, },
	// { path: '/banner/:id', component: pages.LoanDetail, },
	// { path: '/loan/:id', component: pages.LoanDetail, },
]
const router = new VueRouter({
	routes
})

window.firstRouteId = 0

router.beforeEach(async (to, from, next) => {
	if(!window.Param) {
		window.Param = { ...querystring.parse(), ...to.query } //分别为井号前后的链接参数
		if(Param.ios) {
			Param.from = 'app'
			Param.statusH = Param.stabar
			Param.app_name = Param.app
			Param.build_ver = Param.build
			Param.app_ver = Param.v
			Param.bundle_id = Param.bundle
		}
		Param.plat = 3
		const ua = window.navigator.userAgent
		if(/iPhone|iPad/i.test(ua)) {
			Param.plat = 1
			Param.isIos = true
		}
		else if(/android/i.test(ua)) Param.plat = 2
		Param.inWechat = /MicroMessenger/i.test(ua)
		window.Param.app_name = Param.app_name || Param.appname || '易财钱包'
	}
	const getPath = ro => {
		let { path, query } = ro;
		if(query._replace) path = ro.fullPath.replace('&_replace=1', '');
		return path;
	}
	const query = { ...to.query };

	if(!firstRouteId && !query.uuid) {
		query.uuid = localStorage.uuid = localStorage.uuid || uuid();
	}
	const logForm = {
		path: getPath(to),
		prePath: getPath(from),
		query: query._replace ? '' : query,
	}
	localStorage.setItem('path', getPath(to))
	localStorage.setItem('prePath', getPath(from))
	window.lastLogPath = logForm.path
	if(firstRouteId) {
		logForm.seqId = firstRouteId;
		if(to.path == '/' && query.from) logForm.query = '';
	}

	// if(query.openLink && query.url) {
	// 	if(to.params.id) api.logLoan(to.params.id) // 贷款埋点 2017-10-26 23:56
	// 	window.lastLogPath = logForm.prePath
	// 	openLink(query.url, query);
	// 	return;
	// }

	// console.log(logForm)
	// api.logRoute(logForm).then(data => {
	// 	// console.log(data)
	// 	if(!firstRouteId) firstRouteId = data.id;
	// })

	if(query._static) return;

	document.title = query.title || Param.app_name || '首页'
	next();
})

export default router;
