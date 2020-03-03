<template>
	<div class="v-flex">
		
		<!--<loan-top-nav />-->

		<wrap :savePos="true" id="home-tab1">
			<div class="no-con" v-if="!loans.length">
				加载中...
			</div>
			<div v-for="(item, idx) in loans" :key="idx" v-else>
				<loan-list :loans="item.list" :limit="3" :showType="2" :title="item.title" v-if="item.list.length" :open-url="true"></loan-list>
			</div>
		</wrap>
	
	</div>

</template>

<script>
import api from 'src/api'
import { mapState } from 'vuex'
import loanList from 'components/loan-list'
import loanTopNav from 'components/loan-top-nav'

export default {
	components: {
		loanList,
		loanTopNav,
	},
	computed: {
		...mapState({
			loans: s => s.moreLoans,
		})
	},
	created() {
		this.$store.dispatch('getMoreLoan')
	},
	data() {
		return {
			
		}
	}
}
</script>