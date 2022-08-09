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
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const database_1 = require("../database");
const token_services_1 = require("../services/token.services");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        email: req.body.email,
        password: req.body.password,
    };
    const db = yield (0, database_1.connect)();
    db.query("INSERT INTO users (email, password) VALUES (?, ?)", Object.values(user))
        .then(() => {
        res.status(200).json({
            message: "Usuario creado",
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
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        email: req.body.email,
        password: req.body.password,
    };
    res.status(200).json({ token: (0, token_services_1.createToken)(user) });
});
exports.signIn = signIn;
