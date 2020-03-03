<style lang="less">
@import '../../css/var';
.m20-0 {
	margin: 20px 0;
}
.login-icon {
	font-size: 50px;
	line-height: 1;
}

.my-settings {
	.iconfont {
		font-size: 1.3em;
		color: @nav-color;
		position: relative;
		top: 2px;
	}
}
</style>

<template>
	<wrap slot="wrap">
		<div class="ta-c theme-bg">
			<div @click="clickUser" style="padding: 40px;display: inline-block;">
				<i class="iconfont icon-lianxiren login-icon"></i>
				<div style="margin-top: 10px;">
					{{ !userBean ? '点击登录' : userBean.mobile }}
				</div>
			</div>
		</div>
		
		<group v-for="(items, i) in settings" :key="i" class="my-settings">
			<cell @click.native="goPage(item)" v-for="(item, j) in items" :key="j" is-link>
				<div slot="title">
					<i :class="'iconfont ' + item.icon"></i>
					{{ item.title }}
				</div>
			</cell>
		</group>
		
	</wrap>
</template>

<script>
import { mapGetters } from 'vuex'
import { openLink } from 'assets/helper'

export default {
	methods: {
		goPage(item) {
			let path = item.path;
			if(item.needLogin && !this.userBean) {
				path = '/login';
			}
			if(/^http/.test(path)) openLink(path);
			else this.$router.push(path)
		},
		clickUser() {
			this.$router.push(!this.userBean ? '/login' : '/setting')
		}
	},
	mounted() {
		console.log(this.userBean);
	},
	updated() {
		console.log(this.userBean);
	},
	computed: {
		...mapGetters([
			'userBean',
		]),
	},
	data() {
		return {
			settings: [
				[
					// {
					// 	title: '浏览记录',
					// 	path: '/apply-log',
					// 	needLogin: true,
					// },
					// {
					// 	title: '房贷计算器',
					// 	path: 'https://m.iloan666.com/finance-tools/loan-computor/index.html', 
					// 	// 'http://5.9188.com/finance_tools/mortgage/index.html',
					// 	icon: 'icon-jisuanqi',
					// },
					// {
					// 	title: '办卡进度查询',
					// 	path: '/query-card',
					// 	icon: 'icon-yinhangqia',
					// },
				],
				[
					// {
					// 	title: '新口子交流群',
					// 	path: '/contact',
					// },
					{
						title: '关于我们',
						path: '/about-us',
						icon: 'icon-tishi1'
					},
				],
				[
					{
						title: '设置',
						path: '/setting',
						needLogin: true,
						icon: 'icon-shezhi'
					},
				],
			],
		};
	}
}
</script>

