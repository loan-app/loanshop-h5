<style scoped>
.bank-logo {
	display: block;
	width: 30px;
	margin-right: 5px;
	padding: 3px;
}
</style>

<template>
	<page title="信用卡">
		<group>
			<cell is-link v-for="(item, idx) in cards" :key="idx" @click.native="onClick(item)">
				<img :src="item.logo" slot="icon" class="bank-logo">
				<div slot="title">{{ item.title }}</div>
				<div class="fz-14">{{ item.intro }}</div>
			</cell>
		</group>
	</page>
</template>

<script>
import { mapGetters } from 'vuex'
import { openLink } from 'assets/helper'

export default {
	computed: {
		...mapGetters([
			'cards',
		])
	},
	methods: {
		onClick(item) {
			openLink(item.applyUrl, item)
		}
	}
}
</script>

