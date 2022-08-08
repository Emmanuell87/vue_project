<template>
	<div class="container mt-5 mb-3">
		<div class="row">
			<div
				class="col-sm-4"
				v-for="(userCrypto, index) in userCryptos"
				:key="index"
			>
				<CryptoCard
					:userCrypto="userCrypto"
					:ticker="tickers[userCrypto.symbol] || {}"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { IUserCrypto } from "../interfaces/userCrypto.interface";
import { getUserCryptos } from "../services/cryptosApi";
import { defineComponent } from "vue";
import CryptoCard from "./CryptoCard.vue";
import { mapState } from "vuex";
import Sockets from "../services/apiBinance";

const sockets = new Sockets();

export default defineComponent({
	name: "crypto-list",
	data() {
		return {
			userCryptos: [] as IUserCrypto[],
		};
	},
	methods: {
		async loadUserCryptos() {
			try {
				const res = await getUserCryptos();
				this.userCryptos = res.data;
				res.data.forEach((userCrypto) => {
					sockets.subscribe(userCrypto.symbol);
				});
				console.log(res);
			} catch (error) {
				console.error(error);
			}
		},
	},
	mounted() {
		this.loadUserCryptos();
	},
	computed: {
		...mapState(["tickers"]),
	},
	components: { CryptoCard },
});
</script>
