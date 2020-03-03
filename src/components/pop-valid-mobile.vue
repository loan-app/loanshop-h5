<template>
	<div>
		<div class="d-flex space-btw pos-r bdb pop-btm-head">
			<span class="link" @click="onCancel">取消</span>
			<p class="fz-16 pos-center">验证手机号</p>
			<vcode-btn class="fz-13" :diabled="!sendable" @sended="onSended"></vcode-btn>
		</div>
		<div class="pop-btm-body">
			<div class="input-wrap pos-r">
				<input type="tel" placeholder="请输入手机号" class="ta-c" 
					v-if="!sended || changed" v-model="form.mobile" autofocus="autofocus">
				<template v-else>
					<input type="tel" placeholder="请输入短信验证码" class="ta-c" @keyup="onKeyup" 
						v-model="form.vcode" autofocus="autofocus">
					<span class="link y-center pos-right-side fz-16" @click="login">登录</span>
				</template>
			</div>
			<div class="fz-12 ta-c" style="padding: 10px 0;">
				<template v-if="sended">
					短信已发送至{{form.mobile}}
					<span class="link" v-if="changed" @click="changed = false">继续验证</span>
					<span class="gray" v-else @click="changed = true">更换手机号</span>
				</template>
				<template v-else>
					验证后可访问浏览历史，<span class="gray" @click="$emit('stepover')">先跳过</span>
				</template>
			</div>
			<!--<keyboard></keyboard>-->
		</div>
	</div>
</template>

<script>
import { ruleMap } from 'assets/rule'
import { mapState, mapActions } from 'vuex'
import api from 'src/api'
import vcodeBtn from 'src/pages/login/vcode-btn'
import keyboard from 'src/components/common/popcon/keyboard'

export default {
	components: {
		vcodeBtn,
		keyboard,
	},
	computed: {
		...mapState({
			form: s => s.user.loginForm,
		}),
	},
	data() {
		return {
			sendable: false,
			sended: false,
			changed: false,
			sendedMobile: '',
			hint: '',
			sendTxt: '发送验证码',
		}
	},
	watch: {
		'form.mobile'(val) {
			this.sendable = ruleMap.mobile.test(val);
			if(this.sendedMobile) this.sended = val == this.sendedMobile;
		},
	},
	methods: {
		...mapActions([
			'getUserBean',
		]),
		onKeyup(e) {
			if(e.keyCode == 13) {
				console.log(this.form.vcode)
				this.login();
			}
		},
		async login() {
			if(!ruleMap.vcode.test(this.form.vcode)) return this.$toast('请输入正确的验证码');
			this.$loading('登录中');
			const data = await api.login(this.form.mobile, this.form);
			this.form.vcode = '';
			await this.getUserBean();
			this.$loading.close();
			this.$toast(data.msg);
			this.$emit('close');
			setTimeout(() => {
				this.$emit('login');
			}, 800)
		},
		onSended() {
			this.sended = true;
			this.changed = false;
			this.sendedMobile = this.form.mobile;
		},
		onCancel() {
			this.$emit('close')
		}
	}
}
</script>


<style lang="less">
.pop-btm-head {
	padding: 12px 15px;
}
.input-wrap {
    padding: 10px;
    text-align: center;
	input {
		background: #eee;
		border: none;
		border-radius: 30px;
		padding: 8px;
		font-size: 15px;
		width: 70%;
	}
}
</style>

