<style lang="less" scoped>
input::-webkit-input-placeholder{/*Webkit browsers*/
    color:#b9a59a;
}
input:-moz-placeholder{/*Mozilla Firefox 4 to 8*/
   color:#b9a59a;
}
input::moz-placeholder{/*Mozilla Firefox 19+*/
   color:#b9a59a;
}
input:-ms-input-placeholder{/*Internet Explorer 10+*/
    color:#b9a59a;
}
    .channel-container{
      width: 100%;
      max-width: 750px;
      margin-left: auto;
      margin-right: auto;
      height: 13.34rem;
      min-height: 13.34rem;
      // background: url('./img/熊了花背景.png' ) no-repeat;
      // background-size: 100% 100%;
      background: #ffffff;
      .channel-bg{
        width: 100%;
        height: 4.92rem;
      }
      .login-content{
        position: absolute;
        top: 4.56rem;
        left: 50%;
        margin-left: -3.23rem;
        width: 6.45rem;
        height: 3.80rem;
        border-radius: 0.04rem;
        // margin-top: -0.40rem;
        // position: relative;
        background: url('./img/xjdk2_input_bg.png') no-repeat;
        background-size: 100% 100%;
        .content-pos{
          width: 6.45rem;
          height: 5.20rem;
          position: absolute;
          top: -1.12rem;
        }
      }
    }
    .banner{
      display: block;
      position: relative;
      width: 100%;
      height: 8.50rem;
      margin: 0 auto;
    }
    .login-center{
      position: relative;
      height:auto;
      // background:rgba(255,255,255,0.6);
      border-radius:0.04rem;
      margin: auto;
      top: 0.10rem;
      border-radius: 0.15rem;
    }
    .input_style {
    position: relative;
    width: 5.80rem;
    height: 1.22rem;
    border-radius: 0.15rem;
    margin: 0 auto;
    margin-top: .5rem;
    background: #ffffff;
  }
    .input_style img {
    width: .46rem;
    height: .38rem;
    float: left;
    margin: 0.36rem 0 0 0.28rem;
    padding-right: 0.20rem;
    border-right: 1px solid #ffa189;
  }
  .input_style input {
      float: left;
      // margin: 0.31rem 0 0 0.15rem;
      border: none;
      // border-left: 1px solid #b1afaf;
      outline: 0;
      width: 2.90rem;
      border-top-right-radius: 0.50rem;
      border-bottom-right-radius: 0.50rem;
      height: .4rem;
      padding-left: 0.1rem;
      border-radius: 0;
      height: 1.18rem;
      border: none;
      display: block;
      background: rgba(255, 255, 255, 0.6)
  }
  .input_style input::-webkit-input-placeholder {
      color: #b9a59a;
  }
    #code::before{
      height: 0;
    }
    .link{
      color: #15171C;
      font-size: 0.30rem;
      font-weight:400;
      background: rgba(255, 255, 255, 0.6)
    }
    #apply{
      width:5.80rem;
      height:0.90rem;
      background: url('./img/xjdk2_login.png') no-repeat;
      background-size: 100% 100%;
      border-radius:0.45rem;
      color:rgba(255,255,255,1);
      font-size: 0.36rem;
    }
    .agree{
      width: 100%;
      height: 0.26rem;
      display: flex;
      align-content: center;
      justify-content: center;
      align-items: center;
      margin-top: 0.40rem;
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
      padding-left: 0.1rem;
      line-height: 0.4rem;
      border-left: 1px solid #b1afaf;
      color: #b1afaf;
    }
    .ICP{
      width: 100%;
      position: absolute;
      bottom: 0.20rem;
      text-align: center;
      font-size: 0.24rem;
      color: #c8b0b0;
    }
    .icon-content{
      margin-top: 0.50rem;
      p{
        text-align: center;
        padding-top: 0.24rem;
      }
    }
    .mhfq-logo{
      width: 1.10rem;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
    #bot{
      position: fixed;
      bottom: 0;
      width: 100%;
      left: 0;
      height: 1.60rem;
    }
    #set-list-new{
      margin-top: 1.2rem;
      margin-bottom: 0.9rem;
    }
    .icon-content{
      margin-top: 2.8rem;
    }
    #img-code{
      border: none;
      margin: 0;
      height: 0.80rem;
      width: 2.00rem;
      margin-top: 0.20rem;
    }
</style>
<template>
    <div class="channel-container">
        <img src="./img/xjdk2_banner.png" class="banner"/>
        <div class="login-content">
          <div class="login-center">
              <ul class="pd-0" id="set-list" style="margin-bottom: 0.60rem;">
                <li id="phone" class="input_style">
                    <img src="./img/xjdk2_phone.png" alt="">
                    <input type="tel" v-model="form.mobile" maxlength="11" @blur="callPage" style="width: 4.80rem;border-top-right-radius: 0.75rem;border-bottom-right-radius: 0.75rem" placeholder="请输入手机号" class="input1_val">
                </li>
                 <!-- <li id="imgCode" class="input_style">
                  <img src="./img/xjdk2_code.png" alt="">
                  <input type="tel" maxlength="6" @blue="callPage" placeholder="请输入图片验证码" class="input2_val" id="img-code-in" >
                  <img :src="this.imgCode" id="img-code" @click="getImgCode" />
                </li>
                <li v-if="isShowVcode" id="code" class="input_style">
                  <img src="./img/xjdk2_code.png" alt="">
                  <input type="tel" v-model="form.vcode" maxlength="6" @blue="callPage" placeholder="请输入短信验证码" class="input2_val" >
                  <vcode-btn class="y-center" @sended="mapSetPsw" />
                </li> -->
              </ul>
              <button class="btn" id="apply" @click="onSubmit">立 即 注 册</button>
          </div>
          <!-- <div class="agree">
            <img src="./img/duihao@2x.png" />
            <span>申请即同意《秒花呗》《隐私条款》</span>
          </div> -->
          <div class="icon-content">
            <img src="./img/xjdk2_logo.png" class="mhfq-logo" />
            <p>优享借</p>
          </div>
          <img src='./img/xjdk2_bot.png' id="bot" />
        </div>
    </div>
</template>

<script>
import vcodeBtn from './vcode-btn-xjdk2'
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
      imgCode: `http://121.40.245.243:8016/bee-api/api/captcha.jpg?uuid=${localStorage.getItem('uuid')}&timeshape=${Math.random()}`,
		}
  },
   created() {
    document.title = '优享借'
  },
  destroyed() {
    document.title = '易财钱包'
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
    document.getElementById("app").style.height = '13.34rem';
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
      this.imgCode = `http://121.40.245.243:8016/bee-api/api/captcha.jpg?uuid=${localStorage.getItem('uuid')}&timeshape=${Math.random()}`;
    },
		mapSetPsw() {
			this.isSetPsw = this.setPswMap[this.form.mobile];
    },
     callPage() {
      document.body.scrollTop = 0;
	    document.documentElement.scrollTop = 0;
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
      
      if(data.code === 0){
        location.href = `http://121.40.245.243/dx/?channelCode=${Param.channelCode}`;
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

