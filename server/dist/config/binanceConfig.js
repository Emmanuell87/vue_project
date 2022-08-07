"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_binance_api_1 = __importDefault(require("node-binance-api"));
const binance = new node_binance_api_1.default();
binance.options({
    APIKEY: "Aq5PaTz2dWN8zQEgjH0flRS8jQz397Sr4PuKlcX1qTYnVTsrAJxpiBulpLtydaxX",
    APISECRET: "oEPFtljpQZv5W05rZ3fKT0Hb85lEU30YjHEPYfpHjK8RNTbPum9CLXJzllobzB1h",
    reconnect: false,
});
exports.default = binance;
