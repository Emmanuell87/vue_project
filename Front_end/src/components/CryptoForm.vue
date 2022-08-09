<template>
	<div class="container">
		<h2
			class="text-center fw-bold text-center mb-3"
			style="font-size: 20px"
		>
			Selecciona una cryptomoneda
		</h2>
		<div class="d-flex">
			<b-form-select v-model="selectedCoin">
				<option :value="null" disabled>
					-- Please select an option --
				</option>
				<option
					v-for="(option, index) in getPairs"
					:value="option"
					:key="index"
				>
					{{ option.label }}
				</option>
			</b-form-select>
			<span class="fw-bold h3">/</span>
			<b-form-select
				id="quote"
				:options="keys"
				:searchable="false"
				:clearable="false"
				v-model="quote"
				style="width: 100px"
			></b-form-select>
			<b-button variant="outline-primary" @click="addCoin">
				<fa icon="plus"
			/></b-button>
		</div>
		<!-- {{ infoCryptos[quote].pairs }} -->
	</div>
</template>

<script lang="ts">
import { TPairs, TInfoCryptos } from "../interfaces/infoCryptos";
import { getInfoCryptos, newUserCrypto } from "../services/cryptosApi";
import { defineComponent } from "vue";
import store from "../store";

export default defineComponent({
	name: "crypto-form",
	// components: { Multiselect },
	data() {
		return {
			infoCryptos: {} as TInfoCryptos,
			keys: [] as string[],
			selectedCoin: {} as TPairs,
			quote: "BUSD" as string,
		};
	},
	// components: { Multiselect },
	methods: {
		async loadInfoCryptos() {
			try {
				const res = await getInfoCryptos();
				this.infoCryptos = res.data;
				this.keys = Object.keys(res.data);
			} catch (error) {
				console.error(error);
			}
		},

		async addCoin() {
			if (Object.keys(this.selectedCoin).length !== 0) {
				const symbol = `${this.selectedCoin.value}${this.quote}`;
				const userCrypto = {
					symbol: symbol,
					base: this.selectedCoin.value,
					quote: this.quote,
					name: this.selectedCoin.name,
					cid: this.selectedCoin.cid,
				};
				await newUserCrypto(userCrypto);
				this.$router.push({ path: "/" });
			}
		},
	},
	mounted() {
		this.loadInfoCryptos();
	},
	computed: {
		getPairs(): TPairs[] {
			// return this.infoCryptos[this.quote]["pairs"];
			if (Object.keys(this.infoCryptos).length !== 0) {
				const pairs = this.infoCryptos[this.quote]["pairs"];
				return pairs;
				// return this.infoCryptos[this.quote].pairs;
			} else {
				return [];
			}
		},
	},
});
</script>
