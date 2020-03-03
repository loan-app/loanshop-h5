<template>
	
	<div :style="{ opacity:opacity }" class="flex-slider">
		<ul ref="ul" @swipe="onSwipe" class="d-flex"
			:style="{ 
				width: ulFlexWidth+'px', 
				transform: `translateX(${transX}px)`,
				transition: ulDuration>0? `transform linear ${ulDuration}ms` : 'none',
			}">
			<slot></slot>
		</ul>
		<div class="x-center dots">
			<span class="dot" v-for="(_, idx) in liNum" :class="{ active: curIndex==idx }"></span>
		</div>
	</div>

</template>

<script>
import { addRule } from 'assets/helper'
import onresize from './mixins/onresize'

export default {
	name: 'flex-slider',
	mixins: [ onresize ],
	props: {
		gap: {
			type: Number,
			default: 20
		},
		liWidth: {
			type: Number,
			default: 1
		},
		transition: {
			type: Number,
			default: 200
		}
	},
	data() {
		return {
			curIndex: 0,
			swipeDx: 0,
			notrans: false,
			items: [],
			liNum: 1,
			opacity: 0,
			ulDuration: 0,
			loopDuration: 300,
		}
	},
	created() {
		this.initStyle();
		this.$nextTick(_ => {
			this.items = [].slice.call(this.$refs.ul.children);
			this.liNum = this.items.length;
			this.opacity = 1;
		})
	},
	computed: {
		ulFlexWidth() {
			const len = this.liNum;
			return this.itemWidth*len + this.gap*(len - 1);
		},
		itemWidth() {
			return this.clientWidth*this.liWidth;
		},
		transX() {
			var sideWidth = (this.clientWidth - this.itemWidth)/2;
			return -(this.itemWidth + this.gap)*this.curIndex + sideWidth + this.swipeDx;
		}
	},
	watch: {
		itemWidth() {
			this.initStyle();
		},
		swipeDx(val) {
			return;
			var arr = [this.curIndex];
			if(this.curIndex>0 && val>=0) arr.push(this.curIndex-1);
			if(this.curIndex<this.liNum-1 && val<=0) arr.push(this.curIndex+1);
			arr.forEach(idx => {
				var item = this.items[idx];
				var rect = item.getClientRects()[0];
				// console.log(rect)
				var leftIn = rect.left>0 && rect.left<this.clientWidth;
				var rightIn = rect.right>0 && rect.right<this.clientWidth;
				var inside = [];
				if(leftIn) inside = [0, this.itemWidth - (rect.right - this.clientWidth)];
				else if(rightIn) inside = [this.itemWidth - rect.right, this.itemWidth];
				var centerX0 = rect.width/2;
				var centerX1 = inside[0] + (inside[1]-inside[0])/2;
				const tarStyle = item.children[0].style;
				if(val==0) {
					tarStyle.transition = `transform linear ${this.transition}ms`;
					tarStyle.transform = idx==this.curIndex? 'none' : `translateX(${idx>this.curIndex?'-':''}50%)`;
				} else {
					tarStyle.transition = 'none';
					tarStyle.transform = `translateX(${centerX1 - centerX0}px)`;
				}
				// item.setAttribute('inside', inside)
			})
		},
		curIndex() {
			
		},
		ulDuration(val) {
			if(val>0) setTimeout(_ => {
				this.ulDuration = 0
				this.inLoop = false
				this.loop()
			}, this.ulDuration);
		}
	},
	methods: {
		initStyle() {
			addRule('ul.flex li', 'width: '+this.itemWidth+'px');
		},
		setIndex(id) {
			this.curIndex = id;
		},
		onSwipe(e) {
			if(this.ulDuration>0) return;
			e.stopPropagation();
			const { orien, dx, duration, end } = e.swipeData;
			this.inSwipe = !end;
			if(orien=='y') return;
			const bounce = this.curIndex==0&&dx>0|| this.curIndex==this.liNum-1&&dx<0;
			if(end) {
				this.ulDuration = this.transition;
				if(!bounce && Math.abs(dx) > 30) {
					if(duration<200 || Math.abs(dx)>this.itemWidth/3) this.curIndex += dx>0? -1 : 1;
				}
				this.swipeDx = 0;
			} else {
				this.ulDuration = 0;
				this.swipeDx = bounce ? dx/2 : dx;
			}
		},
		loop() {
			this.loopTiming && clearTimeout(this.loopTiming)
			this.loopTiming = setTimeout(_ => {
				if(this.inSwipe) return;
				if(this.ulDuration>0) return;
				this.ulDuration = this.loopDuration;
				this.inLoop = true;
				if(this.curIndex == this.liNum - 1) this.curIndex = 0;
				else this.curIndex += 1;
			}, 3000)
		}
	},
	mounted() {
		this.loop();
	}
}

</script>
