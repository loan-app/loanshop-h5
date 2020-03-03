<style lang="less">
.note-icon {
	width: 90px;
	max-height: 66px;
	margin-right: 10px;
}
.note-title {
	margin-bottom: 5px;
	font-size: 14px;
}
.note-desc {
	line-height: 1.2;
	height: 2.4em;
	margin-bottom: 5px;
	overflow: hidden;
}
.note-tag {
	color: #f5cd19;
}
</style>

<template>
	<wrap :savePos="true" id="home-tab2">
		<div class="no-con" v-if="!notes.length">
			加载中...
		</div>
		<group v-else>
			<cell v-for="(item, i) in notes" :key="i" is-link
				@click.native="openLink(item.goUrl, { _title: '资讯-'+item.id })">
				<img :src="item.imgUrl+'?x-oss-process=image/resize,w_150'" slot="icon" class="note-icon">
				
				<div class="note-title" slot="title">{{ item.title }}</div>
				<div class="fz-12" slot="inline-desc">
					<i :class="'iconfont badge-icon icon-star'" v-if="i<3"></i>
					<div class="note-desc gray9">{{ item.intro.cutStr(50) }}</div>
					<div>
						<b class="note-tag">{{ item.tag }}</b>
						<span class="fl-r gray9">{{ item.createdAt.split('T')[0] }}</span>
					</div>
				</div>
			</cell>
		</group>
	</wrap>
</template>

<script>
import { openLink } from 'src/assets/helper'

export default {
	data() {
		return {
			notes: []
		}
	},
	mounted() {
		this.$http.get('v2/app/note/info').then(res => {
			this.notes = res.body.notes
		})
	},
	methods: {
		openLink,
	}
}
</script>