// import WebSocket = require("ws");

import store from "../store";
export default class sockets {
	private baseUrl: string;
	private subscription: any = {};

	constructor() {
		this.baseUrl = "wss://stream.binance.com:9443/ws";
	}

	subscribe(cryptoSymbol: string): void {
		const body = {
			method: "SUBSCRIBE",
			params: [`${cryptoSymbol.toLowerCase()}@ticker`],
			id: 1,
		};
		const ws = new WebSocket(this.baseUrl);
		ws.onopen = function (this, ev) {
			ws.send(JSON.stringify(body));
		};

		ws.onmessage = function (this, ev) {
			const ticker = JSON.parse(ev.data);
			console.log(ev.data);
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

		this.subscription["btcbusd"] = ws;
	}

	unSubscribe(): void {
		const ws = this.subscription["btcbusd"];
		ws.close(1000, "");
		delete this.subscription["btcbusd"];
	}
}
