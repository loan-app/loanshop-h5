import { ruleMap } from 'assets/rule'

export default {
	mobile: {
		label: '手机号',
		reg: ruleMap.mobile,
	},
	vcode: {
		label: '验证码',
		reg: ruleMap.vcode,
	},
	psw: {
		label: '密码',
		reg: ruleMap.psw,
		regHint: '密码位数需为6-16位'
	},
}