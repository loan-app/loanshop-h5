<template>
	<div class="bg-choose">
		<set-list class="no-bd mt-0">
			<li class="ta-c" :class="{ 'nav-color': item.isRed }" @click="$emit('choose', item)"
				v-for="(item, idx) in actions" :key="idx">
				{{item.label}}
			</li>
		</set-list>
		<set-list class="no-bd mt-5">
			<li class="ta-c" @click="$emit('cancel')">
				{{cancelTxt}}
			</li>
		</set-list>
	</div>
</template>

<script>
export default {
	props: {
		actions: Array,
		cancelTxt: {
			type: String,
			default: '取消',
		},
	}
}
</script>

