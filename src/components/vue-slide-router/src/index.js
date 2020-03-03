import App from './components/app'
import Wrap from './components/wrap'
import Page from './components/page'
import swipeInit from './js/touch-swipe'
import onRouter from './router-listener'

export default {
	install(Vue, opts = { }) {
		if(this.installed) return;
		
		const options = Object.assign({
			hoverClass: 'hover', //按下元素之后会添加的class，松开会移除
		}, opts);

		swipeInit(options);
		
		App.created = function() {

			this.$nextTick(_ => {
				onRouter(this, opts);
			})

		}
		
		Vue.component(App.name, App);
		Vue.component(Wrap.name, Wrap);
		Vue.component(Page.name, Page);
	}
}