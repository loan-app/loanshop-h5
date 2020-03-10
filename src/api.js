import Vue from 'vue'
import vueResource from 'vue-resource'

// import cookie from 'js-cookie'
import CryptoJS from 'crypto-js'
// import md5 from 'crypto-js/md5'
import md5 from 'md5'
const aes_key = md5('md5key').substr(-16)

const api_pre =  location.origin + '/api/';
// const api_pre =   'localhost:4321/api/';

Vue.use(vueResource)

const http = Vue.http;

// headers设置
http.interceptors.push((req, next) => {
	if(!/^http/.test(req.url)) {
		req.url = api_pre + req.url;
	}
	// if(req.cacheSec && storeCache.checkUpdated(req.url)) {
	// 	console.log(req.url, 'update cache')
	// 	req.cacheSec = 0.1;
	// }
	if(/\/auth/.test(req.url)) req.params.uid = localStorage.uid
	if(!req.url.match(/service.xinkouzi365/)) {
		req.headers.set('X-Uid', localStorage.uid);
		req.headers.set('X-Auth', localStorage.passkey);
		req.headers.set('X-App-Id-v2', localStorage.app_id);
		req.headers.set('X-Device-Id-v2', localStorage.device_id_v2);
	}
	if(req.url.match(/mobileLogin/)) {
		console.log('ok');
		req.headers.set('Content-Type', 'application/json');
	}
	next(res => {
		if(!res.ok) {
			Vue.$vux.loading.hide();
			var body = res.body;
			console.log(body)
			if(body && body.toastType) {
				if(body.msg.length > 10) Vue.$vux.alert.show({ content: body.msg })
				else Vue.$vux.toast.text(body.msg)
			}
		}
	})
})

// const baseUrl = 'http://121.40.245.243:8016/bee-api/';
const baseUrl = 'http://api.jbhunt.cc/ycqb-api/';
// const baseUrl = 'http://47.114.163.8:8081/ycqb-api/';
// const baseUrl = 'http://121.40.245.243:8016/rhh-api/';

export const path = {
	// init_data: 'v2/app/loan/hot',
	// loan_more: 'v2/app/loan/more',
	// notes: `v2/app/note/list`,
	// note: id => `v2/app/note/${id}`,

	// user: 'v2/user/info',
	send_vcode: mobile => `v2/user/send_vcode/${mobile}`,
	newSend_vcode: (mobile, chCode, chName, uuid, imgCode) => `${baseUrl}api/v2/getVcode?mobile=${mobile}&chCode=${chCode}&chName=${chName}&uuid=${uuid}&imgCode=${imgCode}`,
	login: mobile => `${baseUrl}api/mobileLogin`,
	loginNew: (mobile, channel) => `${baseUrl}api/mobileRegister?mobile=${mobile}&channel=${channel}`,
	// logout: mobile => `v2/user/logout/${mobile}`,

	// ajax_log: 'apply/xlog',
	// apply_log: 'v2/auth/apply',
	tarceChannelUV:  `${baseUrl}api/traceChannelUV`,
	traceChanne:`${baseUrl}api/traceChannel`,
	checkChannelIsEffective: channel => `${baseUrl}api/getChannelEnable?channel=${channel}`,
	getImgCode: (uuid) => `${baseUrl}api/captcha.jpg?uuid=${uuid}`,
}

//首先声明两个变量，加密的时候要用到，要和后台沟通，保持一致
const AES_KEY = 'dkmzz123';
const IV = 'dkmzz1234';

function encrypt(params) {
	var key = CryptoJS.enc.Utf8.parse(AES_KEY);
	var iv = CryptoJS.enc.Utf8.parse(IV);
	//下面的data参数要求是一个字符串，第一次用的时候我直接传递的是一个对象，出现了错误，要转换成字符串
	var data = CryptoJS.enc.Utf8.parse(params);
	var encrypted = CryptoJS.DES.encrypt(data, key, {
			iv: iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7
	}).toString();
	return encrypted;
}

var api = {

	logLoan(id) {
		const params = {
			visited: true,
			from: localStorage.app_id || Param.app_name,
		}
		const storKey = 'loan-' + id
		const t = localStorage.getItem(storKey) || 0
		const today_t = new Date().format('yy-mm-dd').toDate()
		console.log(today_t)
		if(t < today_t) {
			params.visited = false
			localStorage.setItem(storKey, Date.now())
		}
		return http.get('v2/app/loan-link/' + id, { params })
	},
	queryCredit(params) {
		return http.get('v2/my-credit', { params }).then(res => res.body)
	},

	initData() {
		return http.get(path.init_data, { cacheSec: 5 }).then(res => res.body);
	},
	getMoreLoan(params) {
		return http.get(path.loan_more, { params }).then(res => res.body)
	},
	getTab2Data() {
		return http.get('v2/app/bank/more').then(res => res.body)
	},

	checkChannelIsEffective(channel) {
		return http.get(path.checkChannelIsEffective(channel)).then(res=>{
			return res.body;
		});
	},

	logRoute(form) {
		return http.post('v2/user/log/route', form).then(res => {
			const data = res.body
			const query = data.query
			if(data.deviceId) localStorage.device_id_v2 = data.deviceId
			if(data.appId) localStorage.app_id = data.appId
			if(query.channelCode)
				localStorage.channel = query.channelCode
			return data;
		})
	},

	getApplyLog() {
		return http.get(path.apply_log, { cacheSec: 300 }).then(res => res.body)
	},
	postAjaxLog(arr, route) {
		const form = {
			route,
			vid: window.Param.vid || window.Param.uuid,
			data: AES.encrypt(JSON.stringify(arr), aes_key).toString()
		}
		return http.post(path.ajax_log, form).then(res => res.body)
	},

	getUser() {
		const params = window.Param;
		return http.get(path.user, { params }).then(res => res.body)
	},
	sendVcode(mobile, chname, uuid, imgCode) {
		// let obj = {
		// 	channel: Param.channelCode || Param.channel || 'h5',
		// 	chName:chname,
		// };
		//return http.get(path.send_vcode(mobile),obj).then(res => res.body)
		//newSend_vcode
		mobile = encodeURIComponent(encrypt(mobile));
		return http.post(path.newSend_vcode(mobile, Param.channelCode, chname, uuid, imgCode)).then(res => res.body)
	},
	getImgCode(uuid) {
		console.log('uuid:', uuid);
		return http.post(path.getImgCode(uuid)).then(res => res.body);
	},
	login(mobile, form) {
		if(form.psw) {
			form.psw = md5(form.psw + '-client');
		}
		return http.post(path.login(mobile),
		form).then(res => {
			const body = res.body;
			localStorage.uid = body.uid;
			localStorage.passkey = body.passkey;
			return body
		})
	},
	loginNew(mobile, channel, form) {
		if(form.psw) {
			form.psw = md5(form.psw + '-client');
		}
		return http.post(path.loginNew(mobile, channel), 
		form).then(res => {
			const body = res.body;
			localStorage.uid = body.uid;
			localStorage.passkey = body.passkey;
			return body
		})
	},
	logout(mobile) {
		return http.get(path.logout(mobile)).then(res => {
			localStorage.passkey = '';
			return res.body
		})
	},

	initNote() {
		return http.get(path.notes, { cacheSec: 200 })
			.then(res => res.body);
	},
	getNoteDetail(id) {
		return http.get(path.note(id), { cacheSec: 300 })
			.then(res => res.body);
	},
	tarceChannelUV(channelCode){
		const form = {
			channel:channelCode
		}
		return http.post(path.tarceChannelUV,{channel:channelCode})
		.then(res => res.body)
	},
	traceChanne(channelCode){
		const form = {
			channel:channelCode
		}
		return http.post(path.traceChanne,{channel:channelCode})
		.then(res => res.body)
	}
}

export default api;
