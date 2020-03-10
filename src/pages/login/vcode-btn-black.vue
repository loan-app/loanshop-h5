<style lang="less" scoped>
  .link_black{
    color: #333333;
    padding-left: 0.1rem;
    border-left: 1px solid #000;
  }
</style>

<template>
	<span class="link_black" @click="sendVcode"
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
			let title = '易财钱包'
			if(this.$route.path == '/channel-xjdk') {
				title = '秒花呗'
			} else {
				title = '易财钱包'
			}
			api.sendVcode(mobile, title, localStorage.getItem('uuid'), document.getElementById('img-code-in').value).then(body => {
				// this.isSetPsw = body.isSetP; //发送短信验证码后 可获取是否设置过密码
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
			}, res => {
				this.isSending = false;
				this.sendTxt = '发送验证码';
			})
		},
	}
}
</script>
