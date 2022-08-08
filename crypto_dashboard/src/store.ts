import { createStore } from "vuex";
import { ITicker } from "./interfaces/ticker.interface";

type ITickers = {
	[symbol: string]: ITicker;
};

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
		tickers: {} as ITickers,
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
		SET_SOCKETS: (state, payload) => {
			const tick = state.tickers[payload.symbol];
			payload.pchg = tick ? (payload.price > tick.price ? 1 : -1) : 1;
			state.tickers[payload.symbol] = payload;
			console.log(state.tickers);
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
