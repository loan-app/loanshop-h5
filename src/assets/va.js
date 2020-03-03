/*
 *  流程： 绑定指令-> 设置配置(vaConfig) -> 校验(check) -> 报错(showErr) 或 自定义报错
 *  https://segmentfault.com/a/1190000007575302
 *  hqs修改：tag=>label
 */
var va = {};

import { ruleMap } from './rule'

function unique(arr) {
	var hashTable = {}, newArr = [];
	for (var i = 0; i < arr.length; i++) {
		if (!hashTable[arr[i]]) {
			hashTable[arr[i]] = true;
			newArr.push(arr[i]);
		}
	}
	return newArr;
}

function addClass(dom, _class) {
	var hasClass = !!dom.className.match(new RegExp('(\\s|^)' + _class + '(\\s|$)'))
	if (!hasClass) {
		dom.className += ' ' + _class
	}
}

//校验函数
function check(v, configs) {
	var res = 0;										//0代表OK, 若为数组代表是某个字段的错误
	//验证函数
	var confMethods = {
		//非空
		nonvoid: (v, bool) => {
			if (bool) {
				return v.trim() ? 0 : ['nonvoid'];
			} else {
				return 0;
			}
		},
		reg: (v, reg) => reg.test(v) ? 0 : ['reg'],				//正则
		limit: (v, interval) => (+v >= interval[0] && +v <= interval[1]) ? 0 : ['limit', interval],
		equal: (v, target) => {														//和什么相等
			var _list = document.getElementsByName(target), _target
			for (var i = 0; i < _list.length; i++) {
				if (_list[i].className.indexOf('va') > -1) {
					_target = _list[i];
				}
			}
			return (_target.value === v) ? 0 : ['equal', _target.getAttribute('label')]
		},
		unique: (v) => {
			var _list = document.getElementsByClassName('unique'),
				valList = [].map.call(_list, item => item.value)
			return (unique(valList).length === valList.length) ? 0 : ['unique']
		}
	}

	for (var i = 0; i < configs.length; i++) {
		var conf = configs[i],
			type = conf.type,
			typeVal = conf.typeVal
		// console.log(conf)
		if(!type) continue;
		res = confMethods[type](v, typeVal)
		//如果有自定义报错信息， 返回自定义的报错信息
		if (res) {
			// console.log(res, conf)
			res = conf.errMsg || res
			break
		}
	}

	return res;
}

function showErr(vm, label, checkResult) {
	var type = checkResult[0],
		ext = checkResult[1] || []

	var ERR_MSG = {
		nonvoid: `请输入${label}`,
		reg: `请输入正确的${label}`,
		limit: `${label}必须在${ext[0]}与${ext[1]}之间`,
		equal: `两次${ext}不相同`,
		unique: `${label}重复`
	}
	//使用layer来报错，如果需要自定义报错方式，要把全文的layer集中起来包一层。
	// layer.msgWarn(ERR_MSG[type])
	var msg = ERR_MSG[type]
    // window.alert(msg)
	vm.$message(msg)
}

/**
 * [VaConfig va配置的构造函数]
 * @param {[string]} type	[校验类型，如reg, limit等等]
 * @param {[*]} typeVal			 [根据校验类型配置的值]
 * @param {[string]} errMsg  [报错信息]
 * @param {[string]} name	[用以ajax的字段名]
 * @param {[string]} label	 [中文名，用以报错]
 */
function VaConfig(type, typeVal, errMsg, name, label) {
	this.type = type, this.typeVal = typeVal, this.errMsg = errMsg, this.name = name, this.label = label
}
//用来剔除重复的规则，以及规则的覆盖。默认后面的取代前面
Array.prototype.uConcat = function (arr) {
	var comb = this.concat(arr)
		, unique = {}
		, result = []

	for (var i = 0; i < comb.length; i++) {
		// console.log(i, comb[i])
		var type = comb[i].type
		if (unique[type]) {
			var index = unique[type].index
			unique[type] = comb[i]
			unique[type].index = index;
		} else {
			unique[type] = comb[i]
			unique[type].index = i;
		}
	}

	for (var i = 0; i < 100; i++) {
		for (var item in unique) {
			if (unique[item].index === i) {
				delete unique[item].index
				result.push(unique[item])
			}
		}
	}
	return result
}

va.install = function (Vue, options) {

	if(this.installed) return;
	window.vaConfigMap = {}

	Vue.directive('va', {
		bind: function (el, binding, vnode) {
			var vm = vnode.context
				, rule = el.getAttribute('rule')
				, name = el.getAttribute('name')
				, label = el.getAttribute('label')
				, baseCfg = []										//默认的校验规则	--不用写，默认存在的规则（如非空）
				, optionalConfig = []								//用户选择的配置成套	--与rule相关
				, customConfig = []									//用户自定义的规则（组件中） --bingding.value
				, option = binding.modifiers
				, regMsg = el.getAttribute('regMsg') || ''

			var eazyNew = (type, typeVal) => { return new VaConfig(type, typeVal, '', name, label) }
			var regNew = (typeVal) => { return new VaConfig('reg', typeVal, regMsg, name, label) }	//正则的新建
			// console.log(rule)
			el.classList.add('va-' + vm.scope)

			var NON_VOID = eazyNew('nonvoid', true)

			//默认非空,如果加了canNull的修饰符就允许为空
			if (!option.canNull) {
				baseCfg.push(NON_VOID)
			}

			//需要立即校验的框
			if (option.vanow) {
				el.addEventListener('change', function () {
					vm.vaResult = vm.vaResult || {}
					vm.vaVal = vm.vaVal || {}
					var value = el.value,
						configs = vaConfigMap[name],
						para = el.getAttribute('va-para')				//传给回调的参数

					//如果允许为空的此时为空，不校验
					if (value === '' && option.canNull) {
						vm.vaVal[name] = value
						return
					}

					vm.vaResult[name] = check(value, configs);
					var _result = vm.vaResult[name]
					if (_result) {
						//如果返回的是字符串，则为自定义报错； 如果是数组，则使用showErr 报错
						showErr(vm, configs[0].label, _result)
						el.value = vm.vaVal[name] = ''
						return
					}
					vm.vaVal[name] = value
					vm.$vanow(para)  //写在实例内部method的回调
				})
			}

			//不能重复的
			if (option.unique) {
				optionalConfig.push(eazyNew('unique', name))
			}

			//如果有在正则表里
			var regOptions = Object.keys(option);
			for (var i in regOptions) {
				var regItem = regOptions[i]
				if (ruleMap[regItem]) {
					optionalConfig.push(regNew(ruleMap[regItem]))
				}
			}

			//如果ruleMap里有rule对应的，直接就加进optionalConfig
			if (ruleMap[rule]) {
				optionalConfig.push(regNew(ruleMap[rule]))
			}

			//用户自定义的规则
			if (binding.value) {
				customConfig = binding.value.map(item => {
					let type = Object.keys(item)[0];
					if (type === 'reg') {
						return regNew(item[type])
					} else {
						if (type === 'unique') {
							addClass(el, 'unique')
						}
						return eazyNew(type, item[type])
					}
				})
			}

			//规则由 默认规则 + 修饰符规则 + 写在属性的自定义规则 + 用户直接加到vaConfigMap里的规则 合并（后面的同type规则会覆盖前面的）
			vaConfigMap[name] = vaConfigMap[name] || []
			vaConfigMap[name] = baseCfg.uConcat(optionalConfig).uConcat(customConfig).uConcat(vaConfigMap[name])
			// console.log(name, vaConfigMap[name])
		},
	})

	Vue.directive('va-check', {
		bind: function (el, binding, vnode) {
			var vm = vnode.context
			var scope = binding.arg
			el.addEventListener('click', function () {
				var domList = document.getElementsByClassName('va-' + scope);
				vm.vaResult = vm.vaResult || {}
				vm.vaVal = vm.vaVal || {}

				for (var i = 0; i < domList.length; i++) {
					var dom = domList[i],
						name = dom.name,
						value = dom.value,
						configs = vaConfigMap[name]

					var _result = check(value, configs)
					//如果返回不为0,则有报错
					if (_result) {
						//如果返回的是字符串，则为自定义报错； 如果是数组，则使用showErr 报错
						showErr(vm, configs[0].label, _result)
						return
					}
					vm.vaVal[name] = value
				}
				//校验通过的回调
				vm.vaSubmit(vm.vaVal, scope)
			})
		}
	})

	/**
   **  在实例的monuted周期使用 api设置自定义配置
	 */
	Vue.prototype.VaConfig = VaConfig
}

module.exports = va

/*

	Vue.directive('va-test', {
		bind: function (el, binding, vnode) {
			var vm = vnode.context
			el.addEventListener('click', function () {
				vm.vaResult = vm.vaResult || {}
				vm.vaVal = vm.vaVal || {}

				var dom = document.getElementsByName(binding.arg)[0],
					name = dom.name,
					value = dom.value,
					configs = vaConfigMap[name]

				var _result = check(value, configs)
				//如果返回不为0，则有报错
				if (_result) {
					//如果返回的是字符串，则为自定义报错； 如果是数组，则使用showErr 报错
					showErr(configs[0].label, _result)
					return
				}

				vm.vaVal[name] = value
				var callback = Object.keys(binding.modifiers)[0]
				vm[callback]()
			})
		}
	})
*/