<style>
.qr-img {
	display: block;
	width: 200px;
    margin: 50px auto 20px;
}
.cell-icon1 {
    margin-right: 10px;
	font-size: 20px;
}
</style>
<template>
	<page title="关于我们">
		<div class="ta-c m20-0 lh-15" @click="showInfo">
			<img id="wechat" src="./wechat_us.png" @click="saveImg" alt="微信群二维码" style="height: 220px;border-radius: 20px;display:none;">
			<p class="gray fz-12" style="display:none;">(点击图片在浏览器打开并下载!)</p>
			<p>{{ app_name }}</p>
			<p class="gray fz-12">v{{ app_ver }}</p>
		</div>
		<img id="save_img" />

		<!-- <group>
			<cell title="微信公众号" value="jieqianba56">
				<i class="iconfont icon-weixin cell-icon1" slot="icon" style="color: #07ae13;"></i>
			</cell>
		</group> -->

		<!-- <div class="gray fz-14 ta-c m20-0">
			<p>福州海西红叶信息技术有限公司</p>
		</div> -->

	</page>
</template>

<script>
export default {
	data() {
		return {
			app_ver: 1,
			app_name: '',
		}
	},
	mounted() {
		this.app_name = Param.app_name
		this.app_ver = Param.app_ver || Param.version || '1.0'
	},
	methods: {
		showInfo() {
			const msg = `${window.innerWidth}, ${window.innerHeight}`
			// this.$toast(msg)
		},
		saveImg() {
			if(window.Param.inWechat) {
				alert('保存图片请在浏览器中打开！');
			}
			var src = document.getElementsByTagName('img')[0].getAttribute('src')
      var a = document.createElement('a')  
      var event = new MouseEvent('click')  
      a.download = "微信交流群二维码" || '下载图片名称'  
      a.href = src
      a.dispatchEvent(event)  	

			//html2canvas 保存截图
			// html2canvas(document.getElementById('wechat'), {
			// 	useCORS: true,
			// }).then(canvas => {
			// 	document.getElementById('app').appendChild(canvas);
			// 	const imgbase64 = canvas.toDataURL();
			// 	const saveImg = document.getElementById('save_img');
			// 	saveImg.src = imgbase64;
			// 	// document.getElementById('app').appendChild(img);
			// 	// console.log(imgbase64, canvas);
			// })
		}
	}
}
</script>
