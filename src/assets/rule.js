//正则表
export const ruleMap = {
	imgcode: /^[0-9a-zA-Z]{4,6}$/,
	vcode: /^\d{3,6}$/,
	idcard: /^\d{14,17}\S$/,
	nickname: /^[\w|\d]{4,16}$/,
	psw: /^[\w!@#$%^&*.]{6,16}$/,
	mobile: /^1\d{10}$/,
	zwname: /^[\u4e00-\u9fa5 ]{2,10}$/,
	cardnum: /^\d{10,19}$/,
	mail: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
}

export const defRules = {
	mobile: {
		label: '手机号',
		reg: ruleMap.mobile,
	},
	idcard: {
		label: '身份证号',
		reg: ruleMap.idcard,
		checkFn: validIdcard,
	},
}

export function checkInput(form, rules = defRules) {
	let msg = ''
	for(const key in form) {
		if(msg) break;
		const val = form[key];
		const rule = rules[key];
		if(!rule) continue;
		if(!val) msg = rule.hint || `请输入${rule.label}`;
		else if(rule.reg && !rule.reg.test(val)) msg = rule.regHint || `请输入正确的${rule.label}`;
		else if(rule.checkFn) msg = rule.checkFn(val)
	}
	return msg;
}

export function validIdcard(val) {
	val += '';
	var marr = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
	var resMap = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
	if(val.length < 15 || val.length > 18) return '身份证号位数不正确';
	var sum = 0;
	for(var i in marr) {
		var num = parseInt(val[i]),  m = marr[i];
		sum += num * m;
	}
	var mod = sum % 11;
	var last = val[val.length - 1];
	return resMap[mod]==last ? '' : '身份证号填写有误';
}
