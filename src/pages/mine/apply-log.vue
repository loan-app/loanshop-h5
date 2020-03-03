<template>

	<page title="浏览记录">
		<page-top-tab slot="wrap" :tabs="tabs" @setIndex="setIndex">
			<set-list class="simple-card log-list" v-if="curLog.length">
				<set-item v-for="(item, idx) in curLog" :key="idx" v-if="item.applyUrl"
					@click.native="goDetail(item)">
					<div class="y-center icon-wrap">
						<i class="left-icon" :class="'bk-logo-' + item.id" v-if="curTab.name == 'bank'"></i>
						<img :src="item.logo" alt="" class="left-icon" v-else>
					</div>
					<div>
						<p>{{item.title}}</p>
						<div class="fz-12 gray sub">
							最近访问: {{ item.lastTime.toT8Time() }}
						</div>
					</div>
					
					<!--<span class="right fz-13">
						{{ item.count }}次访问
					</span>-->
				</set-item>
			</set-list>

			<div class="no-con" v-else>
				{{ loading ? '正在加载...' : '暂无记录' }}
			</div>
		</page-top-tab>
	</page>
</template>

<script>
import api from 'src/api'
import { mapState } from 'vuex'
import pageTopTab from 'components/page/page-top-tab'
import { openLink } from 'assets/helper'

export default {
	components: {
		pageTopTab,
	},
	methods: {
		setIndex(idx) {
			this.curIndex = idx;
		},
		goDetail(item) {
			// $router.push(`/log/${curTab.name}/${item.id}`)
			openLink(item.applyUrl)
		}
	},
	computed: {
		...mapState({
			logs: s => s.apply.logs,
		}),
		curTab() {
			return this.tabs[this.curIndex];
		},
		curLog() {
			return this.logs[this.curTab.name];
		}
	},
	data() {
		return {
			curIndex: 0,
			loading: true,
			tabs: [
				{
					title: '贷款',
					name: 'loan',
				},
				{
					title: '信用卡',
					name: 'bank',
				},
			]
		}
	},
	
	async mounted() {
		await this.$store.dispatch('apply/getLogs');
		this.loading = false;
	}
}
</script>

<style lang="less">
ul.log-list {
	li.more {
		padding-top: 10px;
		padding-bottom: 10px;
		p {
			font-size: 16px;
		}
		div.sub {
			margin-top: 5px;
		}
	}
}
</style>
