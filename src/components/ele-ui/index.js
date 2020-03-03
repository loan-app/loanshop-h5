import Message from 'components/ele-ui/message'
import './ele-css/index.less'

module.exports = {
	install(Vue, options = {}) {
		if(this.installed) return;
		Vue.prototype.$message = Message;
	},
	Message,
}