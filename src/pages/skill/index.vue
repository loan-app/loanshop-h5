<template>
	<page title="秘籍">
		<page-top-tab slot="wrap" :tabs="books" @setIndex="setIndex">
			<div class="con-side">
				<img src="/static/load.gif" class="pos-center load-img" v-if="loading">
				<note-list :list="curNotes" />
			</div>
		</page-top-tab>
	</page>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import noteList from './index-note-list'
import pageTopTab from 'components/page/page-top-tab'

export default {
	components: {
		noteList,
		pageTopTab,
	},
	data() {
		return {
			loading: true,
		}
	},
	computed: {
		...mapGetters([
				'books',
				'cur_book_idx',
			]),
		curNotes() {
			const notes = this.books[this.cur_book_idx].notes;
			return [notes];
		},
	},
	mounted() {
		this.initNote().then(_ => {
			this.loading = false;
		});
	},
	methods: {
		...mapActions([
				'initNote',
			]),
		setIndex(idx) {
			this.$store.state.cur_book_idx = idx;
		},
	}
}
</script>

