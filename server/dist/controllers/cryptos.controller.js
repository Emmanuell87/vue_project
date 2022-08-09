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
exports.deleteUserCrypto = exports.newUserCrypto = exports.getInfoCryptos = exports.getUserCryptos = void 0;
const database_1 = require("../database");
const infoCrypto_json_1 = __importDefault(require("../infoCrypto.json"));
const getUserCryptos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const db = yield (0, database_1.connect)();
    db.query("SELECT * FROM userCryptos WHERE assignedToUser= ?", user.email)
        .then(([userCryptos]) => {
        res.status(200).json(userCryptos);
    })
        .catch((error) => {
        res.status(500).json({
            message: "An error occurred",
            error,
        });
    })
        .then(() => {
        db.end();
    });
});
exports.getUserCryptos = getUserCryptos;
const getInfoCryptos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json(infoCrypto_json_1.default);
});
exports.getInfoCryptos = getInfoCryptos;
const newUserCrypto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const newCrypto = {
        cid: req.body.cid,
        assignedToUser: user.email,
        symbol: req.body.symbol,
        base: req.body.base,
        quote: req.body.quote,
        name: req.body.name,
    };
    const db = yield (0, database_1.connect)();
    db.query("INSERT INTO userCryptos (cid, assignedToUser, symbol, base, quote, name) VALUES (?, ?, ?, ?, ?, ?)", Object.values(newCrypto))
        .then(() => {
        res.status(200).json({
            message: "Ok",
        });
    })
        .catch((error) => {
        res.status(500).json({
            message: "An error occurred",
            error,
        });
    })
        .then(() => {
        db.end();
    });
});
exports.newUserCrypto = newUserCrypto;
const deleteUserCrypto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idUserCrypto = req.params.id;
    const user = req.user;
    const db = yield (0, database_1.connect)();
    db.query("DELETE FROM userCryptos WHERE id = ? and assignedToUser = ?", [
        idUserCrypto,
        user.email,
    ])
        .then(() => {
        res.status(200).json({
            message: "Ok",
        });
    })
        .catch((error) => {
        res.status(500).json({
            message: "An error occurred",
            error,
        });
    })
        .then(() => {
        db.end();
    });
});
exports.deleteUserCrypto = deleteUserCrypto;
