<template>
	<set-form class="bigger no-bd">
		<li v-for="item in inputs">
			<label>{{item.label}}</label>
			<component :is="getInputTag(item.type)" :type="item.type" v-va :label="item.label" :rule="item.rule"
				:name="item.name" class="right" :placeholder="item.hint || ('请输入'+item.label)">
				
				<template v-if="item.type=='select'">
					<option value="" v-if="!item.noBlank"></option>
					<option :value="opt.value" v-for="opt in item.options" v-if="opt.value!==undefined">
						{{opt.text || opt.value}}
					</option>
				</template>

			</component>
		</li>
	</set-form>
</template>

<script>
export default {
	props: {
		inputs: Array,
		scope: {
			type: String,
			default: 'def-form',
		},
	},
	methods: {
		getInputTag(type) {
			if(type == 'select') return type
			return 'input'
		}
	}
}
</script>