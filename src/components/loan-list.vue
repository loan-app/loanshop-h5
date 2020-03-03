<template>
	<set-list>
		<li v-if="limit > 0">
			<div class="fz-14" style="width:100%;">
				<i v-if="isHome" :class="'iconfont icon-'+icon" ></i>
				{{ title }}
				<span class="fl-r link" v-if="isHome && onMore" @click="this.onMore">更多</span>
				</div>
		</li>
		<set-item v-for="(item, idx) in loans" @click.native="onClick(item)" :key="idx">
			<img :src="item.logo + '?x-oss-process=image/resize,w_150'" class="left-icon">
			<i :class="'iconfont badge-icon icon-' + item.badge.replace('homeHot', 'hot').toLowerCase()" 
				v-if="!!item.badge"></i>
			<div class="col-right">
				<h2>
					{{item.title}} <span class="in-red">最高{{getMoneyUnit(item.maxLoan)}}</span> 
					<!-- <badge>{{ item.badge }}</badge> -->
				</h2>
				<div class="gray">
					<p>{{item.intro}}</p>
					<p>
						<span class="in-red">{{item.periodRange}}</span>
						<span style="margin-left: 10px;">{{ item.rateRange }}</span>
						<span class="fl-r">
							{{item.applyNum}}人申请
						</span>
					</p>
				</div>
			</div>
		</set-item>
		<!-- <li class="more" v-if="limit > 0 && loans.length > limit" @click="$router.push('/tag-detail?title='+title)">
			<div class="link">查看更多</div>
		</li> -->
	</set-list>
</template>

<style scoped>
.iconfont {
			color: #20a0ff;
		}
</style>


<script>
import { mapGetters } from 'vuex'
import badge from 'components/badge'
import { getMoneyUnit, openLink } from 'assets/helper'
import api from 'src/api'

export default {
	props: {
		loans: Array,
		title: String,
		limit: Number,
		isHome: Boolean,
		openUrl: Boolean,
		icon: {
			type: String,
			default: 'remen',
		},
		onMore: Function,
	},
	components: {
		badge,
	},
	computed: {
		...mapGetters([
			'userBean',
		]),
	},
	methods: {
		getMoneyUnit,
		onClick(item) {
			api.logLoan(item.id)
			if(this.userBean) {
				if(this.openUrl)  openLink(item.applyUrl, { title: item.title })
				else  this.$router.push(`/loan/${item.id}?title=${item.title}`)
			}else {
				this.$router.push('/login')
			}
			// this.userBean ? this.$router.push(`/loan/${item.id}?title=${item.title}`) : 
			// openLink(item.applyUrl, { title: item.title })
		}
	}
}
</script>