<template>
	<page title="进度查询">
		<set-list class="simple-card">
			<set-item v-for="(bank, i) in banks" :key="i" 
				v-if="bank.query_url" @click.native="openLink(bank.query_url)">
				<div class="y-center icon-wrap">
					<i class="left-icon" :class="'bk-logo-' + bank.id"></i>
				</div>
				<p>{{bank.title}}银行</p>
			</set-item>
		</set-list>
	</page>
</template>

<script>
import { openLink } from "assets/helper";

export default {
  methods: {
    openLink
  },
  data() {
    return {
      banks: [
		{
          id: 5,
          title: "平安",
          query_url:
            "https://c.pingan.com/apply/mobile/modules/queryApp/index.html"
        },
        {
          id: 2,
          title: "广发",
          query_url: "https://wap.cgbchina.com.cn/queryApply.do"
        },
        // {
        //   id: 3,
        //   title: "浙商",
        //   query_url:
        //     "https://e.czbank.com/APPINSPECT/logon/credit_applStatus_req.jsp"
        // },
        {
          id: 4,
          title: "中信",
          query_url:
            "https://creditcard.ecitic.com/citiccard/wap/cardappquery/app_inq.jsp"
        },
        {
          id: 1,
          title: "光大",
          query_url:
            "https://xyk.cebbank.com/cebmms/apply/fz/wy-apply-index.htm"
        },
        {
          id: 6,
          title: "交通",
          query_url:
            "https://creditcardapp.bankcomm.com/member/apply/status/preinquiry.html"
        },
        // {
        //   id: 7,
        //   title: "广州",
        //   query_url:
        //     "http://creditcard.gzcb.com.cn/gzcb_web/transactionApply.action"
        // },
        {
          id: 8,
          title: "招商",
          query_url: "https://ccclub.cmbchina.com/mca/MQuery.aspx"
        },
        // {
        //   id: 9,
        //   title: "兴业",
        //   query_url: "https://3g.cib.com.cn/app/00282.html"
        // },
        {
          id: 11,
          title: "浦发",
          query_url:
            "http://www.spdbccc.com.cn/spdb/cupd/applyProgress.do?method=index"
        },
        {
          id: 12,
          title: "花旗",
          query_url: null
        }
      ]
    };
  }
};
</script>