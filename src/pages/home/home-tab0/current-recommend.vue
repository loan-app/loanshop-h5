<template>
  <div class="bg-white loan-list-sm current-container" v-if="loans">
    <p class="fz-16 link">{{loans.title ? loans.title : ""}}</p>
    <p class="fz-12 ">
      <s/>
      <s/>
      <span>无需下载APP|持牌机构，闪电放款</span>
    </p>
    <P class="fz-18">{{0 + "~" + loans.maxLoan ? loans.maxLoan : ""}}</P>
    <button class="btn" @click="goApply">立刻申请</button>
  </div>
</template>

<style lang="less" scoped>
  .current-container{
    text-align: center;
    p{
      &:nth-child(2){
        position: relative;
        padding-top: 10px;
        padding-bottom: 10px;
        s{
          position: absolute;
          width: 20%;
          height: 1px;
          display: block;background: #888;
          &:nth-child(1){
            top: 17px;
            left: 5%;
          }
          &:nth-child(2){
            top: 17px;
            right: 5%;
          }
        }
        span{
          display: inline-block;
          width: 40%;
          min-width: 200px;
        }
      }
      &:nth-child(3){
        color: #000000;
      }
    }
    button{
        display: block;
        width: 90%;
        height: 40px;
        line-height: 100%;
        text-align: center;
        font-size: 18px;
      }
  }
</style>



<script>
import api from 'src/api'
import { mapActions, mapGetters, mapState } from 'vuex'
import { openLink } from 'assets/helper'
import { constants } from 'http2';
export default {
  props: {
    loans: Object,
  },
  methods: {
    goApply() {
      api.logLoan(this.loans.id)
      this.userBean ? 
      openLink(this.loans.applyUrl, { title: this.loans.title }) :
      this.$router.push('/login');
    }
  },
  computed: {
    ...mapGetters(['userBean']),
  },
  data() {
    return {
			
		}
  }

}
</script>
