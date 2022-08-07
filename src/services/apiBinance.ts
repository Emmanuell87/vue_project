import WebSocket = require("ws");
import * as wslib from "ws";

// interface ISubscription {}

export default class sockets {
	private baseUrl: string;
	private subscription: any = {};

	constructor() {
		this.baseUrl = "wss://stream.binance.com:9443/ws";
	}

	subscribe(crypto: string): void {
		const body = {
			method: "SUBSCRIBE",
			params: [`${crypto}@miniTicker`, `${crypto}@aggTrade`],
			id: 1,
		};
		const ws = new WebSocket(this.baseUrl);
		ws.onopen = (data: WebSocket.Event) => {
			ws.send(JSON.stringify(body));
		};

		ws.onmessage = (data: WebSocket.MessageEvent) => {
			if (data) {
				const trade = data.data; // parsing single-trade record
				console.log(trade);
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

// const url = "wss://stream.binance.com:9443/ws";

{
	// const ws: wslib.WebSocket = new wslib.WebSocket(url);
}

// const bodyUnSubscribe = {
// 	method: "SUBSCRIBE",
// 	params: ["btcbusd@miniTicker", "btcusdt@aggTrade"],
// 	id: 1,
// };

// ws.on()
