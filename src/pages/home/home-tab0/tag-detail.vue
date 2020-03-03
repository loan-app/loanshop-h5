<template>
	<page :title="title">
		<div class="no-con" v-if="!loans.length">
			正在加载...
		</div>
		<loan-list :loans="loans" v-else></loan-list>
	</page>
</template>

<script>
import loanList from 'components/loan-list'

export default {
	components: {
		loanList,
	},
	data() {
		return {
			title: '',
			loans: [],
		}
	},
	mounted() {
		this.title = this.$route.query.title
		const tag = this.$route.query.tag || this.title
		setTimeout(() => {
			this.$http.get('v2/app/loan-tag/' + tag).then(res => {
				this.loans = res.body
			})
		}, 300)
	}
}
</script>
