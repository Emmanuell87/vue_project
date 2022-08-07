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
		token: localStorage.getItem("token")
			? JSON.parse(localStorage.getItem("token") || "")
			: null,
	},
	getters: {
		getToken: (state) => () => {
			return state.token;
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
