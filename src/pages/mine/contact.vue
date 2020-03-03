<template>
	<page title="新口子交流群" class="con-white" menuTxt="加群" @clickMenu="showQQ">
		<img src="/static/qq-qun.jpeg" class="qq-qun" @click="showQQ">
	</page>
</template>

<script>
import { openLink } from 'assets/helper'
export default {
	methods: {
		showQQ() {
			openLink('https://shang.qq.com/wpa/qunwpa?idkey=5ccd2411f14b126bbc07c92287f7753223ed67f0e55b84fc828a57568aa1a10e')
			// ''
		},
	},
}
</script>


<style scoped>
.qq-qun {
	display: block;
	width: 260px;
	margin: 30px auto;
}
</style>
