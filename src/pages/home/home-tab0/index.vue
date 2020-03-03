
<template>
	<wrap :savePos="true" id="home-tab0">

		<div>
			<swiper loop auto :aspect-ratio="420/750" :interval="4000" v-if="banners.length">
				<swiper-item v-for="(item, idx) in banners" :key="idx">
					<img :src="item.imgUrl" class="banner-img"
						@click="goBanner(item)">
				</swiper-item>
			</swiper>

			<loan-list :loans="hotLoans" title="热门贷款" :detail="true" :on-more="goToLoanTab" :open-url="true"></loan-list>
			<!-- <grid :cols="4">
				<grid-item :label="tag" :link="`/tag-detail?title=${tag}`" :key="i" v-for="(tag, i) in loanTags"></grid-item>
			</grid> -->

			<current-recommend  :loans="newLoans[0]" />
			<loan-list-detail :isHome="true" :loans="newLoans" title="最新推荐" :open-url="true" :on-more="goToLoanTab" :limit="10" icon="tubiao103"></loan-list-detail>
			<loan-list :loans="hotCards" title="信用卡" icon="xinyongqia" class="bank-list"
				:on-more="goToCards" :open-url="true"></loan-list>
			
		</div>
	</wrap>
</template>

<script type="script">
import { mapGetters } from 'vuex'
import loanList from './loan-list-sm'
import { openLink } from 'assets/helper'
import currentRecommend from './current-recommend'
import loanListDetail from 'components/loan-list.vue'
import { Swiper, SwiperItem } from 'vux'

export default {
	name: 'home-tab1',
	components: {
		loanList,
		currentRecommend,
		loanListDetail,
		Swiper, SwiperItem,
	},
	computed: {
		...mapGetters([
			'hotLoans',
			'newLoans',
			'banners',
			'hotCards',
			'userBean',
		]),
	},
	methods: {
		openLink,
		setTab(idx) {
			this.$store.commit('SET_TAB', idx);
		},
		goBanner(item) {
			this.userBean ? openLink(item.goUrl) : this.$router.push('/login');
		},
		goToLoanTab() {
			this.setTab(1)
		},
		goToCards() {
			this.$router.push('/credit-card')
		},
	},
	created() {
		this.$store.dispatch('initData')
	},
	data() {
		return {
			showBanner: true,
			// loanTags: ['无电话审核', '大额精选', '不查征信', '急速下款'],
		}
	},
	watch: {
		
	},
}

</script>

<style lang="less" scope>
	.vux-slider{
		overflow: hidden;
	}
</style>
