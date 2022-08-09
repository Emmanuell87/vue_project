"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cryptos_controller_1 = require("../controllers/cryptos.controller");
const passport_1 = __importDefault(require("passport"));
const validator_middleware_1 = require("../middlewares/validator.middleware");
const router = (0, express_1.Router)();
router.get("/userCryptos", passport_1.default.authenticate("jwt", { session: false }), cryptos_controller_1.getUserCryptos);
router.get("/infoCryptos", cryptos_controller_1.getInfoCryptos);
router.post("/userCryptos", passport_1.default.authenticate("jwt", { session: false }), validator_middleware_1.checkSchema_userCrypto, cryptos_controller_1.newUserCrypto);
router.delete("/userCryptos/:id", passport_1.default.authenticate("jwt", { session: false }), cryptos_controller_1.deleteUserCrypto);
exports.default = router;
