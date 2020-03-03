
<template>
	<div>
		<ul class="subnav bdb">
			<li v-for="(item, idx) in navArr" @click="toggleMask(idx)" 
				:class="{ open: maskShow && idx==curNavIdx }">
				<i :class="'ic_'+idx"></i> <span>{{item}}</span> <b></b>
			</li>
		</ul>
		<popup from="top" :calcTop="true" v-show="maskShow" @close="closeMask" @closed="onMaskClose">
			<div class="loan-types d-flex flex-wrap space-btw con-side">
				<p class="item" v-for="(item, idx) in subItems" @click="checkItem(idx, item)"
					:class="{ checked: item.checked }">
					{{item.title}}
				</p>
			</div>
		</popup>
	</div>
</template>

<script>
import popup from 'components/common/popup'

export default {
	data() {
		return {
			maskShow: false,
			curNavIdx: 0,
			autoCheckIdx: null,
			navArr: [
				'金额区间',
				'借款类型',
			],
			typeArr: [
				{ title: '类型不限', id: 0, checked: true, },
				{ title: '工薪贷', id: 1, checked: true, },
				{ title: '工薪贷', id: 2, checked: true, },
				{ title: '工薪贷', id: 3, checked: false, },
				{ title: '助学贷', id: 4, checked: true, },
				{ title: '大额贷', id: 5, checked: false, },
				{ title: '工薪贷', id: 6, checked: true, },
			],
			limitArr: [
				{ title: '金额不限', id: 0, checked: true, },
				{ title: '1-3万', id: 1, checked: false, },
				{ title: '3-5万', id: 2, checked: false, },
				{ title: '5-10万', id: 3, checked: false, },
				{ title: '10-15万', id: 4, checked: true, },
				{ title: '15-20万', id: 5, checked: false, },
				{ title: '20-30万', id: 6, checked: true, },
			],
		}
	},
	components: {
		popup,
	},
	computed: {
		subItems() {
			return this.curNavIdx == 1 ? this.typeArr : this.limitArr;
		}
	},
	methods: {
		checkItem(idx, item) {
			this.subItems[idx].checked = !item.checked
		},
		onMaskClose() {
			if(this.autoCheckIdx !== null) {
				this.curNavIdx = this.autoCheckIdx;
				this.autoCheckIdx = null;
				setTimeout(_ => {
					this.maskShow = true
				}, 100);
			}
		},
		toggleMask(idx) {
			if(this.maskShow && idx != this.curNavIdx) {
				this.autoCheckIdx = idx;
				this.maskShow = false;
				return;
			}
			this.maskShow = !this.maskShow;
			this.curNavIdx = idx;
		},
		closeMask() {
			this.maskShow = false;
		},
	},
}
</script>