<template>
	<div class="v-flex">
		<slot name="stabar">
			<div class="stabar"></div>
		</slot>
		<div style="height: 0.40rem;background:#20a0ff;"  v-if="!this.isHasNav && title!='融花花' && title !='贷款' && title !='我的'"></div>
		<slot name="navbar" v-if="!this.isHasNav && title!='融花花' && title !='贷款' && title !='我的'">
			<div class="navbar bdb" @click="scrollToTop" v-if="true" :textDev="this.isHasNav" >
				<!-- 头部导航条 -->
				<!-- 左边返回键按钮 -->
				<slot name="back">
					<div class="item back" :class="{ no_arrow:noBackArrow||this.backTxt=='取消' }" 
						@click="onNavBack" v-if="!noBack">
						<i class="arrow"></i>
						<span class="txt y_center">{{backTxt}}</span>
					</div>
				</slot>
				<!-- 中间标题 -->
				<h1 class="pos_center">
					{{title}}
					<sub>{{ subTitle }}</sub>
				</h1>
				<!-- 右边菜单按钮 -->
				<slot name="menu">
					<div class="item menu" v-if="menuIcon||menuTxt" @click="onClickMenu">
						<span class="txt pos_center">
							<i :class="`icon-${menuIcon}`" v-if="menuIcon"></i>
							{{menuTxt}}
						</span>
					</div>
				</slot>
			</div>
		</slot>
		<slot name="subnav"></slot>

		<!-- 可滚动内容区域 -->
		<div v-if="$slots.wrap" class="flex-1" style="overflow: hidden;position: relative;">
			<slot name="wrap"></slot>
		</div>
		<div class="page-wrap flex-1" v-else-if="$slots.con">
			<div class="page-con">
				<slot name="con"></slot>
			</div>
		</div>
		<!-- iScroll弹性滚动，体验更佳 -->
		<wrap :id="wrapId" ref="wrap" v-else>
			<slot></slot>
		</wrap>

		<!-- 底部自定义 -->
		<slot name="btm"></slot>

	</div>
</template>

<script>
import { getSiblings, getHeight } from '../js/domhelper'
import wrap from './wrap'
import { constants } from 'http2';

const config = {
	noNavBar: false,
}

export default {
	name: 'page',
	data() {
		return {
			isHasNav: false,
		}
	},
	props: {
		title: { type:String },
		subTitle: { type:String },
		backTxt: { type:String, default: '返回' },
		menuTxt: { type:String },
		menuIcon: { type:String },
		noBack: { type:Boolean },
		onBack: { type:Function },
		noBackArrow: { type:Boolean },
		vScrollbar: { type:Boolean },
		noNavBar: { type:Boolean, default: config.noNavBar },
	},
	computed: {
		wrapId() {
			return this.$parent.$vnode.tag.replace('vue-component-', '');
		},
		// isHasNav(){
		// 	console.log(this.$router.history.current.query.tab);
		// 	return this.$router.history.current.query.tab || this.$router.history.current.query.tab == 0  ? true : false;
		// } 
	},
	// updated() {
	// 	this.isHasNav = this.$router.history.current.query.tab || this.$router.history.current.query.tab == 0  ? true : false;
	// },
	created(){
		this.isHasNav = this.$router.history.current.path === "/" ? true : false;
	},
	watch: {
		"$route"(val, old) {
			this.isHasNav = val.path === "/" ? true : false;
			// this.$nextTick(function(){
			// 	this.isHasNav = val.path === "/" ? true : false;
			// });
		}
	},
	methods: {
		onNavBack() {
			if(typeof this.onBack=='function') this.onBack();
			else this.$router.back();
		},
		onClickMenu() {
			this.$emit('clickMenu', this.menuTxt);
		},
		refresh() {
			const wrap = this.$refs.wrap;
			// console.log(wrap)
			if(wrap) wrap.refresh();
		},
		scrollToTop() {
			// const wrap = this.$refs.wrap;
			// if(wrap) return wrap.scrollToTop();
			// console.log(event)
			if(/navbar/.test(event.target.className)) window._scrollToTop()
		},
	},
	components: {
		wrap
	},
}
</script>

<style>

</style>