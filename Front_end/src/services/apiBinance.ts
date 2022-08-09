// import WebSocket = require("ws");

type ISubscription = {
	[cryptoSymbol: string]: WebSocket;
};

import store from "../store";
export default class sockets {
	private baseUrl: string;
	private subscription = {} as ISubscription;

	constructor() {
		this.baseUrl = "wss://stream.binance.com:9443/ws";
	}

	subscribe(cryptoSymbol: string): void {
		let ws: WebSocket;
		if (this.subscription[cryptoSymbol]) {
			ws = this.subscription[cryptoSymbol];
		} else {
			const body = {
				method: "SUBSCRIBE",
				params: [`${cryptoSymbol.toLowerCase()}@ticker`],
				id: 1,
			};
			ws = new WebSocket(this.baseUrl);
			ws.onopen = function (this, ev) {
				ws.send(JSON.stringify(body));
			};
			this.subscription[cryptoSymbol] = ws;
		}

		ws.onmessage = function (this, ev) {
			const ticker = JSON.parse(ev.data);
			if (ticker) {
				const tick = {
					price: parseFloat(ticker.c),
					vol: parseFloat(ticker.q).toFixed(2),
					percent: parseFloat(ticker.P).toFixed(2),
					chg: ticker.p,
					high: ticker.h,
					low: ticker.l,
					open: ticker.o,
					time: ticker.E,
					symbol: cryptoSymbol,
				};
				store.commit("SET_SOCKETS", tick);
			}
		};
	}

	unSubscribe(cryptoSymbol: string): void {
		const ws = this.subscription[cryptoSymbol];
		ws.close(1000, "");
		// delete this.subscription[cryptoSymbol];
	}
}
