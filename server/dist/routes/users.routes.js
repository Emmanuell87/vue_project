"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const validator_middleware_1 = require("../middlewares/validator.middleware");
const router = (0, express_1.Router)();
router.post("/signUp", validator_middleware_1.checkSchema_UsersSignUp, users_controller_1.signUp);
router.post("/signIn", validator_middleware_1.checkSchema_UsersSignIn, users_controller_1.signIn);
exports.default = router;
