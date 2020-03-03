<template>
	<page title="设置">
		<set-list>
			<!-- <li>
				<label for="">登录账户</label>
				<span class="right" v-if="userBean">{{ userBean.mobile }}</span>
			</li> -->
			<li class="more" @click="$router.push('/login?resetPsw=1')">
				<label for="">修改密码</label>
			</li>
		</set-list>

		<div class="ta-c link pd20-0 fz-18" @click="onLogout">
			退出登录
		</div>


	</page>
</template>

<script>
import popup from 'components/common/popup'
import chooseCon from 'components/common/popcon/choose'
import { mapActions, mapGetters } from 'vuex'

export default {
	components: {
		popup,
		chooseCon,
	},
	computed: {
		...mapGetters([
			'userBean',
		])
	},
	methods: {
		...mapActions([
			'logout',
		]),
		onLogout() {
			this.$vux.confirm.show({
				content: '是否确认退出？',
				onConfirm: async _ => {
					this.$loading('正在退出');
					const msg = await this.logout();
					this.$toast(msg, 'success');
					this.$router.back();
				}
			})
		},
	},
	data() {
		return {
			
		}
	},
}
</script>

