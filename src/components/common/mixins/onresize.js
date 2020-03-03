
const getClientWidth = _ => document.documentElement.clientWidth;
const getClientHeight = _ => document.documentElement.clientHeight;

export default {
	data() {
		return {
			clientWidth: getClientWidth(),
			clientHeight: getClientHeight(),
		}
	},
	created() {
		window.onresize = _ => {
			this.clientWidth = getClientWidth();
			this.clientHeight = getClientHeight();
		}
	},
}