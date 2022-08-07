import { createStore } from "vuex";

const store = createStore({
	strict: true,
	state: {
		coins: [
			{
				cid: 1,
				symbol: "BTCUSDT",
				base: "BTC",
				quote: "USDT",
				name: "Bitcoin",
			},
		],
		token: localStorage.getItem("vue-crypto-currencies-new")
			? localStorage.getItem("vue-crypto-currencies-new")
			: null,
	},
	getters: {
		getSymbolById: (state) => (symbol: string) => {
			return state.coins.find((s) => s.symbol === symbol);
		},
	},
	mutations: {
		SET_TOKEN: () => {
			("");
		},
		SET_SOCKETS: () => {
			("");
		},
		ADD_COIN: () => {
			("");
		},
		REMOVE_COIN: () => {
			("");
		},
	},
});
export default store;
