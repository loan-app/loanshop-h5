<template>
	<div>
		<set-list>
			<set-item v-for="(item, idx) in cards" :key="idx" @click.native="openLink(item)">
				<i class="left-icon" :class="`bk-logo-${item.id}`" :ref="'bankIcon'+item.id"></i>
				<div class="col-right">
					<h2>
						{{item.title}}银行
						<!--<badge :type="item.badge"></badge>-->
					</h2>
					<div class="gray">
						<p>{{item.intro}}</p>
					</div>
				</div>
			</set-item>
		</set-list>
	</div>
</template>

<script>
import badge from 'components/badge'
import { openLink } from 'assets/helper'

export default {
	components: {
		badge,
	},
	props: {
		cards: Array,
	},
	methods: {
		openLink(item) {
			Param.route = '/bank/'+item.id;
			const el = this.$refs['bankIcon'+item.id][0];
			const mat = window.getComputedStyle(el).backgroundColor.match(/\((.*)\)/);
			const opts = {
				title: item.title + '银行',
			};
			if(mat) opts.navColor = mat[1].split(', ');
			this.$router.push({ path: '/bank/'+item.id, query: { url: item.applyUrl, _static: 1, ...opts } })
			openLink(item.applyUrl, opts);
		},
	}
}
</script>