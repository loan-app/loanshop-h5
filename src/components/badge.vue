<template>
	<div class="badge" :class="(txt || '').toLowerCase()" v-show="!!txt">
		<slot></slot>
	</div>
</template>

<script>
export default {
	computed: {
        txt() {
            return this.$slots.default[0].text
        }
    }
}
</script>

<style lang="less">
div.badge {
    background: #ff7527;
    color: #fff;
    padding: 2px 0 1px;
    border-radius: 10px;
    width: 40px;
    text-align: center;
    -webkit-transform: scale(.7);
    transform: scale(.7);
    font-size: 12px;
    &.hot {
    	background: #ff3535;
    }
    &.new {
    	background: #00a4f6;
    }
}
</style>