
var ua = window.navigator.userAgent;
export var isAndroid = /android/i.test(ua);
export var isIos = /iPhone|iPad/i.test(ua);
export var isWechat = /MicroMessenger/i.test(ua);

export var supportTouch = 'ontouchstart' in window;

export function showClass(el, cls, isShow=true) {
	isShow ? el.classList.add(cls) : el.classList.remove(cls);
}
export function bubbleDom(el, fn) {
	while(el) {
		fn(el);
		el = el.parentElement;
	}
}
export function bubbleClass(el, cls, isShow=true) {
	while(el) {
		showClass(el, cls, isShow);
		el = el.parentElement;
	}
}

export function getSiblings(el) {
	var cur = el;
	var res = [];
	while(cur = cur.previousElementSibling) res.push(cur);
	cur = el;
	while(cur = cur.nextElementSibling) res.push(cur);
	return res;
}

export function getHeight(doms) {
	var h = 0;
	doms.forEach(dom => {
		h += dom.offsetHeight;
	})
	return h;
}