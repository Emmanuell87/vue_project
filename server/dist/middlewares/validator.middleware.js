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
exports.checkSchema_userCrypto = exports.checkSchema_UsersSignIn = exports.checkSchema_UsersSignUp = exports.validate = void 0;
const express_validator_1 = require("express-validator");
const database_1 = require("../database");
const bcrypt_services_1 = require("../services/bcrypt.services");
const validate = (validations) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        for (let validation of validations) {
            const result = yield validation.run(req);
            if (result.isEmpty())
                break;
        }
        const errorFormatter = ({ location, msg, param, value, nestedErrors, }) => {
            // Build your resulting errors however you want! String, object, whatever - it works!
            return `${msg}`;
        };
        const errors = (0, express_validator_1.validationResult)(req).formatWith(errorFormatter);
        if (errors.isEmpty()) {
            return next();
        }
        res.status(400).json({ message: errors.array()[0] });
    });
};
exports.validate = validate;
exports.checkSchema_UsersSignUp = (0, exports.validate)([
    ...(0, express_validator_1.checkSchema)({
        email: {
            trim: true,
            isEmpty: {
                errorMessage: "Por favor envíe el email",
                negated: true,
            },
            isEmail: {
                errorMessage: "Por favor envíe un email valido",
                bail: true,
            },
            custom: {
                options: (value) => __awaiter(void 0, void 0, void 0, function* () {
                    const db = yield (0, database_1.connect)();
                    const user = yield db
                        .query("SELECT * FROM users WHERE email = ?", [value])
                        .then(([rows]) => JSON.parse(JSON.stringify(rows)))
                        .catch((error) => {
                        console.log(error);
                    });
                    db.end();
                    if (user.length > 0) {
                        return Promise.reject("Email ya está en uso");
                    }
                }),
            },
        },
        password: {
            isLength: {
                errorMessage: "La contraseña debe tener al menos 8 caracteres",
                options: { min: 8 },
            },
            custom: {
                options: (value) => {
                    return value.replace(/\s*/g, "");
                },
            },
            customSanitizer: {
                options: (value) => __awaiter(void 0, void 0, void 0, function* () {
                    return yield (0, bcrypt_services_1.createBcryptPassword)(value);
                }),
            },
        },
    }),
]);
exports.checkSchema_UsersSignIn = (0, exports.validate)([
    ...(0, express_validator_1.checkSchema)({
        email: {
            trim: true,
            isEmpty: {
                errorMessage: "Por favor envíe el email",
                negated: true,
            },
            isEmail: {
                errorMessage: "Por favor envíe un email valido",
                bail: true,
            },
            custom: {
                options: (value) => __awaiter(void 0, void 0, void 0, function* () {
                    const db = yield (0, database_1.connect)();
                    const user = yield db
                        .query("SELECT * FROM users WHERE email = ?", [value])
                        .then(([rows]) => JSON.parse(JSON.stringify(rows)))
                        .catch((error) => {
                        console.log(error);
                    });
                    db.end();
                    if (user.length == 0) {
                        return Promise.reject("No se encontró una cuenta con el email especificado");
                    }
                }),
            },
        },
        password: {
            isLength: {
                errorMessage: "La contraseña debe tener al menos 8 caracteres",
                options: { min: 8 },
            },
            custom: {
                options: (value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
                    const db = yield (0, database_1.connect)();
                    const [user] = yield db
                        .query("SELECT * FROM users WHERE email = ?", [
                        req.body.email,
                    ])
                        .then(([rows]) => JSON.parse(JSON.stringify(rows)))
                        .catch((error) => {
                        console.log(error);
                    });
                    if (!(yield (0, bcrypt_services_1.comparePassword)(value, user.password))) {
                        return Promise.reject("Contraseña incorrecta");
                    }
                }),
            },
        },
    }),
]);
exports.checkSchema_userCrypto = (0, exports.validate)([
    ...(0, express_validator_1.checkSchema)({
        cid: {
            isEmpty: {
                errorMessage: "Por favor envíe el cid de la cryptomoneda",
                negated: true,
            },
            isInt: {
                errorMessage: "El cid debe ser un entero",
            },
            toInt: true,
        },
        symbol: {
            isEmpty: {
                errorMessage: "Por favor envíe el symbol de la cryptomoneda",
                negated: true,
            },
        },
        base: {
            isEmpty: {
                errorMessage: "Por favor envíe la base de la cryptomoneda",
                negated: true,
            },
        },
        quote: {
            isEmpty: {
                errorMessage: "Por favor envíe la quote de la cryptomoneda",
                negated: true,
            },
        },
        name: {
            isEmpty: {
                errorMessage: "Por favor envíe el name de la cryptomoneda",
                negated: true,
            },
        },
    }),
]);
