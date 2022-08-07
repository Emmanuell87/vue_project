import WebSocket = require("ws");

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
				const trade = data.data;
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
