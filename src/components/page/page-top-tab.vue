<template>
	<div class="v-flex pos-mask">
		<wrap :savePos="true" :vScroll="false" id="home-tab3-subtab" class="flex-init">
			<ul class="topnavbar grid-bd touch d-flex ta-c">
				<li class="flex-1 col" :class="{ active: idx==curIndex }" @click="setCurIndex(idx)"
					v-for="(item, idx) in tabs">
					{{item.title}}
				</li>
			</ul>
		</wrap>

		<wrap>
			<slot></slot>
		</wrap>
		
	</div>
</template>

<script>
export default {
	props: {
		tabs:Array,
	},
	data() {
		return {
			curIndex: 0,
		}
	},
	methods: {
		setCurIndex(idx) {
			this.curIndex = idx;
			this.$emit('setIndex', idx);
		},
	},
}
</script>
