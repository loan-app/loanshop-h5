import { supportTouch, showClass, bubbleDom } from './domhelper'

let startTouch = false;
let cancelDrag = false;
let canDrag = false;
let e0, x0, y0, dx, dy;
let orienDiff = 0; //水平方向移动距离与垂直方向距离之差
let orien = ''; // x 或者 y， 每次滑动大于startDragDis时判断orienDiff大于0则orien为x，小于0为y，等于0为空

const evStart = supportTouch ? 'touchstart':'mousedown';
const evMove = supportTouch ? 'touchmove':'mousemove';
const evEnd = supportTouch ? 'touchend':'mouseup';

const options = {
	startDragDis: 5, //手势滑动最小可以开始移动的距离
	cancelDragDis: 20, //垂直方向滑动这个距离之后取消识别页面滑动
}

const getXY = e => e.changedTouches ? e.changedTouches[0] : e;

const onMotions = e => {
	
	let { pageX, pageY } = getXY(e);

	if(e.type == evStart) {
		
		startTouch = true;
		e0 = e;
		x0 = pageX;
		y0 = pageY;
		
		if(options.threshold>0 && pageX > options.threshold) cancelDrag = true;

		bubbleDom(e.target, el => {
			if([].slice.call(el.classList).indexOf('slides') > -1) cancelDrag = true;
			showClass(el, options.hoverClass);
		})

	} else if(startTouch) {
		
		dx = pageX - x0;
		dy = pageY - y0;
		var duration = parseInt(e.timeStamp - e0.timeStamp);
		var end = e.type == evEnd;

		if(e.type == evMove) {
			if(!canDrag && !cancelDrag &&
				Math.pow(dx, 2) + Math.pow(dy, 2) > Math.pow(options.startDragDis, 2) ) {
				
				orienDiff = Math.abs(dx) - Math.abs(dy);
				if(Math.abs(orienDiff) > 0) {
					orien = orienDiff > 0 ? 'x' : 'y';
				}
				canDrag = true;

			}
		} 

		var swipeData = { dx, dy, x0, y0, pageX, pageY, orienDiff, orien, duration, end };

		bubbleDom(e0.target, el => {
			// Object.assign(e, { swipeData });
			// if(canDrag) el.onDrag && el.onDrag(e);

			if(end || dx*dx + dy*dy > 6*6) {
				showClass(el, options.hoverClass, false);
			}

		})

		//http://www.w3school.com.cn/xmldom/met_element_dispatchevent.asp
		if(canDrag) {
			e.preventDefault(); //阻止浏览器默认行为 防止页面上下滚动

			var evt = document.createEvent('MouseEvents');
			evt.initMouseEvent('swipe', true, true, window, 1, e.screenX, e.screenY, e.clientX, e.clientY, false, false, false, false, 0, null);
			Object.assign(evt, { swipeData });
			evt.forwardedTouchEvent = true;
			e0.target.dispatchEvent(evt);
		}
		
		if(end) {
			startTouch = false;
			canDrag = false;
			cancelDrag = false;
			orien = '';
			orienDiff = 0;
		}

	}
	
}


export default function (opts = {}) {

	Object.assign(options, opts);

	if(window.DragInstalled) return console.warn('dragPlugin has been attached');
	window.DragInstalled = true;
	
	window.addEventListener(evStart, onMotions)
	window.addEventListener(evMove, onMotions)
	window.addEventListener(evEnd, onMotions)
	
}
