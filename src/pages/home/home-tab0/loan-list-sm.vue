<style lang="less">
.loan-list-sm {
	padding: 10px 0;
	margin: 10px 0;
	.title {
		.iconfont {
			color: #20a0ff;
		}
	}
	.item {
		margin-top: 10px;
		padding-top: 5px;
		width: 33.33%;
		width: calc(~'100%/3');
		line-height: 1.4;
		cursor: pointer;
		&.hover {
			background: #f5f5f5;
		}
		.iconfont {
			font-size: 40px;
		}
	}
}
.img-icon {
	display: inline-block;
	font-size: 45px;
	width: 1em;
	height: 1em;
	// padding: 2px;
}
.bank-list .img-icon {
	padding: 5px;
}
</style>

<template>
	<div class="bg-white loan-list-sm" v-if="loans.length">
		<div class="fz-14 con-side-h title">
			<i :class="'iconfont icon-'+icon"></i>
			{{ title }}
			<span class="fl-r link" v-if="onMore" @click="this.onMore">更多</span>
		</div>
		<div class="d-flex flex-wrap ta-c">
			<div class="item lh-2" v-for="(item, i) in loans" :key="i" @click="onClick(item)">
				<span :class="'iconfont ' + item.icon" v-if="item.icon" ></span>
				<img :src="item.logo + '?x-oss-process=image/resize,w_150'" class="img-icon" v-else>
				<p>{{ item.title }}</p>
				<p class="gray fz-12" v-if="detail">
					<span class="in-red">最高{{ getMoneyUnit(item.maxLoan) }}</span> 
					<!-- {{ item.periodRange }} -->
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import api from 'src/api'
import { mapGetters } from 'vuex'
import { getMoneyUnit, openLink } from 'assets/helper'

export default {
	props: {
		loans: Array,
		title: String,
		detail: Boolean,
		openUrl: Boolean,
		icon: {
			type: String,
			default: 'remen',
		},
		onMore: Function,
	},
	computed: {
		...mapGetters(['userBean']),
	},
	methods: {
		getMoneyUnit,
		onClick(item) {
			api.logLoan(item.id);
			if(this.userBean) 
				if(this.openUrl) openLink(item.applyUrl, { title: item.title })
				else this.$router.push(`/loan/${item.id}?title=${item.title}`)
			else
				this.$router.push('/login');
		}
	}
}
</script>


