<template>
	<page title="手机号验证" :no-back="noBack">
		<div class="ta-c m20-0 lh-15" v-if="noBack">
			<img src="https://iloan.oss-cn-beijing.aliyuncs.com/b589d450-b566-11e7-8f6a-6b2b03080065.png?x-oss-process=image/resize,w_350" style="height: 100px;border-radius: 20px;">
		</div>
		<ul class="set-list pd-0" style="margin: 50px 0 40px;">
			<li>
				<input type="tel" v-model="form.mobile" placeholder="请输入手机号">
			</li>

			<li v-if="isShowVcode">
				<input type="tel" v-model="form.vcode" placeholder="请输入验证码">
				<vcode-btn class="y-center" style="right: 15px;" @sended="mapSetPsw" />
			</li>
			<li v-if="isShowPsw">
				<input type="password" v-model="form.psw"
					:placeholder="isSetPsw ? '请输入密码' : '请设置登录密码'">
			</li>
		</ul>
		<button class="btn" @click="onSubmit">立即登录</button>
		<p class="ta-c fz-12 link gray m20-0" v-if="!resetPsw && isSetPsw" @click="isByPsw = !isByPsw">
			{{isByPsw ? '短信验证登录' : '密码登录' }}
		</p>
	</page>
</template>

<script>
import vcodeBtn from './vcode-btn'
import api from 'src/api'
import rules from './rules'
import { ruleMap, checkInput } from 'assets/rule'
import { mapState, mapActions } from 'vuex'

export default {
	components: {
		vcodeBtn,
	},
	data() {
		return {
			noBack: false,
			isSetPsw: true,
			isByPsw: false,
			resetPsw: false,
		}
	},
	beforeCreate(){
    api.checkChannelIsEffective(Param.channelCode).then(data => {
        if(data.code == 0) {
          if(data.data) {
            alert('该渠道已经下线，请联系渠道商确认是否可用！');
            window.location.href = '/';
          }
        } else {
          alert(data.msg);
        }
    });
  },
	mounted() {
		if(Param.channelCode) this.noBack = true
		this.mapSetPsw();
		if(this.$route.query.resetPsw) {
			this.resetPsw = true;
		}
	},
	computed: {
		isShowPsw() {
			return this.resetPsw || this.isSetPsw === false || this.isByPsw;
		},
		isShowVcode() {
			return this.resetPsw || !this.isSetPsw || !this.isByPsw;
		},
		...mapState({
			form: s => s.user.loginForm,
			setPswMap: s => s.user.setPswMap,
		}),
	},
	watch: {
		'form.mobile'(val) {
			if(!ruleMap.mobile.test(val)) return;
			this.mapSetPsw();
		},
		isSetPsw(val) {
			if(val == undefined) this.isSetPsw = true; //未获取手机号是否设置过密码时，默认为可以显示密码登录
			if(!this.isSetPsw) this.isByPsw = false;
		},
	},
	methods: {
		...mapActions([
			'getUserBean',
		]),
		mapSetPsw() {
			this.isSetPsw = this.setPswMap[this.form.mobile];
		},
		async onSubmit() {
			const form = {};
			const { mobile, vcode, psw } = this.form;
			form.mobile = mobile;
			if(this.isShowVcode) form.vcode = vcode;
			if(this.isShowPsw) form.psw = psw;
			const msg = checkInput(form, rules);
			if(msg) {
				return this.$toast(msg);
			}
			this.$loading('登录中');
			const data = await api.login(mobile, form);
			this.form.vcode = ''
			this.form.psw = ''
			this.setPswMap[mobile] = true;
			await this.getUserBean()
			this.$loading.close();
			if(this.noBack) location.href = '#/download'
			else {
				this.$toast(data.msg, 'success');
				this.$router.back();
			}
		},

	},
}
</script>

