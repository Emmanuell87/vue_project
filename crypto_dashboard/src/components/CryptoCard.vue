<template>
	<div>
		<div class="card p-3 mb-2">
			<div class="d-flex justify-content-between">
				<div class="d-flex flex-row align-items-center">
					<div class="ms-2">
						<h6 class="mb-2 d-flex justify-content-center fw-bold">
							{{ userCrypto.name }}
						</h6>
						<div class="d-flex">
							<b-img
								class="px-2"
								v-bind="mainProps"
								rounded="circle"
								:src="getIcon"
							></b-img>
							<div class="px-2">
								<div>
									<span class="fw-bold">{{
										userCrypto.base
									}}</span
									>/{{ userCrypto.quote }}
								</div>
								<!-- <div v-if="ticker.price">
									<span class="fw-bold d-inline">
										{{ ticker.price || "" }}
									</span>
									<span class="fw-normal d-inline pl-3">{{
										userCrypto.quote
									}}</span>
								</div> -->
								<div class="d-flex" v-if="ticker.price">
									<div class="fw-bold">
										{{ ticker.price || "" }}
									</div>
									<div class="fw-normal ms-1">
										{{ userCrypto.quote }}
									</div>
								</div>
							</div>
							<!-- <div><b>{{info.base}}</b>/{{info.quote}}</div> -->
						</div>
					</div>
				</div>
				<div
					:class="[
						ticker.percent < 0 ? 'text-danger' : 'text-success',
						'col-5',
						'text-right',
					]"
					v-if="ticker.price"
				>
					<div class="d-flex">
						<fa
							class="mr-3"
							:icon="
								ticker.percent < 0 ? 'arrow-down' : 'arrow-up'
							"
						/>
						<div class="ps-2">{{ ticker.percent }}%</div>
					</div>
					<div class="coin-chg">
						{{
							parseFloat(ticker.chg).toFixed(
								userCrypto.quote === "USDT" ? 3 : 8
							)
						}}
					</div>
					<div>
						<span class="text-secondary">Vol:</span>
						<span class="text-dark">{{ ticker.vol }}</span>
					</div>
				</div>
			</div>
			<!-- <div class="mt-5">
				<h3 class="heading">Senior Product<br />Designer-Singapore</h3>
				<div class="mt-5">
					<div class="progress">
						<div
							class="progress-bar"
							role="progressbar"
							style="width: 50%"
							aria-valuenow="50"
							aria-valuemin="0"
							aria-valuemax="100"
						></div>
					</div>
					<div class="mt-3">
						<span class="text1"
							>32 Applied
							<span class="text2">of 50 capacity</span></span
						>
					</div>
				</div>
			</div> -->
		</div>
	</div>
</template>

<script lang="ts">
import { IUserCrypto } from "../interfaces/userCrypto.interface";
import { defineComponent, PropType } from "vue";
import { ITicker } from "../interfaces/ticker.interface";

export default defineComponent({
	name: "crypto-card",
	props: {
		userCrypto: {
			required: true,
			type: Object as PropType<IUserCrypto>,
		},
		ticker: {
			required: true,
			type: Object as PropType<ITicker>,
		},
	},
	data() {
		return {
			mainProps: {
				width: 50,
				height: 50,
				class: "m1",
			},
		};
	},
	computed: {
		getIcon() {
			return `https://s2.coinmarketcap.com/static/img/coins/64x64/${this.userCrypto.cid}.png`;
		},
	},
});
</script>
