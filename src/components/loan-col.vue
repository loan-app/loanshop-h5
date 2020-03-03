<style lang="less">
.grid .badge {
    position: absolute;
    right: 0;
    top: 0;
    margin: 5px;
}
</style>

<template>
	<div class="grid grid-bd touch col-2 bdt">
		<div class="row d-flex flex-wrap">
			<div class="col d-flex" v-for="item in loans" :key="item.title"
				@click="$router.push({ path: '/loan/'+item.id, query: { url: item.applyUrl, openLink: /#in/.test(item.applyUrl), title: item.title } })">
				<img :src="item.logo + '?x-oss-process=image/resize,w_150'" class="left-icon">
				<div class="col-right">
					<p>
						{{item.title}}
					</p>
					<badge>{{ item.badge }}</badge>
					<div class="gray">
						<template v-if="showType == 2">
							<p>{{item.intro.cutStr(20)}}</p>
						</template>
						<template v-else>
							<p>期限：{{item.periodRange}}</p>
							最高<span class="in-red">{{getMoneyUnit(item.maxLoan)}}</span>
						</template>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getMoneyUnit } from 'assets/helper'
import badge from 'src/components/badge'

export default {
	components: {
		badge,
	},
	props: {
		loans: Array,
		showType: {
			type: Number,
			default: 1,
		},
	},
	methods: {
		getMoneyUnit,
	}
}
</script>