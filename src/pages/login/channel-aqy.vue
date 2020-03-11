<style lang="less" scoped>
  #app{
    height: 18.00rem;
  }
    .channel-container{
      overflow-y: auto;
      width: 100%;
      max-width: 750px;
      margin-left: auto;
      margin-right: auto;
      height: 19.00rem;
      min-height: 13.34rem;
      background: url('./img/dkm_bg_new.png' ) no-repeat;
      background-size: 100% 100%;
      .channel-bg{
        width: 100%;
        height: 4.92rem;
      }
      .login-content{
        width: 6.80rem;
        height: 5.58rem;
        border-radius: 0.04rem;
        position: absolute;
        top: 6.66rem;
        left: 0.35rem;
        background: url('./img/dkm_login_bg_new.png') no-repeat;
        background-size: 100% 100%;
        .content-pos{
          width: 6.86rem;
          height: 6.28rem;
          position: absolute;
          top: -1.12rem;
          background: #ffffff;
        }
      }
    }
    .banner{
      display: block;
      position: relative;
      width: 7.04rem;
      height: 2.82rem;
      margin: 0 auto;
      margin-top: 0.80rem;
    }
    .login-center{
      position: relative;
      height:auto;
      margin: auto;
      top: 0.30rem;
      border-radius: 0.15rem;
    }
    .input_style {
    position: relative;
    width: 6.15rem;
    height: 1.02rem;
    background: url('./img/dkm_input_new.png') no-repeat;
    background-size: 100% 100%;
    margin: 0 auto;
    margin-top: .5rem;
  }
    .input_style img {
    width: .46rem;
    height: .38rem;
    float: right;
    // margin: 0.36rem 0 0 0.4rem;
    // padding-right: 0.20rem;
  }
  .input_style input {
      float: left;
      // margin: 0.31rem 0 0 0.15rem;
      border: none;
      // border-left: 1px solid #b1afaf;
      outline: 0;
      width: 4.0rem;
      padding-left: 0.1rem;
      border-radius: 0;
      height: 1.02rem;
      border: none;
      display: block;
      border-bottom-left-radius: 0.75rem;
      border-top-left-radius: 0.75rem;
      text-indent: 0.30rem;
      font-size: 0.26rem;
  }
  .input_style input::-webkit-input-placeholder {
      color: #b1afaf
  }
    #code::before{
      height: 0;
    }
    .link{
      color: #2725ba;
      font-size: 0.30rem;
      font-weight:400;
    }
    #apply{
      width:6.15rem;
      height:1.00rem;
      background: url('./img/dkm_submit_new.png') no-repeat;
      background-size: 100% 100%;
      color:rgba(255,255,255,1);
      font-size: 0.36rem;
      margin: 0.40rem auto;
    }
    .agree{
      width: 100%;
      height: 0.26rem;
      display: flex;
      align-content: center;
      justify-content: center;
      align-items: center;
      margin-top: 0.60rem;
      img{
        width: 0.26rem;
        height: 0.26rem;
      }
      span{
        font-size:0.24rem;
        font-weight:400;
        color:rgba(255, 255, 255, 1);
        padding-left: 4px;
      }
    }
    .input_style .link{
      display: inline-block;
      height: .4rem;
      padding-left: 0.3rem;
      line-height: 0.4rem;
      border-left: 1px solid #2725ba;
      color: #2725ba;
    }
    .ICP{
      width: 100%;
      position: absolute;
      bottom: 0.20rem;
      text-align: center;
      font-size: 0.24rem;
      color: #c8b0b0;
    }
    .input1_val{
      border-radius: 0 0.75rem 0.75rem 0;
    }
    .login_top{
      position: absolute;
      top: 4.38rem;
      width: 6.79rem;
      height: 2.79rem;
      z-index: 10;
      left: 0.36rem;
    }
    .pic_bottom{
      position: absolute;
      width: 6.89rem;
      height: 3.52rem;
      left: 0.30rem;
      top: 14.60rem;
    }
    #img-code{
      width: 2.00rem;
      height: 1.00rem;
      border-top-right-radius: 0.50rem;
      border-bottom-right-radius: 0.50rem;
    }
</style>
<template>
    <div class="channel-container">
        <img src="./img/aqy_text.png" class="banner"/>
        <img src="./img/dkm_login_p.png" class="login_top" />
        <div class="login-content">
          <div class="login-center">
              <ul class="pd-0" id="set-list" style="margin-bottom: 0.50rem;margin-top:0.88rem;">
                <li id="phone" class="input_style">
                    <input type="tel" v-model="form.mobile" maxlength="11" style="width: 6.13rem;border-top-right-radius: 0.75rem;border-bottom-right-radius: 0.75rem" placeholder="请输入手机号" class="input1_val">
                </li>
                <!-- <li v-if="isShowVcode" id="imgCode" class="input_style">
                  <input type="tel" maxlength="6" placeholder="请输入图片验证码" class="input2_val" id="img-code-in" >
                  <img :src="this.imgCode" id="img-code" @click="getImgCode" />
                </li>
                <li v-if="isShowVcode" id="code" class="input_style">
                  <input type="tel" v-model="form.vcode" maxlength="6" placeholder="请输入短信验证码" class="input2_val" >
                  <vcode-btn class="y-center" style="right: 15px;" @sended="mapSetPsw" />
                </li> -->
              </ul>
              <button class="btn" id="apply" @click="onSubmit">立 即 申 请</button>
          </div>
          <div class="agree">
            <img src="./img/duihao@2x.png" />
            <span>申请即同意《易财钱包》<span @click="goProtocol">《隐私条款》</span></span>
          </div>
        </div>
        <img src="./img/dkm_bottom.png" class="pic_bottom" />
         <div class="ICP" v-if="channelCode === 'ZL1'">浙ICP备18034474号</div>
    </div>
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
      channelCode: '',
			isSetPsw: true,
			isByPsw: true,
      resetPsw: false,
      imgCode: `http://121.40.245.243:8016/rhh-api/api/captcha.jpg?uuid=${localStorage.getItem('uuid')}&timeshape=${Math.random()}`,
		}
  },
  beforeCreate(){
    // api.checkChannelIsEffective(Param.channelCode).then(data => {
    //     if(data.code == 0) {
    //       if(data.data) {
    //         alert('该渠道已经下线，请联系渠道商确认是否可用！');
    //         window.location.href = '/';
    //       }
    //     } else {
    //       alert(data.msg);
    //     }
    // });
    // const uuid = localStorage.getItem('uuid');
    // api.getImgcode(uuid).then(data=> {
    //   console.log('data:', data);
    //   if(data.code === 0) {
    //     this.imgCode = data;
    //   } else {
    //     alert(data.msg)
    //   }
    // })
  },
	mounted() {
    document.getElementById("app").style.height = '19rem';
    if(Param.channelCode) {
      // api.tarceChannelUV(Param.channelCode);
      api.traceChanne(Param.channelCode);
      this.noBack = true
      this.channelCode = Param.channelCode
    }
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
    getImgCode() {
      this.imgCode = `http://121.40.245.243:8016/rhh-api/api/captcha.jpg?uuid=${localStorage.getItem('uuid')}&timeshape=${Math.random()}`;
    },
    callPage() {
      document.body.scrollTop = 0;
	    document.documentElement.scrollTop = 0;
    },
		mapSetPsw() {
			this.isSetPsw = this.setPswMap[this.form.mobile];
		},
		async onSubmit() {
			const form = {};
			const { mobile, vcode } = this.form;
      form.mobile = mobile;
      form.channel = Param.channelCode;
			if(this.isShowVcode) form.vcode = vcode;
			const msg = checkInput(form, rules);
			if(msg) {
				return this.$toast(msg);
			}
			this.$loading('登录中');
			const data = await api.loginNew(mobile,form.channel, form);
			this.form.vcode = ''
			this.form.psw = ''
			this.setPswMap[mobile] = true;
			// await this.getUserBean()
      this.$loading.close();

      if(data.code == 0){
        // 分发页地址
        //location.href = "http://download.jbhunt.cc/?channelCode="+Param.channelCode;
        location.href = `http://download.jbhunt.cc/?channelCode=${Param.channelCode}`
      }else{
        this.$toast(data.msg, 'success');
      }
    },
    goProtocol() {
      location.href = '#/protocol';
    }
	},
}
</script>
