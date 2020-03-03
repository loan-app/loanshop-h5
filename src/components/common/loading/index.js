import vue from 'vue'
const LoadingCpn = vue.extend(require('./loading.vue'))

let instance;

export const Loading = function(txt, options = {}) {
	if(txt) {
		options.loadTxt = txt;
	}
	if(instance) {
		instance.vm.inLoad && instance.close();
	} 
	instance = new LoadingCpn({
		data: options,
	})
	instance.vm = instance.$mount();
	document.body.appendChild(instance.vm.$el);
	return instance.vm;
}

Loading.close = function() {
	instance && instance.close();
}

export default {
	install(vue, options = {}) {
		if(this.installed) return;
		vue.prototype.$loading = Loading;
		vue.prototype.$toast = function(txt, duration = 2) {
			Loading('', {
				inLoad: false,
				timeoutTxt: txt,
				timeoutShowSec: duration,
			})
		}
	},
};