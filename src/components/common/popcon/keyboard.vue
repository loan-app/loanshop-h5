<template>
	<div class="keyboard ov-h ta-c">
		<div class="key bdl bdb" v-for="i in 9">{{i}}</div>
	</div>
</template>

<script>
export default {
  
}
</script>

<style lang="less">
.keyboard {
	background: #f5f5f5;
	.key {
		padding: 14px 0;
		font-size: 20px;
		float: left;
		width: 33.33%;
		width: calc(~"100%/3");
		cursor: pointer;
		&.hover {
			background: #ddd;
		}
	}
}
</style>
