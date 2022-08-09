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
// import Sockets from "../services/apiBinance";
import store from "../store";

const sockets = store.state.sockets;

export default defineComponent({
	name: "crypto-list",
	methods: {},
	mounted() {
		store.dispatch("fetchUserCryptos");
	},
	computed: {
		...mapState(["tickers", "userCryptos"]),
	},
	components: { CryptoCard },
});
</script>
