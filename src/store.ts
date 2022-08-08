import { createStore } from "vuex";
import { TInfoCryptos } from "./interfaces/infoCryptos";
import { ITicker } from "./interfaces/ticker.interface";
import { IUserCrypto } from "./interfaces/userCrypto.interface";
import sockets from "./services/apiBinance";
import { getInfoCryptos, getUserCryptos } from "./services/cryptosApi";

type ITickers = {
	[symbol: string]: ITicker;
};

const store = createStore({
	state: {
		tickers: {} as ITickers,
		token: localStorage.getItem("token")
			? localStorage.getItem("token")
			: null,
		sockets: new sockets(),
		userCryptos: [] as IUserCrypto[],
	},
	getters: {
		getToken: (state) => () => {
			return state.token;
		},
	},
	mutations: {
		SET_USER_CRYPTO: async (state, userCryptos) => {
			state.userCryptos = userCryptos;
		},
		SET_SOCKETS: (state, payload) => {
			const tick = state.tickers[payload.symbol];
			payload.pchg = tick ? (payload.price > tick.price ? 1 : -1) : 1;
			state.tickers[payload.symbol] = payload;
		},
		UPDATE_TOKEN: (state, newToken) => {
			localStorage.setItem("token", newToken);
			console.log(newToken);
			state.token = newToken;
		},
	},
	actions: {
		async fetchUserCryptos({ commit }) {
			try {
				const res = await getUserCryptos();
				commit("SET_USER_CRYPTO", res.data);
				res.data.forEach((userCrypto) => {
					this.state.sockets.subscribe(userCrypto.symbol);
				});
			} catch (error) {
				console.error(error);
			}
		},
	},
});
export default store;
