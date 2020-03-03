<template>
	<span class="link" @click="sendVcode"
		:class="{ disabled: !canSend || isSending }">
		{{sendTxt}}
	</span>
</template>

<script>
import api from 'src/api'
import { ruleMap } from 'assets/rule'
import { mapState } from 'vuex'

export default {
	computed: {
		...mapState({
			form: s => s.user.loginForm,
			setPswMap: s => s.user.setPswMap,
		}),
		canSend() {
			return ruleMap.mobile.test(this.form.mobile);
		},
	},
	data() {
		return {
			sendTxt: '获取验证码',
			isSending: false,
		}
	},
	methods: {
		sendVcode() {
			this.isSending = true;
			this.sendTxt = '发送中...';
			const mobile = this.form.mobile;
			let title = '融花花'
			// if(this.$route.path == '/channel-lwyx') {
			// 	title = '量无忧修'
			// } else if(this.$route.path == '/channel-xlh') {
			// 	title = '熊了花'
			// } else if(this.$route.path == '/channel-mxq' || this.$route.path =='/channel-ch1' || this.$route.path == '/channel-ch2'){
			// 	title = '融花花'
			// } else {
			// 	title = '融花花'
			// }
			api.sendVcode(mobile, title, localStorage.getItem('uuid'), document.getElementById('img-code-in').value).then(body => {
				// this.isSetPsw = body.isSetP; //发送短信验证码后 可获取是否设置过密码
				if(body.code == 0) {
					this.setPswMap[mobile] = body.isSetP;
					this.$emit('sended');
					this.sendTxt = '60';
					this.form.vcode = '';
					var second = 60;
					const timing = setInterval(_ => {
						second --;
						if(second <= 0) {
							this.sendTxt = '重发验证码';
							this.isSending = false;
							clearInterval(timing);
						} else {
							this.sendTxt = second + 's';
						}
					}, 1e3)
				} else {
					this.$toast(body.msg, 'success');
				}
			}, res => {
				this.isSending = false;
				this.sendTxt = '发送验证码';
			})
		},
	}
}
</script>
