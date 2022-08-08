"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const binanceConfig_1 = __importDefault(require("../config/binanceConfig"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const ticker = await binance.prices();
    // console.info(`Price of BNB: ${ticker.DOGEBTC}`);
    // binance.websockets.miniTicker((markets) => {
    // 	console.info(markets);
    // });
    // binance.websockets.chart("BNBBTC", "1m", (symbol, interval, chart) => {
    // 	const tick = binance.last(chart);
    // 	const last = chart[tick].close;
    // 	console.info(chart);
    // 	// Optionally convert 'chart' object to array:
    // 	// let ohlc = binance.ohlc(chart);
    // 	// console.info(symbol, ohlc);
    // 	console.info(symbol + " last price: " + last);
    // 	binance.websockets.terminate("BNBBTC@kline_1m");
    // });
    const endpoints = binanceConfig_1.default.websockets.subscriptions();
    console.log(endpoints);
    // binance.websockets.prevDay("BNBBTC", (error: any, response: any) => {
    // 	console.info(response);
    // });
    // binance.websockets.candlesticks(
    // 	["DOGEBTC"],
    // 	"1m",
    // 	(candlesticks: ICandlesticks) => {
    // 		const {
    // 			e: eventType,
    // 			E: eventTime,
    // 			s: symbol,
    // 			k: ticks,
    // 		} = candlesticks;
    // 		const {
    // 			o: open,
    // 			h: high,
    // 			l: low,
    // 			c: close,
    // 			v: volume,
    // 			n: trades,
    // 			i: interval,
    // 			x: isFinal,
    // 			q: quoteVolume,
    // 			V: buyVolume,
    // 			Q: quoteBuyVolume,
    // 		} = ticks;
    // 		console.info(symbol + " " + interval + " candlestick update");
    // 		console.info("open: " + open);
    // 		console.info("high: " + high);
    // 		console.info("low: " + low);
    // 		console.info("close: " + close);
    // 		console.info("volume: " + volume);
    // 		console.info("isFinal: " + isFinal);
    // 	}
    // );
    res.send("ok");
}));
router.get("/terminate", (req, res) => {
    console.log("terminado");
    res.send("ok");
});
exports.default = router;
