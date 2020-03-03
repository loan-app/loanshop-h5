<style>
.gray-con-mt p {
	margin-top: 2px;
}
.mb-15 {
	margin-bottom: 15px;
}
.line15 {
	line-height: 1.5;
}
.btm .btn {
	margin: 0;
    width: 100%;
    border-radius: 0;
}
</style>
<template>
	<page title="贷款详情" v-if="curLoan">
		<set-list>
			<li class="d-flex pd20-0">
				<img :src="curLoan.logo + '?x-oss-process=image/resize,w_150'" class="left-icon">
				<div class="col-right">
					<h2 class="space-btw">
						{{ curLoan.title }} 
					</h2>
					<div class="gray mt-15">
						{{ curLoan.applyNum }}人申请
					</div>
					
				</div>
			</li>
			<li>
				<div class=" fz-14">
					<p>{{ curLoan.intro }}</p>
				</div>
			</li>
		</set-list>

		<loan-intro-icons :info="iconInfo"></loan-intro-icons>

		<group v-for="(item, idx) in applyInfo" :key="idx" v-if="item.title">
			<cell>
				<p slot="title" class="fz-14">{{ item.title }}</p>
			</cell>
			<cell>
				<div class="gray gray-con-mt fz-13" slot="inline-desc">
					<p v-for="(txt, idx2) in item.con" :key="idx2">{{ txt }}</p>
				</div>
			</cell>
		</group>
		
		<div class="ov-h btm" slot="btm" :style="heightStyle">
			<button class="btn" @click="clickApply">立即申请</button>

			<popup from="bottom" v-show="isShowPop" @close="onClosePop">
				<valid-mobile-con @close="onClosePop" @login="goApply" @stepover="goApply"></valid-mobile-con>
			</popup>
		</div>



	</page>
	<page title="加载中" v-else>

	</page>
</template>

<script>
import loanIntroIcons from 'components/loan-3icon-intro'
import popup from 'components/common/popup'
import validMobileCon from 'components/pop-valid-mobile'
import { mapActions, mapGetters, mapState } from 'vuex'
import { openLink } from 'assets/helper'
import api from 'src/api'
import { constants } from 'http2';

export default {
	components: {
		loanIntroIcons,
		popup,
		validMobileCon,
	},
	computed: {
		applyInfo() {
			if(!this.curLoan.applyInfo) return []
			const rows = this.curLoan.applyInfo.split(/\n{2,3}/)
			const info = []
			rows.forEach(row => {
				const parts = row.split('\n')
				info.push({
					title: parts.shift(),
					con: parts,
				})
			})
			return info;
		},
		iconInfo() {
			let rateRange = this.curLoan.rateRange.split(/[:：]/)
			if(rateRange.length == 1) rateRange = ['月', rateRange[0]]
			return [
				{
					iconCls: 'loan-icon-1',
					title: '最高可贷',
					subinfo: this.curLoan.maxLoan,
				},
				{
					iconCls: 'loan-icon-3',
					title: rateRange[0]+'利率',
					subinfo: rateRange[1],
				},
				{
					iconCls: 'loan-icon-2',
					title: '期限',
					subinfo: this.curLoan.periodRange,
				},
			];
		},
		...mapState({
			loans: s => s.dataMap.loans,
		}),
		...mapGetters([
			'userBean',
		]),
		curLoan() {
			return this.loans[this.id] || null;
		}
	},
	methods: {
		goApply() {
			api.logLoan(this.curLoan.id)
			openLink(this.curLoan.applyUrl, { title: this.curLoan.title })
		},
		clickApply() {
			// if(!this.userBean) this.isShowPop = true;
			// else
			this.userBean ? this.goApply() : this.$router.push('/login')
			
		},
		onClosePop() {
			this.isShowPop = false;
		},
		getHeight() {
			var str= navigator.userAgent.toLowerCase(); 
			let bottom = 0;
			if(str.indexOf('iphone')) {
					var ver=str.match(/cpu iphone os (.*?) like mac os/);
					const version = ver[1].replace(/_/g,".");
					// console.log(ver[1].replace(/_/g,"."));
					Number(version) > 12.1 ? bottom = 40 : false;
					// bottom = 20;
					// if(!ver){
					// 		alert("请在Ios系统中打开");
					// }else{
					// 		alert("你当前的Ios系统版本为："+ver[1].replace(/_/g,"."));
					// }
					if(window.screen.height == 812 || window.screen.height == 896)  bottom = 44;
			}
			// alert(window.screen.height, "height");
			this.heightStyle.marginBottom = bottom + "px";
		},
	},
	created() {
		this.id = this.$route.params.id;
		this.getHeight();
	},
	data() {
		return {
			isShowPop: false,
			id: 0,
			heightStyle: {
				marginBottom: "",
			}
		}
	}
}
</script>