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
			quote: "BNB" as string,
		};
	},
	// components: { Multiselect },
	methods: {
		async loadInfoCryptos() {
			try {
				const res = await getInfoCryptos();
				// console.log(object)
				// console.log(res.data[this.quote]["pairs"]);
				this.infoCryptos = res.data;
				this.keys = Object.keys(res.data);
				// console.log(this.infoCryptos[this.quote]["pairs"]);
			} catch (error) {
				console.error(error);
			}
		},

		async addCoin() {
			if (Object.keys(this.selectedCoin).length !== 0) {
				console.log("asdf", this.selectedCoin);
				const symbol = `${this.selectedCoin.value}${this.quote}`;
				const userCrypto = {
					symbol: symbol,
					base: this.selectedCoin.value,
					quote: this.quote,
					name: this.selectedCoin.name,
					cid: this.selectedCoin.cid,
				};
				await newUserCrypto(userCrypto);
			}
		},
	},
	mounted() {
		console.log(this.infoCryptos);
		this.loadInfoCryptos();
	},
	computed: {
		getPairs(): TPairs[] {
			// return this.infoCryptos[this.quote]["pairs"];
			if (Object.keys(this.infoCryptos).length !== 0) {
				console.log(this.infoCryptos[this.quote]["pairs"]);
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
