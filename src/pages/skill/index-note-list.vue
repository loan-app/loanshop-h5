<template>
	<div>
		<div class="card" v-for="items in list" :key="items">
			<div class="bdb d-flex line-sm" v-for="item in items" :key="item" @click="goDetail(item.id)">
				<div class="flex-1">
					<h2>{{item.title}}</h2>
				</div>
				<img :src="cdn_origin + item.main_img" class="mini">
			</div>
		</div>

	</div>
</template>

<script>
import { cdn_origin } from 'assets/helper'

export default {
	props: {
		list: Array, //二维数组
	},
	data() {
		return {
			cdn_origin,
		}
	},
	methods: {
		goDetail(id) {
			this.$router.push('/note/'+id);
		},
	},
}
</script>