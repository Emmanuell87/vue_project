<template>
	<ul class="list-group">
		<li
			class="list-group-item list-group-item-action p-4"
			style="cursor: pointer"
			v-for="(userCrypto, index) in userCryptos"
			:key="index"
		>
			{{ userCrypto.name }}
		</li>
	</ul>
</template>

<script lang="ts">
import { IUserCrypto } from "../interfaces/userCrypto.interface";
import { getUserCryptos } from "../services/cryptosApi";
import { defineComponent } from "vue";
export default defineComponent({
	name: "crypto-list",
	data() {
		return {
			userCryptos: [] as IUserCrypto[],
			token: "",
		};
	},
	methods: {
		async loadUserCryptos() {
			try {
				const res = await getUserCryptos(this.token);
				this.userCryptos = res.data;
				console.log(res);
			} catch (error) {
				console.error(error);
			}
		},
	},
	mounted() {
		this.token = this.$store.getters.getToken();
		this.loadUserCryptos();
	},
});
</script>
