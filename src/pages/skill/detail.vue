<template>
	<page title="贷款攻略" class="white-con" v-if="note">
		<div class="con-side">
			<h2 class="h-center">
				{{note.title}}
			</h2>
			<p class="gray sub-time fz-12 hide">
				{{note.date}}
			</p>
			<div class="gray6 content" v-html="note.content">
				
			</div>
		</div>
	</page>
	<page-loader v-else></page-loader>
</template>

<script>
import api from 'src/api'
import { cdn_pre } from 'assets/helper'
import pageLoader from 'components/page/page-loader'

export default {
	components: {
		pageLoader,
	},
	data() {
		return {
			note: null,
		}
	},
	mounted() {
		const id = this.$route.params.id;
		api.getNoteDetail(id).then(data => {
			data.content = data.content
				.replace(/href="([^""]*)"/gm, 'onclick="window.openLink(\'$1\')"') //
				.replace(new RegExp('/static/', 'gm'), cdn_pre);
			this.note = data;
		})
	}
}
</script>

<style lang="less">
.sub-time {
	margin: 5px 0 15px;
}
.content {
	margin-top: 15px;
	line-height: 1.5;
	user-select: text;
	word-wrap: break-word;
	font-size: 15px;
	p {
		margin-bottom: 15px;
	}
	.image-package {
		max-width: 500px;
		margin: 10px auto;
		img {
			width: 100%;
			display: block;
		}
		.image-caption {
			width: 100%;
			padding: 5px;
			margin: 0 auto;
			border-bottom: 1px solid #d9d9d9;
			font-size: 24px;
			color: #999;
			text-align: center;
			transform: scale(.5);
			transform-origin: 50% 0;
		}
	}
}
</style>
