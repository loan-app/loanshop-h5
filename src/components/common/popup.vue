<template>
	<transition name="fade" @after-leave="afterLeave">
		<div class="top-mask popup" :style="{ top: top+'px' }" @click="clickMask">
			<div class="con" :class="[{ 'pos-center': from=='center' }, 'from-'+from]">
				<slot />
			</div>
		</div>
	</transition>
</template>

<script>
import { getDomHeight } from 'assets/helper'

export default {
	data() {
		return {
			top: null,
		}
	},
	props: {
		calcTop: {
			type: Boolean,
			default: false,
		},
		from: {
			type: String,
			default: 'top',
		},
	},
	methods: {
		clickMask(e) {
			if(e.target.className.match('top-mask')) {
				this.$emit('close');
			}
		},
		afterLeave() {
			this.$emit('closed');
		},
	},
	mounted() {
		if(this.calcTop) this.$nextTick(_ => {
			const $pre = this.$el.previousElementSibling;
			if($pre) {
				const rect = $pre.getBoundingClientRect();
				this.top = rect.height; //rect.top + 
				// console.log($pre, rect, this.top)
			}
		})
	},
}
</script>

<style lang="less">
.top-mask.popup {
	position: fixed;
	overflow: hidden;
	background: rgba(0, 0, 0, 0.45);
	.con {
		transition: all ease 260ms;
		background: #fff;
		&.from-bottom {
			position: absolute;
			bottom: 0;
			width: 100%;
		}
	}
}
.fade-leave-active {
	transition: background ease-in-out 300ms;
}
.fade-enter-active, .fade-leave-active {
	&.popup {
		background: transparent;
	}
	.from-top {transform: translateY(-100%);}
	.from-bottom {transform: translateY(100%);}
	.from-left {transform: translateX(-100%);}
	.from-right {transform: translateX(100%);}
	.from-center {
		// transform-origin: 50% 50%;
		transform: scale(.9) translate(-50%, -50%);
	}
}

</style>