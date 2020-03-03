
export const cdn_origin = 'https://h5.xinkouzi365.com';
export const cdn_pre = `${cdn_origin}/static/`;
import api from 'src/api'

export function sortByObjKey(arr, key) {
	return arr.slice(0).sort((a, b) => a[key] - b[key])
}

const JSBridgeFnMap = {}
export function addJSBridgeFn(method, cb) {
	JSBridgeFnMap[method] = cb;
}

window.JSBridgeFn = function(method, data) {
	var fn = JSBridgeFnMap[method];
	if(typeof data == 'string') {
		try {
			data = JSON.parse(data)
		}
		catch(e) {
			console.error('JSBridge parse data error')
		}
	}
	typeof fn == 'function' && fn(data);
}
export function JSBridge(method, cb, opts={}) {
	if(cb) {
		if(typeof cb == 'object') opts = cb;
		else addJSBridgeFn(method, cb);
	}
	if((window.webkit || {}).messageHandlers || window.android_wkcon) {
		const handler = window.android_wkcon || window.webkit.messageHandlers.wkcon;
		opts.method = method;
		if(handler) return handler.postMessage(window.android_wkcon ? JSON.stringify(opts) : opts);
	}
	
	let iframe = window.native_bridge;;
	if(!iframe) {
		iframe = document.createElement('iframe');
		iframe.style.display = 'none';
		document.body.appendChild(iframe);
		window.native_bridge = iframe;
	}
	const data = JSON.stringify(opts);
	const query = encodeURIComponent(data);
	iframe.src = `jsbridge://${method}?${query}`;
}

export function openLink(url, opts={}) {
	url = url.trim().replace(/#in$/, '');
	const appname = Param.app_name
	const title = opts.title || opts._title || ''
	window.MtaH5 && window.MtaH5.clickStat('openLink', { url, appname, title });
	window._hmt && window._hmt.push(["_trackEvent", appname, 'openLink', title + url]);
	Object.assign(opts, { url });
	if(Param.navColor && !opts.navColor) {
		const mat = window.getComputedStyle(document.querySelector('#app')).backgroundColor.match(/\((.*)\)/)
		opts.navColor = mat[1].split(', ');
	}
	if(Param.from=='app' || window.android_wkcon || (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.wkcon)) JSBridge('openLink', null, opts);
	else window.open(url);

	api.logRoute({
		path: url.substr(0, 255),
		prePath: window.lastLogPath,
		query: { title },
		seqId: window.firstRouteId,
	})
} 
if(window) window.openLink = openLink;

export function getDomHeight(doms) {
	var h = 0;
	doms.forEach(dom => {
		h += dom.offsetHeight;
	})
	return h;
}

export function addRule(selector, rule, index) {
	var sheet = document.styleSheets[document.styleSheets.length-1]; //加在最后一份css权重最高
	sheet.addRule && sheet.addRule(selector, rule, index);
}

export function getMoneyUnit(num) {
	if(num < 1e3) return num/100 + '百';
	if(num < 1e4) return num/1000 + '千';
	return num/1e4 + '万';
}