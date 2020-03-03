export default {
	methods: {
		removeDom() {
			this.$destroy(true);
		},
	},
	destroyed() {
		this.$el && this.$el.parentNode.removeChild(this.$el);
	}
}