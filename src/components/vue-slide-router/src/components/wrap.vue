<template>
	
<div class="scroll-wrap flex-1" :class="{ 'h-scroll': hScroll }" :id="wrapId">
	<div class="scroll-con" :style="{ 'min-height': minHeight }">
		<slot></slot>
	</div>
</div>

</template>

<script>
import '../js/iscroll'
import { isAndroid } from '../js/domhelper'

let wrapPos = window.wrapPos = window.wrapPos || {};
let _scrollMaps = window._scrollMaps = window._scrollMaps || {};

window._scrollToTop = function() {
	const wraps = window.document.querySelectorAll('.scroll-wrap');
	[].slice.call(wraps).forEach(item => {
		const _scroll = window._scrollMaps[item.id]
		if(_scroll) {
			_scroll.refresh()
			_scroll.scrollTo(0, 0, 180)
		}
	})
}

export default {
	name: 'wrap',
	props: {
		id: String,
		savePos: {
			type: Boolean,
			default: false,
		},
		hScroll: {
			type: Boolean,
			default: false,
		},
		vScroll: {
			type: Boolean,
			default: true,
		},
		vScrollbar: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			isPosSet: false,
			minHeight: null,
		}
	},
	computed: {
		wrapId() {
			var id = this.id || Date.now();
			return `wrap-${id}`;
		},
		scrollOptions() {
			const inputEnable = function (e) {
				let target = e.target;
				while (target.nodeType != 1) target = target.parentNode;
				if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
					e.preventDefault();
			}
			const options = { 
				bounce: true,
				onBeforeScrollStart: inputEnable,
				handleClick: isAndroid,
				vScroll: this.vScroll,
				hScroll: this.hScroll,
				vScrollbar: this.vScrollbar,
				hScrollbar: false,
				onScrollEnd: _ => {
					if(this.savePos && this.id) {
						const { x, y } = this.scroll;
						wrapPos[this.id] = { x, y };
					}
				}
			};
			// options.onMove = scroll => {}
			return options;
		}
	},
	methods: {
		refresh() {
			this.$nextTick(() => {
				if(this.vScroll) this.minHeight = this.$el.offsetHeight + 'px';
				if (!this.scroll) {
					this.scroll = new iScroll(this.wrapId, this.scrollOptions);
					_scrollMaps[this.wrapId] = this.scroll;
				}
				// this.scroll.options = this.scrollOptions;
				this.scroll.refresh();
				if(this.savePos && !this.isPosSet) {
					if(!this.id) console.warn("wrap's savePos need id prop ");
					else {
						const pos = wrapPos[this.id];
						if(pos) this.scroll.scrollTo(pos.x, pos.y, 0);
					} 
					this.isPosSet = true;
				}
			})
		},
		scrollToTop() {
			this.scroll.scrollTo(0, 0, 200);
		}
	},
	mounted() {
		this.refresh()
	},
	updated() {
		this.refresh()
		this.$nextTick(_ => {
			[].slice.call(this.$el.getElementsByTagName('img')).forEach(img => {
				img.onload = _ => this.scroll.refresh();
			})
		})
	},
	beforeDestroy() {
		_scrollMaps[this.wrapId] = null;
	},
}

</script>