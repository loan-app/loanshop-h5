<template>
	<page title="易财钱包" :no-back="true">
		<div class="ta-c" style="margin-top: 80px;">
			<img src="./icon_1024.png"
				style="width: 160px;">
			<!-- <p class="gray fz-12">扫一扫下载APP</p> -->

			<button class="btn" style="margin-top: 40px;" @click="downApp">立即借钱</button>
			<a data-toggle="modal" id="inhouseClick" href="http://wapxk.com/wapindex-1000-5980.html" style="color: #1abc9c;">
                    <i class="fa fa-hand-o-right" aria-hidden="true" style="padding-right:5px;"></i>"ios 未受信任的企业级开发者"的解决办法</a>
		</div>
	</page>
</template>

<script>
import api from 'src/api'
export default {
	data() {
		return {
			// TODO 添加测试和生产的区分环境
			link: 'https://www.koudaixiaozhan.com',// 生产
			// link: 'https://47.111.165.27', //测试环境 
		}
	},
	mounted() {
		if(Param.plat == 1) this.link = 'https://itunes.apple.com/cn/app/%E9%92%B1%E8%A2%8B%E5%AD%90%E7%AE%A1%E5%AE%B6/id1451149739?mt=8' //iphone
		if(Param.plat == 2) this.link = 'http://loan56.oss-cn-beijing.aliyuncs.com/qiandaizi-release.apk'
		
	},
	methods: {
		downApp() {
      // if(Param.plat == 2 && Param.inWechat) return alert('请在浏览器中打开')
			if(Param.inWechat && Param.plat == 2) return alert('点击右上角，请选择在浏览器中打开！')
			let param = {
				path: localStorage.getItem('path'),
				prePath: localStorage.getItem('prePath'),
				query: {
					uuid: localStorage.getItem('uuid'),
				}
			}
			const channel = localStorage.getItem('channel')
			if(channel) {
				param = {
					...param,
					query: {
						...param.query,
						channel,
					}
				}
			}
			api.logRoute(param).then(data => {
				console.log(data)
			})
			location.href = this.link
		}
	}
}
</script>

