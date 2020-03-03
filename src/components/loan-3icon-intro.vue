<template>
	<set-list>
		<li style="padding: 20px 0;">
			<div class="flex-1 ta-c" v-for="(item, i) in info" :key="i">
				<p class="gray6 fz-14" style="margin-bottom: 10px;">{{item.title}}</p>
				<p class="in-red">{{item.subinfo}}</p>
			</div>
		</li>
	</set-list>
</template>

<script>
export default {
	props: {
		info: Array,
	}
}
</script>