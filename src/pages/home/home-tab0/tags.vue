<style lang="less">
i.icon-xinyongqia.pos-center {
	top: 48%;
}
i.icon-taobao.pos-center {
	top: 52%;
}
</style>

<template>
	<div class="d-flex flex-wrap ta-c cat-icons bg-white bdb">
		<div class="item" v-for="(item, idx) in items" :key="idx" @click="onClick(item)">
			<span class="icon" slot="icon" :style="{ background: item.bgColor }">
				<i :class="'iconfont pos-center icon-'+item.icon"></i>
			</span>
			<p class="fz-12 gray">{{ item.title }}</p>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		onClick(item) {
			if(item.title == '全部分类') return this.$store.commit('SET_TAB', 1);
			const tag = item.tag || item.title
			this.$router.push('/tag-detail?tag='+tag+'&title='+item.title)
		}
	},
	data() {
		return {
			items: [
				{
					title: '小额极速贷',
					icon: 'flashlight_fill',
					bgColor: '#31b6d4',
				},
				{
					title: '大额借款',
					icon: 'tasklist_fill',
					bgColor: '#fe2c66',
				},
				{
					title: '信用卡贷款',
					tag: '有信用卡就能贷',
					icon: 'xinyongqia',
					bgColor: '#2f8ee1',
				},
				{
					title: '热门贷款',
					icon: 'qianbao',
					bgColor: '#ffb233'
				},
				
				{
					title: '有淘宝能贷',
					tag: '有淘宝就能贷',
					icon: 'taobao',
					bgColor: '#ff5000',
				},
				{
					title: '公积金贷款',
					tag: '有公积金就能贷',
					icon: 'gongjijin',
					bgColor: '#4e91b1',
				},
				{
					title: '贷款大全',
					icon: 'activity_fill',
					bgColor: '#ba46c1',
				},
				{
					title: '全部分类',
					icon: 'manage_fill',
					bgColor: '#73d429',
				},
			]
		}
	}
}
</script>
